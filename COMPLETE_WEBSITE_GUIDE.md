# Complete Website & CMS Guide

## 🌐 Your Website URLs

Replace `alassali-jewelry.vercel.app` with your actual Vercel domain.

### 📄 Public Website Pages

1. **Homepage**
   - **URL**: `https://alassali-jewelry.vercel.app/`
   - **What it shows**: Hero section, featured jewelry items, custom process, testimonials
   - **Managed by**: Homepage collection in Payload CMS

2. **Product Catalog**
   - **URL**: `https://alassali-jewelry.vercel.app/catalog`
   - **What it shows**: All jewelry items with category filters
   - **Managed by**: Gallery collection in Payload CMS

3. **Portfolio**
   - **URL**: `https://alassali-jewelry.vercel.app/portfolio`
   - **What it shows**: Showcase of all work (18+ items)
   - **Managed by**: Gallery collection in Payload CMS

4. **Product Detail**
   - **URL**: `https://alassali-jewelry.vercel.app/product/[id]`
   - **Example**: `https://alassali-jewelry.vercel.app/product/123`
   - **What it shows**: Individual product/gallery item details
   - **Managed by**: Gallery collection in Payload CMS

5. **Custom Jewelry Forms**
   - **URLs**:
     - `https://alassali-jewelry.vercel.app/custom/engagement-rings`
     - `https://alassali-jewelry.vercel.app/custom/grillz`
     - `https://alassali-jewelry.vercel.app/custom/chains`
     - `https://alassali-jewelry.vercel.app/custom/pendants`
   - **What it shows**: Custom jewelry inquiry forms
   - **Managed by**: FormFields and Inquiries collections

6. **Shopping Cart**
   - **URL**: `https://alassali-jewelry.vercel.app/cart`
   - **What it shows**: Shopping cart with items

7. **Checkout Success**
   - **URL**: `https://alassali-jewelry.vercel.app/checkout/success`
   - **What it shows**: Order confirmation page

8. **Checkout Cancel**
   - **URL**: `https://alassali-jewelry.vercel.app/checkout/cancel`
   - **What it shows**: Payment cancellation page

9. **FAQ**
   - **URL**: `https://alassali-jewelry.vercel.app/faq`
   - **What it shows**: Frequently asked questions

### 🎛️ CMS Admin Panel

10. **Payload CMS Admin**
    - **URL**: `https://alassali-jewelry.vercel.app/cms`
    - **Alternative**: `https://alassali-jewelry.vercel.app/admin`
    - **What it is**: Content management system to manage ALL website content
    - **Collections Available**:
      - **Users** - Manage admin users
      - **Media** - Upload and manage images/files
      - **Gallery** - Manage jewelry items/products
      - **Pages** - Create and manage custom pages (NEW)
      - **Homepage** - Manage homepage content (NEW)
      - **FormFields** - Manage form configurations
      - **Inquiries** - View customer inquiries

### 🔌 API Endpoints (For Developers)

11. **Gallery API**
    - **URL**: `https://alassali-jewelry.vercel.app/api/gallery`
    - **Methods**: GET
    - **Query params**: `?featured=true&category=chains`
    - **Returns**: List of gallery items

12. **Gallery Item API**
    - **URL**: `https://alassali-jewelry.vercel.app/api/gallery/[id]`
    - **Methods**: GET
    - **Returns**: Specific gallery item

13. **Pages API** (NEW)
    - **URL**: `https://alassali-jewelry.vercel.app/api/pages`
    - **Methods**: GET
    - **Query params**: `?slug=about&published=true`
    - **Returns**: List of pages or specific page

14. **Homepage API** (NEW)
    - **URL**: `https://alassali-jewelry.vercel.app/api/homepage`
    - **Methods**: GET
    - **Returns**: Homepage content

15. **Inquiries API**
    - **URL**: `https://alassali-jewelry.vercel.app/api/inquiries`
    - **Methods**: POST
    - **Body**: Inquiry form data
    - **Returns**: Created inquiry

16. **Payload CMS API** (Full CRUD)
    - **Base URL**: `https://alassali-jewelry.vercel.app/api/payload`
    - **Examples**:
      - `GET /api/payload/gallery` - List all gallery items
      - `POST /api/payload/gallery` - Create gallery item
      - `GET /api/payload/gallery/123` - Get specific item
      - `PATCH /api/payload/gallery/123` - Update item
      - `DELETE /api/payload/gallery/123` - Delete item
      - `GET /api/payload/pages` - List all pages
      - `GET /api/payload/homepage` - Get homepage content
      - `POST /api/payload/login` - Admin login

## 📝 What You Can Manage in Payload CMS

### 1. **Gallery Items** (Products/Jewelry)
- Add/edit/delete jewelry items
- Set featured items (appear on homepage)
- Add categories (engagement-rings, grillz, chains, etc.)
- Upload images
- Add descriptions
- **Where it appears**: `/catalog`, `/portfolio`, `/product/[id]`, homepage featured section

### 2. **Pages** (NEW - Custom Pages)
- Create custom pages (About, Contact, etc.)
- Manage page content with rich text editor
- Set SEO meta tags
- Control publishing (draft/published)
- **Access**: Custom routes (to be implemented)

### 3. **Homepage** (NEW - Homepage Content)
- Edit hero section (title, subtitle, image)
- Manage featured items (select from Gallery)
- Update testimonials
- Change homepage content
- **Where it appears**: `/` (homepage)

### 4. **Media**
- Upload images
- Manage files
- Organize media library
- **Used by**: Gallery items, Homepage, Pages

### 5. **Inquiries**
- View customer inquiries
- Manage inquiry status
- See form submissions from custom jewelry forms
- **Source**: Forms on `/custom/[type]` pages

### 6. **Users**
- Manage admin users
- Control access to CMS
- **Access**: Only through CMS

## 🎯 How to Use the CMS

### Step 1: Access CMS
1. Go to: `https://alassali-jewelry.vercel.app/cms`
2. If no user exists, create your first admin user
3. Login with your credentials

### Step 2: Manage Content

**Add Gallery Items:**
1. Go to "Gallery" in CMS
2. Click "Create New"
3. Fill in title, description, upload image, select category
4. Check "Featured" if you want it on homepage
5. Save
6. **Result**: Item appears on `/catalog`, `/portfolio`, and homepage (if featured)

**Manage Homepage:**
1. Go to "Homepage" in CMS
2. Edit hero title, subtitle
3. Select featured items from Gallery
4. Add/edit testimonials
5. Save
6. **Result**: Changes appear on `/` (homepage)

**Create Custom Pages:**
1. Go to "Pages" in CMS
2. Click "Create New"
3. Add title, slug (URL path), content
4. Set SEO meta tags
5. Check "Published" to make it live
6. Save
7. **Result**: Page accessible at custom route (to be implemented)

**View Inquiries:**
1. Go to "Inquiries" in CMS
2. See all customer form submissions
3. Update status, respond to inquiries

## ✅ What's Working

- ✅ All website pages load
- ✅ Gallery items display from Payload CMS
- ✅ Homepage displays featured items from Payload
- ✅ Forms submit to Payload CMS
- ✅ API endpoints functional
- ✅ Database connected
- ✅ Collections configured

## ⚠️ Admin UI Status

The admin UI at `/cms` may show a loading screen. If it doesn't load:
- Use the API directly (all endpoints work)
- Or check Payload 3.0 documentation for admin UI setup
- The API is fully functional, so you can manage content programmatically

## 🚀 Next Steps

1. **Push to deploy**: `git push origin main`
2. **Access CMS**: Go to `/cms` after deployment
3. **Create content**: Add gallery items, manage homepage
4. **View website**: See your content on the live site
