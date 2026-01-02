from fastapi import FastAPI, HTTPException, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
import os
from dotenv import load_dotenv
import shutil
from pathlib import Path
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
MONGO_URL = os.getenv("MONGO_URL", "mongodb://mongo:27017")
DB_NAME = os.getenv("DB_NAME", "alassali_jewelry")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Stripe
STRIPE_API_KEY = os.getenv("STRIPE_API_KEY", "sk_test_emergent")

# Create uploads directory
UPLOADS_DIR = Path("/app/backend/uploads")
UPLOADS_DIR.mkdir(exist_ok=True)

# Static files
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Helper function to serialize MongoDB docs
def serialize_doc(doc):
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        serialized = {}
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                serialized[key] = str(value)
            elif isinstance(value, datetime):
                serialized[key] = value.isoformat()
            elif isinstance(value, dict):
                serialized[key] = serialize_doc(value)
            elif isinstance(value, list):
                serialized[key] = [serialize_doc(item) if isinstance(item, (dict, ObjectId, datetime)) else item for item in value]
            else:
                serialized[key] = value
        return serialized
    return doc

# Models
class Product(BaseModel):
    name: str
    description: str
    price: float
    category: str  # engagement-rings, grillz, chains, pendants
    inventory_type: str  # natural or lab-grown
    metal_type: Optional[str] = None
    stone_type: Optional[str] = None
    images: List[str] = []
    specifications: Dict[str, Any] = {}
    featured: bool = False
    in_stock: bool = True
    created_at: Optional[datetime] = None

class CartItem(BaseModel):
    product_id: str
    quantity: int = 1

class Cart(BaseModel):
    session_id: str
    items: List[CartItem] = []
    updated_at: Optional[datetime] = None

class CustomInquiry(BaseModel):
    type: str  # engagement-rings, grillz, chains, pendants
    name: str
    email: str
    phone: Optional[str] = None
    budget: Optional[str] = None
    style: Optional[str] = None
    metal_type: Optional[str] = None
    stone_preferences: Optional[List[str]] = []
    size: Optional[str] = None
    timeline: Optional[str] = None
    notes: Optional[str] = None
    inspiration_images: List[str] = []
    status: str = "new"  # new, in-progress, completed
    created_at: Optional[datetime] = None

class Order(BaseModel):
    session_id: str
    items: List[Dict[str, Any]]
    total: float
    payment_status: str  # pending, paid, failed
    stripe_session_id: Optional[str] = None
    customer_email: Optional[str] = None
    created_at: Optional[datetime] = None

class BlogPost(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    image_url: Optional[str] = None
    published: bool = False
    created_at: Optional[datetime] = None

class AdminUser(BaseModel):
    username: str
    password: str  # In production, hash this!

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Alassali Jewelry API", "status": "running"}

# Products endpoints
@app.get("/api/products")
async def get_products(
    category: Optional[str] = None,
    inventory_type: Optional[str] = None,
    featured: Optional[bool] = None
):
    query = {"in_stock": True}
    if category:
        query["category"] = category
    if inventory_type:
        query["inventory_type"] = inventory_type
    if featured is not None:
        query["featured"] = featured
    
    products = await db.products.find(query).to_list(100)
    return serialize_doc(products)

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    try:
        product = await db.products.find_one({"_id": ObjectId(product_id)})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return serialize_doc(product)
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")

@app.post("/api/products")
async def create_product(product: Product):
    product_dict = product.dict()
    product_dict["created_at"] = datetime.utcnow()
    result = await db.products.insert_one(product_dict)
    product_dict["_id"] = result.inserted_id
    return serialize_doc(product_dict)

@app.put("/api/products/{product_id}")
async def update_product(product_id: str, product: Product):
    try:
        result = await db.products.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": product.dict()}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": "Product updated"}
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")

@app.delete("/api/products/{product_id}")
async def delete_product(product_id: str):
    try:
        result = await db.products.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": "Product deleted"}
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")

# Cart endpoints
@app.get("/api/cart/{session_id}")
async def get_cart(session_id: str):
    cart = await db.carts.find_one({"session_id": session_id})
    if not cart:
        return {"session_id": session_id, "items": []}
    
    # Populate product details
    items_with_details = []
    for item in cart.get("items", []):
        try:
            product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
            if product:
                items_with_details.append({
                    "product": serialize_doc(product),
                    "quantity": item["quantity"]
                })
        except:
            continue
    
    return {
        "session_id": session_id,
        "items": items_with_details
    }

@app.post("/api/cart/{session_id}/add")
async def add_to_cart(session_id: str, item: CartItem):
    cart = await db.carts.find_one({"session_id": session_id})
    
    if not cart:
        cart = {
            "session_id": session_id,
            "items": [{"product_id": item.product_id, "quantity": item.quantity}],
            "updated_at": datetime.utcnow()
        }
        await db.carts.insert_one(cart)
    else:
        items = cart.get("items", [])
        found = False
        for cart_item in items:
            if cart_item["product_id"] == item.product_id:
                cart_item["quantity"] += item.quantity
                found = True
                break
        
        if not found:
            items.append({"product_id": item.product_id, "quantity": item.quantity})
        
        await db.carts.update_one(
            {"session_id": session_id},
            {"$set": {"items": items, "updated_at": datetime.utcnow()}}
        )
    
    return {"message": "Item added to cart"}

@app.post("/api/cart/{session_id}/remove")
async def remove_from_cart(session_id: str, product_id: str):
    cart = await db.carts.find_one({"session_id": session_id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = [item for item in cart.get("items", []) if item["product_id"] != product_id]
    
    await db.carts.update_one(
        {"session_id": session_id},
        {"$set": {"items": items, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Item removed from cart"}

@app.post("/api/cart/{session_id}/update")
async def update_cart_item(session_id: str, product_id: str, quantity: int):
    cart = await db.carts.find_one({"session_id": session_id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = cart.get("items", [])
    for item in items:
        if item["product_id"] == product_id:
            item["quantity"] = quantity
            break
    
    await db.carts.update_one(
        {"session_id": session_id},
        {"$set": {"items": items, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Cart updated"}

# Checkout endpoints
@app.post("/api/checkout/create-session")
async def create_checkout_session(request: Request):
    body = await request.json()
    session_id = body.get("session_id")
    origin_url = body.get("origin_url")
    customer_email = body.get("customer_email")
    
    if not session_id or not origin_url:
        raise HTTPException(status_code=400, detail="Missing session_id or origin_url")
    
    # Get cart
    cart = await db.carts.find_one({"session_id": session_id})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Calculate total
    total = 0.0
    items_details = []
    for item in cart.get("items", []):
        try:
            product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
            if product:
                item_total = product["price"] * item["quantity"]
                total += item_total
                items_details.append({
                    "product_id": str(product["_id"]),
                    "name": product["name"],
                    "price": product["price"],
                    "quantity": item["quantity"]
                })
        except:
            continue
    
    if total == 0:
        raise HTTPException(status_code=400, detail="Invalid cart")
    
    # Create order
    order = {
        "session_id": session_id,
        "items": items_details,
        "total": total,
        "payment_status": "pending",
        "customer_email": customer_email,
        "created_at": datetime.utcnow()
    }
    order_result = await db.orders.insert_one(order)
    
    # Create Stripe checkout session
    success_url = f"{origin_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/checkout/cancel"
    
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    checkout_request = CheckoutSessionRequest(
        amount=total,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "order_id": str(order_result.inserted_id),
            "session_id": session_id
        }
    )
    
    checkout_session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Update order with Stripe session ID
    await db.orders.update_one(
        {"_id": order_result.inserted_id},
        {"$set": {"stripe_session_id": checkout_session.session_id}}
    )
    
    # Create payment transaction record
    payment_transaction = {
        "order_id": str(order_result.inserted_id),
        "session_id": session_id,
        "stripe_session_id": checkout_session.session_id,
        "amount": total,
        "currency": "usd",
        "payment_status": "pending",
        "customer_email": customer_email,
        "created_at": datetime.utcnow()
    }
    await db.payment_transactions.insert_one(payment_transaction)
    
    return {
        "url": checkout_session.url,
        "session_id": checkout_session.session_id
    }

@app.get("/api/checkout/status/{stripe_session_id}")
async def get_checkout_status(request: Request, stripe_session_id: str):
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(stripe_session_id)
    
    # Update order and payment transaction
    if status.payment_status == "paid":
        # Check if already processed
        transaction = await db.payment_transactions.find_one({"stripe_session_id": stripe_session_id})
        if transaction and transaction.get("payment_status") != "paid":
            # Update payment transaction
            await db.payment_transactions.update_one(
                {"stripe_session_id": stripe_session_id},
                {"$set": {"payment_status": "paid"}}
            )
            
            # Update order
            if transaction.get("order_id"):
                await db.orders.update_one(
                    {"_id": ObjectId(transaction["order_id"])},
                    {"$set": {"payment_status": "paid"}}
                )
            
            # Clear cart
            if transaction.get("session_id"):
                await db.carts.delete_one({"session_id": transaction["session_id"]})
    
    return {
        "status": status.status,
        "payment_status": status.payment_status,
        "amount_total": status.amount_total,
        "currency": status.currency
    }

@app.post("/api/webhook/stripe")
async def stripe_webhook(request: Request):
    body_bytes = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body_bytes, signature)
        
        if webhook_response.payment_status == "paid":
            # Update payment transaction
            await db.payment_transactions.update_one(
                {"stripe_session_id": webhook_response.session_id},
                {"$set": {"payment_status": "paid"}}
            )
            
            # Update order
            transaction = await db.payment_transactions.find_one({"stripe_session_id": webhook_response.session_id})
            if transaction and transaction.get("order_id"):
                await db.orders.update_one(
                    {"_id": ObjectId(transaction["order_id"])},
                    {"$set": {"payment_status": "paid"}}
                )
        
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Custom inquiries endpoints
@app.post("/api/inquiries")
async def create_inquiry(inquiry: CustomInquiry):
    inquiry_dict = inquiry.dict()
    inquiry_dict["created_at"] = datetime.utcnow()
    result = await db.inquiries.insert_one(inquiry_dict)
    return {"id": str(result.inserted_id), "message": "Inquiry submitted successfully"}

@app.post("/api/inquiries/upload")
async def upload_inspiration_image(file: UploadFile = File(...)):
    # Save file
    file_path = UPLOADS_DIR / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"url": f"/uploads/{file.filename}"}

@app.get("/api/inquiries")
async def get_inquiries(status: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    
    inquiries = await db.inquiries.find(query).sort("created_at", -1).to_list(100)
    return serialize_doc(inquiries)

@app.get("/api/inquiries/{inquiry_id}")
async def get_inquiry(inquiry_id: str):
    try:
        inquiry = await db.inquiries.find_one({"_id": ObjectId(inquiry_id)})
        if not inquiry:
            raise HTTPException(status_code=404, detail="Inquiry not found")
        return serialize_doc(inquiry)
    except:
        raise HTTPException(status_code=400, detail="Invalid inquiry ID")

@app.patch("/api/inquiries/{inquiry_id}")
async def update_inquiry_status(inquiry_id: str, status: str):
    try:
        result = await db.inquiries.update_one(
            {"_id": ObjectId(inquiry_id)},
            {"$set": {"status": status}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found")
        return {"message": "Inquiry status updated"}
    except:
        raise HTTPException(status_code=400, detail="Invalid inquiry ID")

# Blog endpoints
@app.get("/api/blog")
async def get_blog_posts(published: Optional[bool] = True):
    query = {"published": published} if published is not None else {}
    posts = await db.blog_posts.find(query).sort("created_at", -1).to_list(100)
    return serialize_doc(posts)

@app.get("/api/blog/{slug}")
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return serialize_doc(post)

@app.post("/api/blog")
async def create_blog_post(post: BlogPost):
    post_dict = post.dict()
    post_dict["created_at"] = datetime.utcnow()
    result = await db.blog_posts.insert_one(post_dict)
    return {"id": str(result.inserted_id), "message": "Blog post created"}

# Admin endpoints
@app.post("/api/admin/login")
async def admin_login(credentials: AdminUser):
    # Simple auth - in production, use proper auth and hashed passwords
    if credentials.username == "admin" and credentials.password == "admin123":
        return {"token": "demo_token", "message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/admin/stats")
async def get_admin_stats():
    total_products = await db.products.count_documents({})
    total_orders = await db.orders.count_documents({})
    total_inquiries = await db.inquiries.count_documents({})
    pending_inquiries = await db.inquiries.count_documents({"status": "new"})
    
    # Recent inquiries
    recent_inquiries = await db.inquiries.find().sort("created_at", -1).limit(5).to_list(5)
    
    # Revenue
    revenue_pipeline = [
        {"$match": {"payment_status": "paid"}},
        {"$group": {"_id": None, "total": {"$sum": "$total"}}}
    ]
    revenue_result = await db.orders.aggregate(revenue_pipeline).to_list(1)
    total_revenue = revenue_result[0]["total"] if revenue_result else 0.0
    
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_inquiries": total_inquiries,
        "pending_inquiries": pending_inquiries,
        "total_revenue": total_revenue,
        "recent_inquiries": serialize_doc(recent_inquiries)
    }

# Seed data endpoint (for demo)
@app.post("/api/seed")
async def seed_database():
    # Check if already seeded
    existing = await db.products.count_documents({})
    if existing > 0:
        return {"message": "Database already seeded"}
    
    # Sample products
    sample_products = [
        {
            "name": "Classic Solitaire Diamond Ring",
            "description": "Timeless elegance with a brilliant-cut diamond set in platinum.",
            "price": 3500.00,
            "category": "engagement-rings",
            "inventory_type": "natural",
            "metal_type": "Platinum",
            "stone_type": "Diamond",
            "images": [
                "https://images.unsplash.com/photo-1721103428207-597c5ceff1cd?w=800",
                "https://images.unsplash.com/photo-1721808084960-02d8e6b1e8f3?w=800"
            ],
            "specifications": {
                "carat": "1.0ct",
                "clarity": "VS1",
                "color": "H",
                "cut": "Excellent"
            },
            "featured": True,
            "in_stock": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Lab-Grown Diamond Halo Ring",
            "description": "Eco-conscious luxury with a stunning halo setting.",
            "price": 2200.00,
            "category": "engagement-rings",
            "inventory_type": "lab-grown",
            "metal_type": "18K White Gold",
            "stone_type": "Lab Diamond",
            "images": [
                "https://images.pexels.com/photos/16576817/pexels-photo-16576817.jpeg?w=800"
            ],
            "specifications": {
                "carat": "1.2ct",
                "clarity": "VVS2",
                "color": "F",
                "cut": "Ideal"
            },
            "featured": True,
            "in_stock": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Miami Cuban Link Chain",
            "description": "10K yellow gold Miami Cuban chain. Bold and iconic.",
            "price": 1800.00,
            "category": "chains",
            "inventory_type": "natural",
            "metal_type": "10K Yellow Gold",
            "images": [
                "https://images.unsplash.com/photo-1758995115518-26f90aa61b97?w=800"
            ],
            "specifications": {
                "length": "22 inches",
                "width": "8mm",
                "weight": "45g"
            },
            "featured": True,
            "in_stock": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Custom Diamond Grillz - Top 6",
            "description": "Premium custom grillz with full diamond setting.",
            "price": 2500.00,
            "category": "grillz",
            "inventory_type": "natural",
            "metal_type": "10K Yellow Gold",
            "stone_type": "Diamond",
            "images": [
                "https://images.unsplash.com/photo-1601121141499-17ae80afc03a?w=800"
            ],
            "specifications": {
                "teeth": "Top 6",
                "setting": "Honeycomb",
                "karat": "10K"
            },
            "featured": False,
            "in_stock": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Delicate Rose Gold Chain",
            "description": "14K rose gold chain perfect for everyday elegance.",
            "price": 650.00,
            "category": "chains",
            "inventory_type": "natural",
            "metal_type": "14K Rose Gold",
            "images": [
                "https://images.pexels.com/photos/8084610/pexels-photo-8084610.jpeg?w=800"
            ],
            "specifications": {
                "length": "18 inches",
                "width": "2mm",
                "weight": "8g"
            },
            "featured": False,
            "in_stock": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Custom Initial Pendant",
            "description": "Personalized initial pendant in your choice of metal.",
            "price": 450.00,
            "category": "pendants",
            "inventory_type": "natural",
            "metal_type": "14K Yellow Gold",
            "images": [
                "https://images.unsplash.com/photo-1764179690227-af049306cd20?w=800"
            ],
            "specifications": {
                "size": "15mm",
                "bail": "Standard"
            },
            "featured": False,
            "in_stock": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.products.insert_many(sample_products)
    
    # Sample blog posts
    sample_blog = [
        {
            "title": "Lab-Grown vs Natural Diamonds: Making an Informed Choice",
            "slug": "lab-grown-vs-natural-diamonds",
            "excerpt": "Understanding the differences, benefits, and value of lab-grown and natural diamonds for your perfect piece.",
            "content": "Lab-grown diamonds have become increasingly popular... [full content]",
            "image_url": "https://images.unsplash.com/photo-1721103428207-597c5ceff1cd?w=800",
            "published": True,
            "created_at": datetime.utcnow()
        },
        {
            "title": "The Art of Custom Jewelry: From Concept to Creation",
            "slug": "art-of-custom-jewelry",
            "excerpt": "Discover the journey of creating bespoke jewelry pieces at Alassali, from initial consultation to final polish.",
            "content": "Creating custom jewelry is a collaborative art... [full content]",
            "image_url": "https://images.unsplash.com/photo-1706955008775-c00874bb4d4b?w=800",
            "published": True,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Caring for Your Fine Jewelry: Expert Tips from Toronto",
            "slug": "caring-for-fine-jewelry",
            "excerpt": "Professional advice on maintaining the brilliance and longevity of your precious jewelry pieces.",
            "content": "Proper care ensures your jewelry lasts generations... [full content]",
            "image_url": "https://images.unsplash.com/photo-1598724168411-9ba1e003a7fe?w=800",
            "published": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.blog_posts.insert_many(sample_blog)
    
    return {
        "message": "Database seeded successfully",
        "products": len(sample_products),
        "blog_posts": len(sample_blog)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
