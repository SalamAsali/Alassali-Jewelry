import requests
import sys
from datetime import datetime
import json

class AlassaliAPITester:
    def __init__(self, base_url="https://gemini-doc-analysis.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.failed_tests = []
        self.session_id = f"test_session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.test_product_id = None
        self.test_inquiry_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, params=params, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, params=params, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                self.tests_failed += 1
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "got": response.status_code,
                    "response": response.text[:200]
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            self.tests_failed += 1
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root(self):
        """Test root endpoint"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_seed_database(self):
        """Seed the database with sample data"""
        success, response = self.run_test(
            "Seed Database",
            "POST",
            "api/seed",
            200
        )
        return success

    def test_get_products(self):
        """Test getting all products"""
        success, response = self.run_test(
            "Get All Products",
            "GET",
            "api/products",
            200
        )
        if success and response:
            print(f"   Found {len(response)} products")
            if len(response) > 0:
                self.test_product_id = response[0].get('_id')
                print(f"   Stored product ID: {self.test_product_id}")
        return success

    def test_get_products_filtered(self):
        """Test getting products with filters"""
        # Test category filter
        success1, response1 = self.run_test(
            "Get Products by Category (engagement-rings)",
            "GET",
            "api/products",
            200,
            params={"category": "engagement-rings"}
        )
        
        # Test inventory type filter
        success2, response2 = self.run_test(
            "Get Products by Inventory Type (natural)",
            "GET",
            "api/products",
            200,
            params={"inventory_type": "natural"}
        )
        
        # Test featured filter
        success3, response3 = self.run_test(
            "Get Featured Products",
            "GET",
            "api/products",
            200,
            params={"featured": "true"}
        )
        
        return success1 and success2 and success3

    def test_get_product_by_id(self):
        """Test getting a single product by ID"""
        if not self.test_product_id:
            print("⚠️  Skipping - No product ID available")
            return True
        
        success, response = self.run_test(
            "Get Product by ID",
            "GET",
            f"api/products/{self.test_product_id}",
            200
        )
        return success

    def test_create_product(self):
        """Test creating a new product"""
        product_data = {
            "name": "Test Diamond Ring",
            "description": "A beautiful test ring",
            "price": 1500.00,
            "category": "engagement-rings",
            "inventory_type": "natural",
            "metal_type": "14K Gold",
            "stone_type": "Diamond",
            "images": ["https://example.com/image.jpg"],
            "specifications": {"carat": "0.5ct"},
            "featured": False,
            "in_stock": True
        }
        
        success, response = self.run_test(
            "Create Product",
            "POST",
            "api/products",
            200,
            data=product_data
        )
        
        if success and response:
            created_id = response.get('_id')
            print(f"   Created product ID: {created_id}")
        
        return success

    def test_cart_operations(self):
        """Test cart operations"""
        if not self.test_product_id:
            print("⚠️  Skipping cart tests - No product ID available")
            return True
        
        # Get empty cart
        success1, response1 = self.run_test(
            "Get Empty Cart",
            "GET",
            f"api/cart/{self.session_id}",
            200
        )
        
        # Add item to cart
        success2, response2 = self.run_test(
            "Add Item to Cart",
            "POST",
            f"api/cart/{self.session_id}/add",
            200,
            data={"product_id": self.test_product_id, "quantity": 1}
        )
        
        # Get cart with items
        success3, response3 = self.run_test(
            "Get Cart with Items",
            "GET",
            f"api/cart/{self.session_id}",
            200
        )
        
        if success3 and response3:
            print(f"   Cart has {len(response3.get('items', []))} items")
        
        # Update cart item quantity
        success4, response4 = self.run_test(
            "Update Cart Item Quantity",
            "POST",
            f"api/cart/{self.session_id}/update",
            200,
            params={"product_id": self.test_product_id, "quantity": 2}
        )
        
        # Remove item from cart
        success5, response5 = self.run_test(
            "Remove Item from Cart",
            "POST",
            f"api/cart/{self.session_id}/remove",
            200,
            params={"product_id": self.test_product_id}
        )
        
        return success1 and success2 and success3 and success4 and success5

    def test_checkout_session(self):
        """Test checkout session creation"""
        if not self.test_product_id:
            print("⚠️  Skipping checkout test - No product ID available")
            return True
        
        # First add item to cart
        self.run_test(
            "Add Item to Cart for Checkout",
            "POST",
            f"api/cart/{self.session_id}/add",
            200,
            data={"product_id": self.test_product_id, "quantity": 1}
        )
        
        # Create checkout session
        success, response = self.run_test(
            "Create Checkout Session",
            "POST",
            "api/checkout/create-session",
            200,
            data={
                "session_id": self.session_id,
                "origin_url": "https://example.com",
                "customer_email": "test@example.com"
            }
        )
        
        if success and response:
            print(f"   Checkout URL: {response.get('url', 'N/A')[:50]}...")
        
        return success

    def test_custom_inquiry(self):
        """Test custom inquiry submission"""
        inquiry_data = {
            "type": "engagement-rings",
            "name": "Test Customer",
            "email": "test@example.com",
            "phone": "+1234567890",
            "budget": "$5,000-$10,000",
            "style": "Classic",
            "metal_type": "Platinum",
            "stone_preferences": ["Diamond"],
            "size": "7",
            "timeline": "1-2 months",
            "notes": "Looking for a classic solitaire design",
            "inspiration_images": [],
            "status": "new"
        }
        
        success, response = self.run_test(
            "Submit Custom Inquiry",
            "POST",
            "api/inquiries",
            200,
            data=inquiry_data
        )
        
        if success and response:
            self.test_inquiry_id = response.get('id')
            print(f"   Created inquiry ID: {self.test_inquiry_id}")
        
        return success

    def test_get_inquiries(self):
        """Test getting inquiries"""
        success1, response1 = self.run_test(
            "Get All Inquiries",
            "GET",
            "api/inquiries",
            200
        )
        
        if success1 and response1:
            print(f"   Found {len(response1)} inquiries")
        
        # Test with status filter
        success2, response2 = self.run_test(
            "Get Inquiries by Status (new)",
            "GET",
            "api/inquiries",
            200,
            params={"status": "new"}
        )
        
        return success1 and success2

    def test_get_inquiry_by_id(self):
        """Test getting a single inquiry by ID"""
        if not self.test_inquiry_id:
            print("⚠️  Skipping - No inquiry ID available")
            return True
        
        success, response = self.run_test(
            "Get Inquiry by ID",
            "GET",
            f"api/inquiries/{self.test_inquiry_id}",
            200
        )
        return success

    def test_blog_posts(self):
        """Test blog endpoints"""
        success1, response1 = self.run_test(
            "Get All Blog Posts",
            "GET",
            "api/blog",
            200
        )
        
        if success1 and response1:
            print(f"   Found {len(response1)} blog posts")
            if len(response1) > 0:
                slug = response1[0].get('slug')
                if slug:
                    success2, response2 = self.run_test(
                        f"Get Blog Post by Slug ({slug})",
                        "GET",
                        f"api/blog/{slug}",
                        200
                    )
                    return success1 and success2
        
        return success1

    def test_admin_login(self):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/admin/login",
            200,
            data={"username": "admin", "password": "admin123"}
        )
        
        if success and response:
            self.token = response.get('token')
            print(f"   Token: {self.token}")
        
        return success

    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        success, response = self.run_test(
            "Admin Login (Invalid Credentials)",
            "POST",
            "api/admin/login",
            401,
            data={"username": "admin", "password": "wrongpassword"}
        )
        return success

    def test_admin_stats(self):
        """Test admin stats endpoint"""
        success, response = self.run_test(
            "Get Admin Stats",
            "GET",
            "api/admin/stats",
            200
        )
        
        if success and response:
            print(f"   Total Products: {response.get('total_products', 0)}")
            print(f"   Total Orders: {response.get('total_orders', 0)}")
            print(f"   Total Inquiries: {response.get('total_inquiries', 0)}")
            print(f"   Pending Inquiries: {response.get('pending_inquiries', 0)}")
            print(f"   Total Revenue: ${response.get('total_revenue', 0)}")
        
        return success

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"✅ Passed: {self.tests_passed}")
        print(f"❌ Failed: {self.tests_failed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"\n{i}. {test.get('test', 'Unknown')}")
                if 'expected' in test:
                    print(f"   Expected: {test['expected']}, Got: {test['got']}")
                    print(f"   Response: {test.get('response', 'N/A')}")
                if 'error' in test:
                    print(f"   Error: {test['error']}")
        
        print("\n" + "="*60)

def main():
    print("🚀 Starting Alassali Jewelry API Tests")
    print("="*60)
    
    tester = AlassaliAPITester()
    
    # Run all tests
    print("\n📦 BASIC ENDPOINTS")
    tester.test_root()
    tester.test_seed_database()
    
    print("\n🛍️  PRODUCT ENDPOINTS")
    tester.test_get_products()
    tester.test_get_products_filtered()
    tester.test_get_product_by_id()
    tester.test_create_product()
    
    print("\n🛒 CART ENDPOINTS")
    tester.test_cart_operations()
    
    print("\n💳 CHECKOUT ENDPOINTS")
    tester.test_checkout_session()
    
    print("\n✨ CUSTOM INQUIRY ENDPOINTS")
    tester.test_custom_inquiry()
    tester.test_get_inquiries()
    tester.test_get_inquiry_by_id()
    
    print("\n📝 BLOG ENDPOINTS")
    tester.test_blog_posts()
    
    print("\n👤 ADMIN ENDPOINTS")
    tester.test_admin_login()
    tester.test_admin_login_invalid()
    tester.test_admin_stats()
    
    # Print summary
    tester.print_summary()
    
    # Return exit code
    return 0 if tester.tests_failed == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
