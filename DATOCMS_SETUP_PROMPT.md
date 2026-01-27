# DatoCMS Setup Prompt for Antigravity

## Context

You are setting up DatoCMS for the Alassali Jewelry website - a luxury custom jewelry business based in Toronto. The Next.js frontend code is already written and expects specific models and field structures from DatoCMS.

## Project Details

- **Business**: Alassali Jewelry - Custom luxury jewelry (engagement rings, grillz, chains, pendants, rings, earrings, bracelets)
- **Location**: Toronto, Canada
- **Website Theme**: Luxury, elegant, "quiet luxury" aesthetic
- **Brand Colors**: Deep charcoal, champagne gold, soft black, warm taupe

---

## TASK: Create DatoCMS Models

Create the following models in DatoCMS exactly as specified. The field API IDs must match exactly for the GraphQL queries to work.

---

### 1. Gallery (Collection Model)

**Model Settings:**
- Name: `Gallery`
- API ID: `gallery`
- Type: Collection (multiple records)
- Sortable: Yes

**Fields:**

| Field Name | API ID | Type | Required | Notes |
|------------|--------|------|----------|-------|
| Title | `title` | Single-line string | ✅ Yes | Product/piece name |
| Description | `description` | Multi-line text | No | Product description |
| Image | `image` | Single asset (image only) | ✅ Yes | Main product image |
| Category | `category` | Single-line string | No | One of: `engagement-rings`, `grillz`, `chains`, `pendants`, `rings`, `earrings`, `bracelets`, `other` |
| Featured | `featured` | Boolean | No | Default: false |
| Order | `order` | Integer | No | For custom sorting |

---

### 2. Homepage (Single Instance Model)

**Model Settings:**
- Name: `Homepage`
- API ID: `homepage`
- Type: Single instance (only one record)

**Fields:**

| Field Name | API ID | Type | Required | Notes |
|------------|--------|------|----------|-------|
| Title | `title` | Single-line string | No | Internal reference |
| Hero Title | `heroTitle` | Single-line string | No | Main headline (e.g., "TORONTO") |
| Hero Subtitle | `heroSubtitle` | Multi-line text | No | Subheadline text |
| Hero Image | `heroImage` | Single asset (image only) | No | Hero background image |
| Featured Items | `featuredItems` | Links to Gallery | No | Select featured gallery items |
| Testimonials | `testimonials` | Modular content | No | See Testimonial block below |
| Process Steps | `processSteps` | Modular content | No | See ProcessStep block below |
| Made In Toronto Images | `madeInTorontoImages` | Modular content | No | See TorontoImage block below |

**Modular Content Blocks for Homepage:**

#### Testimonial Block
- Block name: `Testimonial`
- API ID: `testimonial`
- Fields:
  - `name` (Single-line string, required) - Customer name
  - `text` (Multi-line text, required) - Review text
  - `rating` (Integer, required) - 1-5 star rating

#### ProcessStep Block
- Block name: `Process Step`
- API ID: `process_step`
- Fields:
  - `label` (Single-line string, required) - Step name (e.g., "Consultation")
  - `description` (Single-line string, required) - Short description
  - `icon` (Single asset, required) - Step icon image

#### TorontoImage Block
- Block name: `Toronto Image`
- API ID: `toronto_image`
- Fields:
  - `image` (Single asset, required) - Image for "Made in Toronto" section

---

### 3. Page (Collection Model)

**Model Settings:**
- Name: `Page`
- API ID: `page`
- Type: Collection (multiple records)

**Fields:**

| Field Name | API ID | Type | Required | Notes |
|------------|--------|------|----------|-------|
| Title | `title` | Single-line string | ✅ Yes | Page title |
| Slug | `slug` | Slug (from title) | ✅ Yes | URL-friendly identifier |
| Content | `content` | Structured text | No | Page body content |
| Meta Title | `metaTitle` | Single-line string | No | SEO title |
| Meta Description | `metaDescription` | Multi-line text | No | SEO description |
| Published | `published` | Boolean | No | Default: false |

---

### 4. Header (Single Instance Model)

**Model Settings:**
- Name: `Header`
- API ID: `header`
- Type: Single instance

**Fields:**

| Field Name | API ID | Type | Required | Notes |
|------------|--------|------|----------|-------|
| Logo | `logo` | Single asset (image only) | No | Site logo |
| Nav Items | `navItems` | Modular content | No | See NavItem block below |

**Modular Content Block:**

#### NavItem Block
- Block name: `Nav Item`
- API ID: `nav_item`
- Fields:
  - `label` (Single-line string, required) - Link text
  - `url` (Single-line string, required) - Link URL (e.g., "/catalog")

---

### 5. Footer (Single Instance Model)

**Model Settings:**
- Name: `Footer`
- API ID: `footer`
- Type: Single instance

**Fields:**

| Field Name | API ID | Type | Required | Notes |
|------------|--------|------|----------|-------|
| Logo | `logo` | Single asset (image only) | No | Footer logo |
| Tagline | `tagline` | Single-line string | No | Brand tagline |
| Nav Items | `navItems` | Modular content | No | Use same NavItem block from Header |
| Phone | `phone` | Single-line string | No | Contact phone |
| Email | `email` | Single-line string | No | Contact email |
| Location | `location` | Multi-line text | No | Physical address |

---

## TASK: Create Sample Content

After creating the models, add this sample content:

### Header Content
- **Nav Items:**
  1. Label: "Portfolio" → URL: "/portfolio"
  2. Label: "Catalog" → URL: "/catalog"
  3. Label: "Custom" → URL: "/custom/engagement-rings"
  4. Label: "FAQ" → URL: "/faq"

### Footer Content
- **Tagline**: "Toronto's Premier Custom Jeweler"
- **Phone**: "(416) 555-0123"
- **Email**: "info@alassalijewelry.com"
- **Location**: "123 Queen Street West\nToronto, ON M5H 2M9"
- **Nav Items:** Same as header

### Homepage Content
- **Hero Title**: "TORONTO"
- **Hero Subtitle**: "Custom Jeweler"
- **Testimonials:**
  1. Name: "gray", Text: "Had a perfect experience! Unmatched creativity and execution, definitely the only place to go in toronto for jewelry", Rating: 5
  2. Name: "Umair Alahi", Text: "My experience shopping here was excellent. They answered all my questions, worked out a price that fits my budget, & helped me choose the perfect piece.", Rating: 5
  3. Name: "Padrono", Text: "I've been to many shops looking for custom grillz and kept getting really high quotes. At this shop I was taken care of and the price was explained. The final product was worth way more than what I paid.", Rating: 5

- **Process Steps:**
  1. Label: "Consultation", Description: "Discuss Your Vision"
  2. Label: "Sketch", Description: "Initial Design"
  3. Label: "Material Selection", Description: "Choose Metals & Stones"
  4. Label: "Design", Description: "CAD Rendering"
  5. Label: "In-House Manufacture", Description: "Crafting"
  6. Label: "Presentation", Description: "Final Reveal"

### Gallery Items (Create at least 4-6 items)

Create sample gallery items with these categories:
- `engagement-rings`
- `grillz`
- `chains`
- `pendants`

Mark 4 items as `featured: true` for the homepage.

---

## TASK: Generate API Token

1. Go to Settings → API tokens
2. Create a new API token with **Read-only** permissions
3. Copy the token - this will be set as `DATOCMS_API_TOKEN` in Vercel

---

## Verification

After setup, verify the GraphQL queries work by testing in DatoCMS API Explorer:

```graphql
query Test {
  allGalleries(first: 5) {
    id
    title
    image { url }
  }
  homepage {
    heroTitle
    testimonials { name text rating }
  }
  header {
    navItems { label url }
  }
  footer {
    tagline
    phone
    email
  }
}
```

---

## Important Notes

1. **API IDs must match exactly** - The frontend GraphQL queries expect these exact field names
2. **Images should be high quality** - The site uses responsive images with automatic optimization
3. **Featured items** - Mark gallery items as featured to show them on homepage
4. **Categories** - Use lowercase with hyphens (e.g., `engagement-rings`, not `Engagement Rings`)
