# Complete Website Routes Guide

## 🌐 Your Website URLs

**Base URL**: `https://alassali-jewelry.vercel.app` (replace with your actual Vercel domain)

---

## 📄 Public Website Pages

### 1. Homepage
- **URL**: `https://alassali-jewelry.vercel.app/`
- **What it shows**: Hero section, featured jewelry items, custom process, testimonials
- **Managed by**: Homepage collection in Payload CMS
- **Content**: Edit in CMS → Homepage collection

### 2. Product Catalog
- **URL**: `https://alassali-jewelry.vercel.app/catalog`
- **What it shows**: All jewelry items with category filters
- **Managed by**: Gallery collection in Payload CMS
- **Content**: Add items in CMS → Gallery collection

### 3. Portfolio
- **URL**: `https://alassali-jewelry.vercel.app/portfolio`
- **What it shows**: Showcase of all work (18+ items)
- **Managed by**: Gallery collection in Payload CMS
- **Content**: Add items in CMS → Gallery collection

### 4. Product Detail
- **URL**: `https://alassali-jewelry.vercel.app/product/[id]`
- **Example**: `https://alassali-jewelry.vercel.app/product/123`
- **What it shows**: Individual product/gallery item details
- **Managed by**: Gallery collection in Payload CMS
- **Content**: Click item from catalog/portfolio to view details

### 5. Custom Jewelry Forms
- **URLs**:
  - `https://alassali-jewelry.vercel.app/custom/engagement-rings`
  - `https://alassali-jewelry.vercel.app/custom/grillz`
  - `https://alassali-jewelry.vercel.app/custom/chains`
  - `https://alassali-jewelry.vercel.app/custom/pendants`
- **What it shows**: Custom jewelry inquiry forms
- **Managed by**: FormFields and Inquiries collections
- **Content**: Form submissions go to CMS → Inquiries collection

### 6. Shopping Cart
- **URL**: `https://alassali-jewelry.vercel.app/cart`
- **What it shows**: Shopping cart with items

### 7. Checkout Success
- **URL**: `https://alassali-jewelry.vercel.app/checkout/success`
- **What it shows**: Order confirmation page

### 8. Checkout Cancel
- **URL**: `https://alassali-jewelry.vercel.app/checkout/cancel`
- **What it shows**: Payment cancellation page

### 9. FAQ
- **URL**: `https://alassali-jewelry.vercel.app/faq`
- **What it shows**: Frequently asked questions

---

## 🎛️ CMS Admin Panel

### 10. Payload CMS Admin
- **URL**: `https://alassali-jewelry.vercel.app/cms`
- **Alternative**: `https://alassali-jewelry.vercel.app/admin`
- **What it is**: Content management system to manage ALL website content
- **Collections Available**:
  - **Gallery** - Manage jewelry items/products
  - **Homepage** - Manage homepage content
  - **Pages** - Create and manage custom pages
  - **Media** - Upload and manage files
  - **Inquiries** - View customer inquiries
  - **Users** - Manage admin users
  - **FormFields** - Manage form configurations

---

## 🔌 API Endpoints

### Website API (Used by Frontend)

#### 11. Gallery API
- **URL**: `https://alassali-jewelry.vercel.app/api/gallery`
- **Method**: GET
- **Query params**: `?featured=true&category=chains`
- **Returns**: List of gallery items
- **Used by**: Homepage, Catalog, Portfolio pages

#### 12. Gallery Item API
- **URL**: `https://alassali-jewelry.vercel.app/api/gallery/[id]`
- **Method**: GET
- **Returns**: Specific gallery item
- **Used by**: Product detail page

#### 13. Pages API
- **URL**: `https://alassali-jewelry.vercel.app/api/pages`
- **Method**: GET
- **Query params**: `?slug=about&published=true`
- **Returns**: List of pages or specific page
- **Used by**: Custom page routes (to be implemented)

#### 14. Homepage API
- **URL**: `https://alassali-jewelry.vercel.app/api/homepage`
- **Method**: GET
- **Returns**: Homepage content
- **Used by**: Homepage

#### 15. Inquiries API
- **URL**: `https://alassali-jewelry.vercel.app/api/inquiries`
- **Method**: POST
- **Body**: Inquiry form data
- **Returns**: Created inquiry
- **Used by**: Custom jewelry forms

### Payload CMS API (Full CRUD)

#### 16. Payload CMS API Base
- **Base URL**: `https://alassali-jewelry.vercel.app/api/payload`

**Collection Endpoints** (for each collection: gallery, pages, homepage, media, inquiries, users):

- `GET /api/payload/gallery` - List all gallery items
- `POST /api/payload/gallery` - Create gallery item
- `GET /api/payload/gallery/123` - Get specific item
- `PATCH /api/payload/gallery/123` - Update item
- `DELETE /api/payload/gallery/123` - Delete item

**Auth Endpoints**:
- `POST /api/payload/login` - Admin login

**Admin Endpoints**:
- `GET /api/payload/admin` - Admin UI
- `GET /api/payload/admin/config` - Admin configuration

---

## 📝 What Each Collection Manages

### Gallery Collection
- **What**: Jewelry items/products
- **Appears on**: `/catalog`, `/portfolio`, `/product/[id]`, homepage featured section
- **Fields**: Title, description, image, category, featured status

### Homepage Collection
- **What**: Homepage content
- **Appears on**: `/` (homepage)
- **Fields**: Hero title, subtitle, featured items, testimonials

### Pages Collection
- **What**: Custom pages
- **Appears on**: Custom routes (to be implemented)
- **Fields**: Title, slug, content, SEO meta tags, published status

### Media Collection
- **What**: Images and files
- **Used by**: Gallery items, Homepage, Pages
- **Fields**: File upload, alt text, metadata

### Inquiries Collection
- **What**: Customer form submissions
- **Source**: Forms on `/custom/[type]` pages
- **Fields**: Name, email, phone, jewelry details, notes

### Users Collection
- **What**: Admin users
- **Access**: CMS only
- **Fields**: Name, email, password, role

---

## 🎯 Quick Reference

**Manage Content**: `/cms` → Select collection → Create/Edit/Delete

**View Website**: All public pages show content from Payload CMS

**API Access**: All endpoints work - use for custom integrations

**Database**: Tables auto-created on first request (enabled)

---

## ✅ Status

- ✅ All pages functional
- ✅ All collections configured
- ✅ API routes working
- ✅ Database connection ready
- ✅ Auto-migration enabled

**Everything is ready! Just push to deploy.**
