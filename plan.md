# Alassali Luxury Jewelry Web App — Plan v1

## 1) Objectives (North Star)
- Deliver a stunning, luxury “digital atelier” experience with smooth motion and refined typography.
- Enable bespoke jewelry intake via beautiful multi-step (Typeform-like) forms per jewelry type.
- Provide a functional product catalog (sample data), cart, and demo Stripe checkout.
- Build a simple admin panel to manage custom inquiries and products.
- Ensure mobile-first responsiveness, fast image handling/zoom, and strong SEO foundations for Toronto/Mississauga.

---

## 2) Phase 1 — Core POC (Isolation)
Focus: Payment processing (Stripe) — Level 4 integration requires POC.

### Scope
- Validate Stripe PaymentIntent flow end-to-end in isolation (create intent, confirm client secret usable, success/cancel paths).
- Add minimal webhook endpoint with DEV_TEST_MODE path for automated verification (bypassed signature only under test).
- Optional micro-POC: single image upload + static serve (to de-risk file handling for forms).

### Steps
1) Identify core and risks: Stripe API keys, PaymentIntents, webhook signature, checkout flows & redirects.
2) Integration Playbook: Call integration_playbook_expert_v2 for “Stripe (PaymentIntent + Webhooks) with FastAPI + React”.
3) Web search: Confirm latest best practices for Stripe + FastAPI webhooks, idempotency, and PaymentElement setup.
4) Collect credentials (TEST mode): STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET.
5) Implement isolated FastAPI routes under /api/poc/stripe:
   - POST /create-intent -> returns client_secret, amount, currency
   - POST /webhook -> handle payment_intent.succeeded/failed (DEV_TEST_MODE supports unsigned test events)
   - GET /health -> sanity check
6) Optional: Implement POST /api/poc/upload-image and serve via /static/uploads/* (for later UI forms).
7) Create single Python test script tests/test_core.py to:
   - hit /api/poc/stripe/create-intent and assert client_secret present
   - post a sample webhook event (DEV_TEST_MODE) and assert 200
   - optional: upload an image and read it back
8) Run tests → Fix until green. Do not proceed until POC passes.

### Phase 1 User Stories
- As a developer, I can create a Stripe PaymentIntent and receive a client_secret via API.
- As a system, I can receive a Stripe-like webhook payload and update payment status.
- As a tester, I can see a clear success/cancel response path defined for frontend use.
- As a developer, I can upload a test image and retrieve it from static hosting.
- As a maintainer, I can run one script that validates all core flows in isolation.

---

## 3) Phase 2 — Main App Development
Build complete MVP around proven core.

### Backend (FastAPI + MongoDB)
- Models (Mongo): Product, Category, InventoryVariant (natural/lab-grown), Cart, Order, Inquiry, BlogPost, AdminUser (simple auth for admin panel only).
- Endpoints (all prefixed with /api):
  - Products: list/filter (by category, inventoryType), detail, CRUD (admin)
  - Cart: add/remove/update items; get cart by sessionId
  - Checkout: POST /checkout/create-intent (wrap POC), POST /checkout/webhook
  - Inquiries: POST per type (engagement-rings, grillz, chains, pendants) with image upload; GET list (admin)
  - Blog: list/detail minimal; CRUD (admin)
  - Auth (admin-only simple): POST /admin/login, JWT-lite or session token (for testing), logout
  - Static: serve uploads; serialize Mongo types safely (ObjectId, datetime)
- Image handling: store to backend/uploads and serve via StaticFiles. Validate type/size.

### Frontend (React + shadcn/ui + Framer Motion)
- Global: Luxury theme (quiet luxury), curated menu: The Icons, New In, Bespoke Stories, plus core categories. Trust badges persistent.
- Pages & routes:
  - Home: hero with motion, curated sections, “Start Your Journey” CTA
  - Catalog: filters (category, natural vs lab-grown), grid with subtle hover motion
  - Product Detail: high-res gallery with zoom, specs, inventory-type toggle, add-to-cart, CTA to relevant custom form
  - Cart & Checkout: embedded Stripe PaymentElement flow using @stripe/react-stripe-js
  - Custom Landing Pages (4): Engagement Rings / Grillz / Chains / Pendants with tailored copy + multi-step form (progress, validations, image upload, review step)
  - Blog: list + detail (few seed posts)
  - Admin: login, dashboard (inquiries table with filters, products CRUD minimal)
- UX polish: motion transitions, skeleton loaders, error toasts, data-testid on interactive elements.

### Data & Content
- Seed sample products across categories; include natural/lab-grown variants.
- Minimal blog posts (2–3) for SEO scaffolding.
- “Made in Toronto” story snippets across pages.

### SEO & Performance
- Per-page meta tags (title/description), Open Graph, clean slugs.
- Lazy-load images, compress where applicable, responsive sources.

### Analytics & Quality
- Basic event logging (add-to-cart, inquiry submit, checkout start/success) to console for now.
- Linting for Python/JS; logs check via supervisor tails.

### Phase 2 User Stories
- As a visitor, I can filter catalog items by category and by natural vs lab-grown.
- As a shopper, I can view a product with zoomable images and add it to cart.
- As a shopper, I can complete a demo payment with Stripe and receive a success confirmation.
- As a client, I can open a custom “Grillz” landing page and submit a multi-step inquiry with images.
- As a client, I can use “Start Your Journey” on any product page to jump into the matching custom form.
- As an admin, I can log in and view all inquiries in a table with statuses.
- As an admin, I can create/edit a product and see it appear in the catalog.
- As a reader, I can open a blog post and see SEO-friendly metadata.
- As a mobile user, I can comfortably navigate with thumb-zone optimized menu and CTAs.

### Tooling & Integrations in Phase 2
- Design Guidelines: Call design_agent with problem statement and luxury preferences.
- Dependencies: yarn add @stripe/stripe-js @stripe/react-stripe-js framer-motion axios; backend: pip install stripe python-multipart.
- Respect env: use REACT_APP_BACKEND_URL for API calls; use MONGO_URL; add STRIPE keys via backend .env and restart backend only if .env changes.

### Testing (end of Phase 2)
- Use testing_agent_v3 for end-to-end: catalog flow, filter, product zoom, form submit (skip drag&drop, camera), cart → checkout → success, admin CRUD.
- Fix all issues; re-run until green.

---

## 4) Next Actions (Immediately After Plan Approval)
1) Provide Stripe TEST keys: STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
2) Confirm whether to include the optional image-upload POC in Phase 1.
3) I will execute Phase 1 POC (Stripe), fix until passing, then proceed to Phase 2.
4) Once POC passes, I’ll call design_agent (~10 min) to lock UI direction and start full-stack implementation (20–30 min build window).

---

## 5) Success Criteria (Definition of Done)
- POC: Single script validates PaymentIntent creation and webhook handler (DEV_TEST_MODE) — green.
- Frontend: No import/runtime errors; luxury UI with smooth motion; mobile responsive; all interactive elements have data-testid.
- Catalog: Filter by category and inventory type; product detail with zoom; cart works.
- Custom portal: 4 landing pages with polished multi-step forms, image upload, confirmation screen.
- Checkout: Demo Stripe flow completes and records an order.
- Admin: Simple login; manage products; view inquiries with status.
- SEO: Basic blog pages, meta tags, “Made in Toronto” storytelling visible.
- All API routes under /api; environment variables respected; images upload and display correctly in UI.
