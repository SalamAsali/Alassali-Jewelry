# DatoCMS Model Specification

Create these models in DatoCMS (Settings → Models) so the site can be edited
through the CMS. Until the models exist (and have records), pages fall back
to the hardcoded content in the repo — nothing breaks.

API identifiers are case-sensitive and must match exactly. Each field's API
key is what appears in the generated GraphQL schema.

---

## 1. Header (single-instance) — `header`

Already referenced in `lib/getGlobals.ts`.

| Field | API key | Type | Required |
|---|---|---|---|
| Logo | `logo` | Single asset | optional |
| Nav items | `nav_items` | Modular content (repeating, with `label`, `url`) | optional |

---

## 2. Footer (single-instance) — `footer`

Already referenced in `lib/getGlobals.ts`.

| Field | API key | Type | Required |
|---|---|---|---|
| Logo | `logo` | Single asset | optional |
| Tagline | `tagline` | Text (single-line) | optional |
| Phone | `phone` | Text (single-line) | optional |
| Email | `email` | Text (single-line) | optional |
| Location | `location` | Text (single-line) | optional |
| Nav items | `nav_items` | Modular content (repeating, `label`, `url`) | optional |

---

## 3. Portfolio page (single-instance) — `portfolio_page`

| Field | API key | Type |
|---|---|---|
| Heading | `heading` | Single-line text |
| Intro | `intro` | Multi-paragraph text |

---

## 4. Portfolio category (collection) — `portfolio_category`

| Field | API key | Type |
|---|---|---|
| Name | `name` | Single-line text (required) |
| Slug | `slug` | Slug (required, unique) |
| Order | `order` | Integer |

Seed records: `Rings`, `Pendants`, `Chains`, `Grillz`, `Bracelets`, `Glasses`, `Engagement Rings`.

---

## 5. Portfolio item (collection) — `portfolio_item`

| Field | API key | Type |
|---|---|---|
| Name | `name` | Single-line text (required) |
| Category | `category` | Link → `portfolio_category` |
| Image | `image` | Single asset |
| Order | `order` | Integer |

---

## 6. FAQ page (single-instance) — `faq_page`

| Field | API key | Type |
|---|---|---|
| Heading | `heading` | Single-line text (default: "Frequently Asked Questions") |
| Intro | `intro` | Multi-line text |

---

## 7. FAQ category (collection) — `faq_category`

| Field | API key | Type |
|---|---|---|
| Name | `name` | Single-line text (required) |
| Order | `order` | Integer |

Seed: `Payment`, `Shipping`, `Custom Orders`, `Care & Maintenance`.

---

## 8. FAQ item (collection) — `faq_item`

| Field | API key | Type |
|---|---|---|
| Question | `question` | Single-line text (required) |
| Answer | `answer` | Multi-line text (required) |
| Category | `category` | Link → `faq_category` |
| Order | `order` | Integer |

---

## 9. Blog index (single-instance) — `blog_index`

| Field | API key | Type |
|---|---|---|
| Heading | `heading` | Single-line text (default: "Jewellery Guides") |
| Intro | `intro` | Multi-line text |
| SEO title | `seo_title` | Single-line text |
| SEO description | `seo_description` | Multi-line text |

---

## 10. Blog post (collection) — `blog_post`

Only the index listing is wired up; individual post bodies remain hardcoded
for now.

| Field | API key | Type |
|---|---|---|
| Slug | `slug` | Slug (required, unique) |
| Title | `title` | Single-line text (required) |
| Excerpt | `excerpt` | Multi-line text |
| Date | `date` | Date (or date-time) |
| Reading minutes | `reading_minutes` | Integer |
| Tag | `tag` | Single-line text |

---

## 11. Master jeweller (collection) — `master_jeweller`

Only the top-of-page text is CMS-driven. Education, experience, specialty
cards remain hardcoded — migrate later if needed.

| Field | API key | Type |
|---|---|---|
| Slug | `slug` | Slug (required, unique) |
| Name | `name` | Single-line text |
| Title | `title` | Single-line text (e.g., "Master Jeweller & Founder") |
| Tagline | `tagline` | Multi-line text |
| Bio | `bio` | Multi-paragraph text — separate paragraphs with a blank line |
| SEO title | `seo_title` | Single-line text |
| SEO description | `seo_description` | Multi-line text |

Create a record with slug `mohammad-al-assali` to match the URL used
throughout the site.

---

## Notes

- Every query uses `orderBy: order_ASC` where order exists, and orders by
  `_createdAt_DESC` or `date_DESC` otherwise. Always fill in the `order`
  field on new records where present.
- Fallback behavior: if any query fails, errors, or returns empty, the page
  renders the hardcoded content. Deploy with confidence — missing models
  are not a breaking change.
