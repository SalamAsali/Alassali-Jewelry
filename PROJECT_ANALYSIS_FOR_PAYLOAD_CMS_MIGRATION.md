# Alassali Jewelry - Complete Project Analysis for Payload CMS Migration

## Executive Summary

This document provides an in-depth analysis of the Alassali Jewelry e-commerce website, designed to facilitate a complete remake using **Payload CMS** with a fully functional backend and frontend. The current implementation uses **Next.js 15** (App Router), **DatoCMS**, **TailwindCSS**, and **Framer Motion**.

---

## Table of Contents

1. [Business Overview](#1-business-overview)
2. [Current Tech Stack](#2-current-tech-stack)
3. [Design System & Branding](#3-design-system--branding)
4. [Data Models & Collections](#4-data-models--collections)
5. [Frontend Architecture](#5-frontend-architecture)
6. [Routes & Pages](#6-routes--pages)
7. [API Endpoints](#7-api-endpoints)
8. [UI Components](#8-ui-components)
9. [Features & Functionality](#9-features--functionality)
10. [Payload CMS Migration Guide](#10-payload-cms-migration-guide)

---

## 1. Business Overview

### Brand Identity
- **Business Name**: Alassali Jewelry
- **Location**: Toronto & Mississauga, Ontario, Canada
- **Founded**: 2020
- **Tagline**: "Crafting bespoke luxury jewelry in Toronto since 2020. Where tradition meets innovation."
- **Brand Values**: Quiet Luxury, Ethical Transparency, Precision Craftsmanship, Multicultural Excellence

### Target Market
- High-end custom jewelry clients
- Engagement ring buyers
- Custom grillz enthusiasts
- Chain and pendant collectors
- Toronto/GTA luxury market

### Services Offered
1. **Custom Engagement Rings** - Bespoke engagement rings with natural/lab-grown diamonds
2. **Custom Grillz** - Gold grillz (Top 6, Bottom 6, Full Set, Single Tooth, Fangs)
3. **Custom Chains** - Miami Cuban, Rope, Franco, Figaro, Box Chain
4. **Custom Pendants** - Initial, Name, Symbol, Religious, Custom Design
5. **Custom Rings** - Statement, Band, Signet, Stackable designs
6. **Custom Earrings** - Studs, Hoops, Drops, Chandeliers
7. **Custom Bracelets** - Tennis, Chain, Bangle, Cuff

### Value Propositions
- Made in Toronto (local craftsmanship)
- Fully insured shipping
- Lifetime warranty
- Complimentary resizing
- Adult signature required (21+)
- Flexible payment plans
- Both natural and lab-grown diamond options

---

## 2. Current Tech Stack

### Frontend Framework
```json
{
  "framework": "Next.js 15",
  "router": "App Router",
  "rendering": "Client-side components with dynamic data fetching",
  "styling": "TailwindCSS 3.4.17",
  "animations": "Framer Motion 12.23.26",
  "icons": "Lucide React 0.562.0"
}
```

### CMS (Current)
```json
{
  "cms": "DatoCMS",
  "api": "GraphQL",
  "client": "@datocms/cda-client 0.2.10",
  "integration": "react-datocms 7.2.10"
}
```

### Backend Services
```json
{
  "python_backend": {
    "framework": "FastAPI",
    "database": "MongoDB (Motor async client)",
    "payments": "Stripe",
    "file_upload": "Local filesystem"
  }
}
```

### Key Dependencies
```json
{
  "dependencies": {
    "next": "^15.1.11",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "framer-motion": "^12.23.26",
    "lucide-react": "^0.562.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.2.0",
    "sharp": "^0.33.0",
    "resend": "^6.8.0",
    "axios": "^1.13.2",
    "graphql": "^16.9.0"
  }
}
```

### Deployment
- **Platform**: Vercel
- **Framework Settings**: Next.js
- **Build Command**: `next build`

---

## 3. Design System & Branding

### Color Palette

#### Primary Colors
```css
/* Backgrounds */
--ivory: #FFFFF0;
--off-white: #FAFAF8;
--warm-white: #F5F5F0;

/* Text & Headings */
--charcoal: #2C2C2C;
--deep-charcoal: #1A1A1A;
--soft-black: #0A0A0A;

/* Accents (Gold) */
--champagne-gold: #C9A75E;  /* Primary CTA color */
--warm-gold: #D4AF37;       /* Hover states */
--rose-gold: #B89778;

/* Neutral Depth */
--taupe: #8B7D6B;           /* Secondary text */
--warm-gray: #A9A9A9;
--soft-beige: #E8E3D9;
--stone: #D4CFC5;           /* Borders */

/* Semantic */
--success: #4A7C59;
--error: #8B4049;
--warning: #B8956A;
--info: #6B7C8B;
```

### Typography

```css
/* Font Families */
--font-heading: 'Cormorant Garamond', serif;
--font-body: 'Inter', sans-serif;
--font-accent: 'Playfair Display', serif;

/* Font Imports */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

### Design Principles
1. **Quiet Luxury** - Understated elegance, not flashy
2. **Whitespace-Driven** - Generous breathing room, boutique feel
3. **Precision & Craftsmanship** - Every detail matters
4. **Sophisticated Motion** - Subtle, smooth animations

### Gradient Usage (Limited)
```css
/* Hero Background */
linear-gradient(180deg, #FFFFF0 0%, #F5F5F0 50%, #E8E3D9 100%)

/* CTA Button Gradient */
linear-gradient(135deg, #D4AF37 0%, #C9A75E 100%)

/* Hero Text Gradient (Gold fade) */
linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)
```

### Component Styling Classes
```css
/* Buttons */
.btn-primary: bg-champagne-gold text-soft-black rounded-lg
.btn-secondary: border-2 border-charcoal text-charcoal rounded-lg
.btn-ghost: text-charcoal hover:bg-soft-beige rounded-lg

/* Cards */
.product-card: bg-white rounded-lg overflow-hidden hover:shadow-xl

/* Inputs */
.input-field: border border-stone focus:border-champagne-gold rounded-lg

/* Container */
.section-container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

---

## 4. Data Models & Collections

### 4.1 Gallery / Products Collection
```typescript
interface GalleryItem {
  id: string;
  title: string;                    // Required - Product name
  description?: string;              // Multi-line text
  image: DatoCMSImage;              // Single asset, required
  category?: string;                 // engagement-rings, grillz, chains, pendants, rings, earrings, bracelets
  featured?: boolean;                // For homepage featured section
  order?: number;                    // Display order
}

interface DatoCMSImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  responsiveImage?: {
    src: string;
    width: number;
    height: number;
    alt?: string;
    base64?: string;              // Blur placeholder
  }
}
```

### 4.2 Homepage (Single Instance)
```typescript
interface HomepageData {
  id: string;
  title: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: DatoCMSImage;
  featuredItems?: GalleryItem[];    // Links to Gallery
  testimonials?: Testimonial[];      // Modular content block
  processSteps?: ProcessStep[];      // Custom design process
  madeInTorontoImages?: MadeInTorontoImage[];
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;                    // 1-5 stars
}

interface ProcessStep {
  id: string;
  label: string;                     // e.g., "Consultation", "Sketch"
  description: string;               // e.g., "Discuss Your Vision"
  icon: DatoCMSImage;
}

interface MadeInTorontoImage {
  id: string;
  image: DatoCMSImage;
}
```

### 4.3 Pages Collection
```typescript
interface PageData {
  id: string;
  title: string;                     // Required
  slug: string;                      // Required, unique
  content?: string;                  // Structured text / Rich text
  metaTitle?: string;                // SEO
  metaDescription?: string;          // SEO
  published?: boolean;
}
```

### 4.4 Header (Single Instance - Global)
```typescript
interface HeaderData {
  logo?: DatoCMSImage;
  navItems?: Array<{
    label: string;
    url: string;
  }>;
}
```

### 4.5 Footer (Single Instance - Global)
```typescript
interface FooterData {
  logo?: DatoCMSImage;
  tagline?: string;
  navItems?: Array<{
    label: string;
    url: string;
  }>;
  phone?: string;
  email?: string;
  location?: string;
}
```

### 4.6 Custom Inquiry (Form Submissions)
```typescript
interface CustomInquiry {
  type: string;                      // engagement-rings, grillz, chains, etc.
  name: string;                      // Required
  email: string;                     // Required
  phone?: string;
  budget?: string;                   // Price range
  style?: string;                    // Selected style option
  metalType?: string;                // Selected metal
  stonePreferences?: string[];       // Multi-select
  size?: string;                     // Ring/chain size
  timeline?: string;                 // When needed
  notes?: string;                    // Additional details
  inspirationImages?: string[];      // Uploaded reference images
  status: string;                    // new, in-progress, completed
  createdAt: Date;
}
```

### 4.7 Products (Backend Model - E-commerce)
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;                  // engagement-rings, grillz, chains, pendants
  inventoryType: string;             // natural, lab-grown
  metalType?: string;
  stoneType?: string;
  images: string[];
  specifications: Record<string, any>;
  featured: boolean;
  inStock: boolean;
  createdAt: Date;
}
```

### 4.8 Cart / Order Models
```typescript
interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  sessionId: string;
  items: CartItem[];
  updatedAt: Date;
}

interface Order {
  sessionId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentStatus: string;             // pending, paid, failed
  stripeSessionId?: string;
  customerEmail?: string;
  createdAt: Date;
}
```

### 4.9 Blog Posts
```typescript
interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
}
```

---

## 5. Frontend Architecture

### Directory Structure
```
app/
├── (frontend)/                      # Frontend route group
│   ├── layout.tsx                   # Header + Footer wrapper
│   ├── page.tsx                     # Homepage
│   ├── globals.css                  # Global styles + Tailwind
│   ├── catalog/
│   │   └── page.tsx                 # Product catalog with filters
│   ├── portfolio/
│   │   └── page.tsx                 # Gallery portfolio
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx             # Product detail page
│   ├── custom/
│   │   └── [type]/
│   │       └── page.tsx             # Multi-step inquiry form
│   ├── cart/
│   │   └── page.tsx                 # Shopping cart
│   ├── checkout/
│   │   ├── success/                 # Payment success
│   │   └── cancel/                  # Payment cancelled
│   ├── faq/
│   │   └── page.tsx                 # FAQ accordion
│   └── cms/                         # CMS redirect
├── (payload)/                       # Payload admin route group
│   ├── admin/                       # Admin panel
│   └── api/                         # Payload API routes
├── api/                             # Next.js API routes
│   ├── gallery/
│   │   ├── route.ts                 # GET all gallery items
│   │   └── [id]/route.ts            # GET single item
│   ├── homepage/route.ts            # GET homepage content
│   ├── pages/route.ts               # GET all pages
│   └── inquiries/route.ts           # POST inquiry submission
└── layout.tsx                       # Root layout

components/
├── Navigation.tsx                   # Main navigation with mega menus
├── Footer.tsx                       # Site footer
├── DiamondPattern.tsx               # Decorative SVG pattern
└── DotPattern.tsx                   # Decorative dot background

lib/
├── datocms.ts                       # DatoCMS GraphQL client
├── getGlobals.ts                    # Header/Footer data fetching
├── getImageUrl.ts                   # Image URL helper
├── getURL.ts                        # URL utilities
└── mergeOpenGraph.ts                # SEO utilities

Header/
├── Component.tsx                    # Server component wrapper
└── config.ts                        # Header configuration

Footer/
├── Component.tsx                    # Server component wrapper
└── config.ts                        # Footer configuration
```

### State Management
- **Local Storage**: Cart persistence
- **React State**: Component-level state with `useState`
- **URL State**: Filter parameters via `useSearchParams`

### Data Fetching Patterns
```typescript
// Client-side fetching pattern
'use client'

const [data, setData] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const response = await fetch(`${baseUrl}/api/endpoint`)
    if (response.ok) {
      setData(await response.json())
    }
    setLoading(false)
  }
  fetchData()
}, [])
```

---

## 6. Routes & Pages

### Public Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Homepage | Hero section, process steps, testimonials, featured products, CTA |
| `/catalog` | Product catalog | Filterable grid, category filters, product cards |
| `/catalog?category={cat}` | Filtered catalog | Pre-filtered by category |
| `/catalog?featured=true` | Featured items | Shows only featured products |
| `/portfolio` | Gallery portfolio | Masonry-style image grid with hover overlays |
| `/product/[id]` | Product detail | Full product info, image gallery, add to cart |
| `/custom/[type]` | Custom inquiry form | Multi-step wizard (5 steps) |
| `/cart` | Shopping cart | Cart items, quantity controls, order summary |
| `/checkout/success` | Payment success | Order confirmation |
| `/checkout/cancel` | Payment cancelled | Return to cart prompt |
| `/faq` | FAQ page | Accordion-style Q&A by category |

### Custom Jewelry Types
- `/custom/engagement-rings`
- `/custom/grillz`
- `/custom/chains`
- `/custom/pendants`
- `/custom/rings`
- `/custom/earrings`
- `/custom/bracelets`

### Admin Routes
| Route | Description |
|-------|-------------|
| `/admin` | Payload CMS admin panel |

---

## 7. API Endpoints

### Next.js API Routes (Current)

#### Gallery API
```typescript
// GET /api/gallery
// Query params: ?featured=true&category=engagement-rings
// Returns: GalleryItem[]

// GET /api/gallery/[id]
// Returns: GalleryItem | 404
```

#### Homepage API
```typescript
// GET /api/homepage
// Returns: HomepageData with fallback defaults
```

#### Inquiries API
```typescript
// POST /api/inquiries
// Body: { name, email, phone?, type, budget?, style?, metalType?, notes? }
// Returns: { success: true, id: string }
```

### FastAPI Backend Endpoints

#### Products
```
GET    /api/products                   # List products (filter: category, inventory_type, featured)
GET    /api/products/{id}              # Get single product
POST   /api/products                   # Create product (admin)
PUT    /api/products/{id}              # Update product (admin)
DELETE /api/products/{id}              # Delete product (admin)
```

#### Cart
```
GET    /api/cart/{session_id}          # Get cart with product details
POST   /api/cart/{session_id}/add      # Add item to cart
POST   /api/cart/{session_id}/remove   # Remove item from cart
POST   /api/cart/{session_id}/update   # Update item quantity
```

#### Checkout
```
POST   /api/checkout/create-session    # Create Stripe checkout
GET    /api/checkout/status/{id}       # Check payment status
POST   /api/webhook/stripe             # Stripe webhook handler
```

#### Inquiries
```
POST   /api/inquiries                  # Submit inquiry
POST   /api/inquiries/upload           # Upload inspiration image
GET    /api/inquiries                  # List inquiries (admin)
GET    /api/inquiries/{id}             # Get single inquiry
PATCH  /api/inquiries/{id}             # Update inquiry status
```

#### Blog
```
GET    /api/blog                       # List published posts
GET    /api/blog/{slug}                # Get post by slug
POST   /api/blog                       # Create post (admin)
```

#### Admin
```
POST   /api/admin/login                # Admin authentication
GET    /api/admin/stats                # Dashboard statistics
POST   /api/seed                       # Seed database (dev)
```

---

## 8. UI Components

### Navigation Component
**Location**: `components/Navigation.tsx`

**Features**:
- Sticky header with blur backdrop
- Logo (inverted for dark background)
- Mega menu for Products (categories dropdown)
- Mega menu for Bespoke (custom jewelry types)
- Portfolio & FAQ links
- "Start Your Journey" CTA button
- Shopping cart with badge count
- Mobile hamburger menu with accordion
- Framer Motion animations

**Product Categories in Nav**:
- The Icons (featured)
- New In
- Engagement Rings
- Grillz
- Chains
- Pendants
- Bracelets
- Earrings
- Rings
- Diamonds (Natural / Lab-Grown)

### Footer Component
**Location**: `components/Footer.tsx`

**Sections**:
1. Brand column (logo, tagline, "Made in Toronto")
2. Shop links (Engagement Rings, Grillz, Chains, Pendants, Featured)
3. Bespoke Services links
4. Newsletter signup + Contact info + Social icons
5. Trust badges (Insured Shipping, Lifetime Warranty, Resizing, Adult Signature)
6. Copyright

### Decorative Components
- `DiamondPattern.tsx` - SVG diamond geometric pattern
- `DotPattern.tsx` - Scattered dot background

### Homepage Sections
1. **Hero Section** - Dark background, large typography "TORONTO Custom Jeweler", CTA
2. **Custom Made Section** - 6-step process cards with icons
3. **Made In Toronto Section** - Typography art with embedded images
4. **Testimonials Section** - 3-column review cards with Google branding
5. **The Icons Section** - Featured products grid
6. **Final CTA Section** - "Ready to Create Something Extraordinary?"

### Product Card Component
```typescript
// Features:
// - Aspect square image container
// - Hover scale animation on image
// - Title, description (line-clamp-2), category badge
// - Hover lift (-8px translateY)
// - Shadow transition
```

### Multi-Step Form (Custom Inquiry)
**Location**: `app/(frontend)/custom/[type]/page.tsx`

**Steps**:
1. **Contact Info** - Name, email, phone
2. **Budget** - Budget range selection
3. **Style Selection** - Style options based on jewelry type
4. **Metal & Stones** - Metal type, stone preferences
5. **Size & Timeline** - Size, timeline, notes, image upload
6. **Confirmation** - Success message

### FAQ Accordion
**Categories**:
- Payment (forms of payment, splitting, deposits, refunds)
- Shipping (tracking, duration, insurance)
- Custom Orders (timeline, design preview, returns)
- Care & Maintenance (cleaning, resizing, warranty)

---

## 9. Features & Functionality

### E-commerce Features
- [x] Product catalog with category filtering
- [x] Product detail pages
- [x] Shopping cart (localStorage persistence)
- [x] Quantity adjustment
- [x] Cart badge in navigation
- [x] Stripe checkout integration
- [x] Order success/cancel pages

### Custom Jewelry Features
- [x] Multi-step inquiry wizard
- [x] Type-specific style options
- [x] Metal type selection
- [x] Stone preferences (multi-select)
- [x] Size specification
- [x] Timeline selection
- [x] Image upload for inspiration
- [x] Form validation

### Content Features
- [x] CMS-driven homepage content
- [x] Testimonials display
- [x] Process steps with icons
- [x] Gallery/Portfolio page
- [x] FAQ with accordion
- [x] Blog posts

### UX Features
- [x] Responsive design (mobile-first)
- [x] Smooth scroll
- [x] Custom scrollbar styling
- [x] Loading states with spinners
- [x] Empty states for catalog/cart
- [x] Hover animations (scale, lift)
- [x] Page transitions with Framer Motion
- [x] Mega menu dropdowns

### SEO Features
- [x] Meta titles and descriptions
- [x] OpenGraph configuration
- [x] Semantic HTML
- [x] Image alt texts

---

## 10. Payload CMS Migration Guide

### Recommended Payload Collections

#### 1. Products Collection
```typescript
// collections/Products.ts
{
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'price'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    { name: 'price', type: 'number' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Engagement Rings', value: 'engagement-rings' },
        { label: 'Grillz', value: 'grillz' },
        { label: 'Chains', value: 'chains' },
        { label: 'Pendants', value: 'pendants' },
        { label: 'Rings', value: 'rings' },
        { label: 'Earrings', value: 'earrings' },
        { label: 'Bracelets', value: 'bracelets' },
      ],
    },
    {
      name: 'inventoryType',
      type: 'select',
      options: [
        { label: 'Natural', value: 'natural' },
        { label: 'Lab-Grown', value: 'lab-grown' },
      ],
    },
    { name: 'metalType', type: 'text' },
    { name: 'stoneType', type: 'text' },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'specifications',
      type: 'group',
      fields: [
        { name: 'carat', type: 'text' },
        { name: 'clarity', type: 'text' },
        { name: 'color', type: 'text' },
        { name: 'cut', type: 'text' },
        { name: 'length', type: 'text' },
        { name: 'width', type: 'text' },
        { name: 'weight', type: 'text' },
      ],
    },
    { name: 'featured', type: 'checkbox' },
    { name: 'inStock', type: 'checkbox', defaultValue: true },
  ],
}
```

#### 2. Homepage Global
```typescript
// globals/Homepage.ts
{
  slug: 'homepage',
  fields: [
    { name: 'heroTitle', type: 'text' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'processSteps',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'text', type: 'textarea' },
        { name: 'rating', type: 'number', min: 1, max: 5 },
        { name: 'source', type: 'text' },
      ],
    },
    {
      name: 'madeInTorontoImages',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
  ],
}
```

#### 3. Header Global
```typescript
// globals/Header.ts
{
  slug: 'header',
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
            { name: 'icon', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
```

#### 4. Footer Global
```typescript
// globals/Footer.ts
{
  slug: 'footer',
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'tagline', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'location', type: 'textarea' },
    {
      name: 'shopLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'bespokeLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['instagram', 'facebook', 'twitter'] },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'trustBadges',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
      ],
    },
  ],
}
```

#### 5. Inquiries Collection
```typescript
// collections/Inquiries.ts
{
  slug: 'inquiries',
  admin: {
    defaultColumns: ['name', 'email', 'type', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: ['engagement-rings', 'grillz', 'chains', 'pendants', 'rings', 'earrings', 'bracelets'],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'budget', type: 'text' },
    { name: 'style', type: 'text' },
    { name: 'metalType', type: 'text' },
    {
      name: 'stonePreferences',
      type: 'select',
      hasMany: true,
      options: ['Diamond', 'Moissanite', 'Sapphire', 'Ruby', 'Emerald', 'Lab-Grown Diamond'],
    },
    { name: 'size', type: 'text' },
    { name: 'timeline', type: 'text' },
    { name: 'notes', type: 'textarea' },
    {
      name: 'inspirationImages',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
      ],
    },
  ],
}
```

#### 6. Orders Collection
```typescript
// collections/Orders.ts
{
  slug: 'orders',
  fields: [
    { name: 'orderNumber', type: 'text' },
    { name: 'customerEmail', type: 'email' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'quantity', type: 'number' },
        { name: 'price', type: 'number' },
      ],
    },
    { name: 'total', type: 'number' },
    {
      name: 'paymentStatus',
      type: 'select',
      options: ['pending', 'paid', 'failed', 'refunded'],
    },
    { name: 'stripeSessionId', type: 'text' },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'city', type: 'text' },
        { name: 'province', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
  ],
}
```

#### 7. Pages Collection
```typescript
// collections/Pages.ts
{
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'content', type: 'richText' },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
}
```

#### 8. FAQ Collection
```typescript
// collections/FAQ.ts
{
  slug: 'faq',
  fields: [
    {
      name: 'category',
      type: 'select',
      options: ['Payment', 'Shipping', 'Custom Orders', 'Care & Maintenance'],
    },
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'order', type: 'number' },
  ],
}
```

### Payload Configuration
```typescript
// payload.config.ts
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Alassali Jewelry Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  collections: [
    Products,
    Inquiries,
    Orders,
    Pages,
    FAQ,
    Media,
    Users,
  ],
  globals: [
    Homepage,
    Header,
    Footer,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
```

### Key Migration Considerations

1. **Replace DatoCMS GraphQL with Payload Local API**
   - Use `payload.find()` and `payload.findGlobal()` for data fetching
   - Server Components can fetch directly from Payload

2. **Image Handling**
   - Migrate from DatoCMS CDN to Payload Media collection
   - Configure image sizes for responsive images
   - Update `next.config.mjs` remotePatterns

3. **Form Submissions**
   - Create Payload Inquiries collection
   - Use Payload form builder or custom endpoints

4. **Authentication**
   - Payload includes built-in auth with Users collection
   - Admin panel is automatically configured

5. **E-commerce Integration**
   - Stripe integration via custom endpoints or plugins
   - Cart can remain client-side with localStorage
   - Orders synced to Payload after payment

6. **Email Notifications**
   - Configure Payload email adapter
   - Create email templates for inquiry confirmations

### Required Environment Variables
```env
# Database
MONGODB_URI=mongodb://...
DATABASE_URI=mongodb://...

# Payload
PAYLOAD_SECRET=your-secret-key
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...

# Next.js
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## Appendix: Assets & Resources

### Logo
- Default logo URL: `https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/mos4tvrw_Final-W2-1.png`
- Display: Inverted (filter: invert(1)) on dark backgrounds

### Sample Product Images
Located in external CDN (emergentagent.com):
- Pendants collection
- Chain designs
- Grillz sets
- Custom rings
- G-pendant design

### Process Step Icons
- Consultation, Sketch, Material Selection, Design, In-House Manufacture, Presentation

### Sample Testimonials
1. "gray" - 5 stars - Creativity and execution praise
2. "Umair Alahi" - 5 stars - Customer service experience
3. "Padrono" - 5 stars - Custom grillz fair pricing

---

## Summary

This project is a sophisticated luxury jewelry e-commerce platform with:
- **Rich frontend** built with Next.js 15, TailwindCSS, and Framer Motion
- **CMS-driven content** currently using DatoCMS
- **Multi-step custom inquiry forms** for bespoke jewelry
- **E-commerce functionality** with Stripe integration
- **Dark luxury aesthetic** with gold accents

For the Payload CMS migration, focus on:
1. Setting up Payload collections to match the data models
2. Creating globals for Header/Footer/Homepage
3. Migrating API routes to use Payload Local API
4. Configuring admin panel for content editors
5. Integrating Stripe for payments
6. Setting up email notifications for inquiries

The frontend components and styling can largely be preserved, requiring only updates to data fetching methods and image handling.
