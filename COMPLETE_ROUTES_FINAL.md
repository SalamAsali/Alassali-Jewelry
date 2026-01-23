# Complete Website Routes - Final Guide

## 🌐 Your Website URLs

**Base URL**: Replace `alassali-jewelry.vercel.app` with your actual Vercel domain

---

## 📄 Public Website Pages

1. **Homepage**
   - URL: `https://alassali-jewelry.vercel.app/`
   - Shows: Hero, featured items, testimonials
   - Managed by: **Homepage** collection in Payload CMS

2. **Product Catalog**
   - URL: `https://alassali-jewelry.vercel.app/catalog`
   - Shows: All jewelry items with filters
   - Managed by: **Gallery** collection in Payload CMS

3. **Portfolio**
   - URL: `https://alassali-jewelry.vercel.app/portfolio`
   - Shows: All 18+ portfolio items
   - Managed by: **Gallery** collection in Payload CMS

4. **Product Detail**
   - URL: `https://alassali-jewelry.vercel.app/product/[id]`
   - Shows: Individual product details
   - Managed by: **Gallery** collection in Payload CMS

5. **Custom Jewelry Forms**
   - URLs:
     - `/custom/engagement-rings`
     - `/custom/grillz`
     - `/custom/chains`
     - `/custom/pendants`
   - Shows: Inquiry forms
   - Submits to: **Inquiries** collection

6. **Shopping Cart**: `/cart`
7. **Checkout Success**: `/checkout/success`
8. **Checkout Cancel**: `/checkout/cancel`
9. **FAQ**: `/faq`

---

## 🎛️ CMS Admin Panel

### 10. Payload CMS Admin
- **URL**: `https://alassali-jewelry.vercel.app/admin`
- **Legacy**: `/cms` (redirects to `/admin`)
- **What it is**: Full content management system

**Collections You Can Manage**:
- **Gallery** → Manage jewelry items (appears on catalog, portfolio, homepage)
- **Homepage** → Manage homepage content (hero, featured items, testimonials)
- **Pages** → Create custom pages (About, Contact, etc.)
- **Media** → Upload and manage images/files
- **Inquiries** → View customer form submissions
- **Users** → Manage admin users
- **FormFields** → Manage form configurations

---

## 🔌 API Endpoints

### Website API (Used by Frontend)
- `/api/gallery` → Get gallery items
- `/api/gallery/[id]` → Get specific item
- `/api/pages` → Get custom pages
- `/api/homepage` → Get homepage content
- `/api/inquiries` → Submit inquiries

### Payload CMS API (Full CRUD)
- Base: `/api/payload`
- Examples:
  - `GET /api/payload/gallery` → List items
  - `POST /api/payload/gallery` → Create item
  - `GET /api/payload/gallery/123` → Get item
  - `PATCH /api/payload/gallery/123` → Update item
  - `DELETE /api/payload/gallery/123` → Delete item

### Migration Endpoint
- `POST /api/migrate` → Create database tables
- `GET /api/migrate` → See instructions

---

## 🎯 How to Use

### Step 1: Create Tables (If Needed)

**Option A: Browser Console**
1. Go to `/admin`
2. Press F12 → Console
3. Run:
```javascript
fetch('/api/migrate', { method: 'POST' })
  .then(r => r.json())
  .then(d => { console.log(d); if(d.success) location.reload() })
```

**Option B: Create First Item**
1. Go to `/admin` → Gallery
2. Click "Create New"
3. Fill form and save
4. Tables created automatically!

### Step 2: Manage Content

1. **Add Gallery Items**: `/admin` → Gallery → Create New
   - Appears on: `/catalog`, `/portfolio`, homepage (if featured)

2. **Edit Homepage**: `/admin` → Homepage → Edit
   - Changes appear on: `/` (homepage)

3. **Create Pages**: `/admin` → Pages → Create New
   - Custom pages with content

4. **View Inquiries**: `/admin` → Inquiries
   - See customer form submissions

---

## ✅ Everything is Ready!

- ✅ All pages functional
- ✅ All collections configured
- ✅ API routes working
- ✅ Admin route: `/admin` (standard)
- ✅ Auto-table creation on first item

**Just push to deploy and create your first item!**
