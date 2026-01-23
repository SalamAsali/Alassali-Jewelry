# Complete Website Routes Guide

## 🌐 Your Website URLs

### Public Website Pages

1. **Homepage**
   - URL: `https://alassali-jewelry.vercel.app/`
   - Description: Main landing page with hero, featured items, testimonials
   - Managed by: Homepage collection in Payload CMS

2. **Product Catalog**
   - URL: `https://alassali-jewelry.vercel.app/catalog`
   - Description: Browse all jewelry items with filters
   - Managed by: Gallery collection in Payload CMS

3. **Portfolio**
   - URL: `https://alassali-jewelry.vercel.app/portfolio`
   - Description: Showcase of all work (18 items)
   - Managed by: Gallery collection in Payload CMS

4. **Product Detail**
   - URL: `https://alassali-jewelry.vercel.app/product/[id]`
   - Example: `https://alassali-jewelry.vercel.app/product/123`
   - Description: Individual product/gallery item page
   - Managed by: Gallery collection in Payload CMS

5. **Custom Jewelry Forms**
   - URL: `https://alassali-jewelry.vercel.app/custom/[type]`
   - Examples:
     - `/custom/engagement-rings`
     - `/custom/grillz`
     - `/custom/chains`
     - `/custom/pendants`
   - Description: Custom jewelry inquiry forms
   - Managed by: FormFields and Inquiries collections

6. **Shopping Cart**
   - URL: `https://alassali-jewelry.vercel.app/cart`
   - Description: Shopping cart page

7. **Checkout Success**
   - URL: `https://alassali-jewelry.vercel.app/checkout/success`
   - Description: Order confirmation page

8. **Checkout Cancel**
   - URL: `https://alassali-jewelry.vercel.app/checkout/cancel`
   - Description: Payment cancellation page

9. **FAQ**
   - URL: `https://alassali-jewelry.vercel.app/faq`
   - Description: Frequently asked questions

### CMS Admin Panel

10. **Payload CMS Admin**
    - URL: `https://alassali-jewelry.vercel.app/cms`
    - Alternative: `https://alassali-jewelry.vercel.app/admin`
    - Description: Content management system to manage all website content
    - Collections Available:
      - **Users** - Manage admin users
      - **Media** - Upload and manage images/files
      - **Gallery** - Manage jewelry items/products
      - **Pages** - Manage custom pages (NEW)
      - **Homepage** - Manage homepage content (NEW)
      - **FormFields** - Manage form configurations
      - **Inquiries** - View customer inquiries

### API Endpoints

11. **Gallery API**
    - URL: `https://alassali-jewelry.vercel.app/api/gallery`
    - Methods: GET
    - Description: Fetch gallery items (used by website)

12. **Gallery Item API**
    - URL: `https://alassali-jewelry.vercel.app/api/gallery/[id]`
    - Methods: GET
    - Description: Fetch specific gallery item

13. **Inquiries API**
    - URL: `https://alassali-jewelry.vercel.app/api/inquiries`
    - Methods: POST
    - Description: Submit customer inquiries

14. **Payload CMS API**
    - Base URL: `https://alassali-jewelry.vercel.app/api/payload`
    - Examples:
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
- Set featured items
- Add categories
- Upload images
- Add descriptions

### 2. **Pages** (NEW - Custom Pages)
- Create custom pages
- Manage page content
- Set SEO meta tags
- Control publishing

### 3. **Homepage** (NEW - Homepage Content)
- Edit hero section
- Manage featured items
- Update testimonials
- Change homepage content

### 4. **Media**
- Upload images
- Manage files
- Organize media library

### 5. **Inquiries**
- View customer inquiries
- Manage inquiry status
- See form submissions

### 6. **Users**
- Manage admin users
- Control access

## 🎯 How to Use

1. **Access CMS**: Go to `/cms` or `/admin`
2. **Login**: Create your first admin user (if not exists)
3. **Manage Content**: 
   - Add gallery items → They appear on `/catalog` and `/portfolio`
   - Edit homepage → Changes appear on `/`
   - Create pages → Accessible at custom routes
4. **View Website**: Changes reflect immediately on your site
