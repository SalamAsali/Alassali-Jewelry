# Alassali Jewelry

A luxury custom jewelry website built with Next.js and DatoCMS.

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **CMS**: DatoCMS (Headless CMS)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- DatoCMS account with API token

### Environment Variables

Create a `.env.local` file:

```env
DATOCMS_API_TOKEN=your_api_token_here
```

### Installation

```bash
npm install
npm run dev
```

### Building

```bash
npm run build
```

## DatoCMS Setup

### Required Models

Create these models in your DatoCMS dashboard:

1. **Gallery** (collection)
   - `title` (Single-line string, required)
   - `description` (Multi-line text)
   - `image` (Single asset, required)
   - `category` (Single-line string)
   - `featured` (Boolean)
   - `order` (Integer)

2. **Homepage** (single instance)
   - `title` (Single-line string)
   - `heroTitle` (Single-line string)
   - `heroSubtitle` (Multi-line text)
   - `heroImage` (Single asset)
   - `featuredItems` (Links to Gallery)
   - `testimonials` (Modular content block)
   - `processSteps` (Modular content block)
   - `madeInTorontoImages` (Modular content block)

3. **Page** (collection)
   - `title` (Single-line string, required)
   - `slug` (Slug, required)
   - `content` (Structured text)
   - `metaTitle` (Single-line string)
   - `metaDescription` (Multi-line text)
   - `published` (Boolean)

4. **Header** (single instance)
   - `logo` (Single asset)
   - `navItems` (Modular content block)

5. **Footer** (single instance)
   - `logo` (Single asset)
   - `tagline` (Single-line string)
   - `navItems` (Modular content block)
   - `phone` (Single-line string)
   - `email` (Single-line string)
   - `location` (Multi-line text)

## Routes

- `/` - Homepage
- `/catalog` - Product catalog
- `/portfolio` - Gallery portfolio
- `/product/[id]` - Product detail
- `/custom/[type]` - Custom jewelry inquiry forms
- `/cart` - Shopping cart
- `/checkout/success` - Checkout success page
- `/checkout/cancel` - Checkout cancel page
- `/faq` - FAQ page
- `/admin` - Redirects to DatoCMS dashboard

## API Routes

- `GET /api/gallery` - Get gallery items
- `GET /api/gallery/[id]` - Get single gallery item
- `GET /api/homepage` - Get homepage content
- `GET /api/pages` - Get all pages
- `POST /api/inquiries` - Submit inquiry form

## License

Private - All rights reserved
