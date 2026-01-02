# Alassali Jewelry - Luxury E-Commerce Design System
## "Digital Atelier" - Quiet Luxury Design Guidelines

---

## GRADIENT RESTRICTION RULE ⚠️

**CRITICAL: Read this first before implementing any design**

### PROHIBITED:
- ❌ NEVER use dark/saturated gradient combos (e.g., purple/pink, blue-500 to purple-600, purple-500 to pink-500, green-500 to blue-500, red to pink)
- ❌ NEVER let gradients cover more than 20% of the viewport
- ❌ NEVER apply gradients to text-heavy content or reading areas
- ❌ NEVER use gradients on small UI elements (<100px width)
- ❌ NEVER stack multiple gradient layers in the same viewport
- ❌ NEVER use dark gradients for logo, testimonial, footer sections

### ENFORCEMENT RULE:
**IF** gradient area exceeds 20% of viewport **OR** impacts readability  
**THEN** fallback to solid colors immediately

### ALLOWED GRADIENT USAGE:
- ✅ Hero section backgrounds ONLY (with readable text overlay)
- ✅ Large CTA buttons (subtle, 2-color max)
- ✅ Decorative accent elements (non-content areas)
- ✅ Section dividers or subtle overlays

---

## 1. DESIGN PHILOSOPHY & BRAND ATTRIBUTES

### Core Principles:
- **Quiet Luxury**: Understated elegance, not flashy or loud
- **Whitespace-Driven**: Generous breathing room, boutique-like feel
- **Precision & Craftsmanship**: Every detail matters
- **Ethical Transparency**: "Made in Toronto" storytelling
- **Sophisticated Motion**: Subtle, smooth, never jarring

### Brand Personality:
- Sophisticated
- Trustworthy
- Motivating
- Refined
- Multicultural Excellence
- Conscious Luxury

---

## 2. COLOR SYSTEM

### Primary Palette:

```json
{
  "color_system": {
    "primary": {
      "ivory": "#FFFFF0",
      "off_white": "#FAFAF8",
      "warm_white": "#F5F5F0",
      "usage": "Main backgrounds, card backgrounds, content areas"
    },
    "secondary": {
      "charcoal": "#2C2C2C",
      "deep_charcoal": "#1A1A1A",
      "soft_black": "#0A0A0A",
      "usage": "Primary text, headings, navigation"
    },
    "accent_gold": {
      "champagne_gold": "#C9A75E",
      "warm_gold": "#D4AF37",
      "rose_gold": "#B89778",
      "usage": "CTAs, hover states, icons, trust badges, subtle borders"
    },
    "neutral_depth": {
      "taupe": "#8B7D6B",
      "warm_gray": "#A9A9A9",
      "soft_beige": "#E8E3D9",
      "stone": "#D4CFC5",
      "usage": "Secondary text, borders, subtle shadows, card backgrounds"
    },
    "semantic_colors": {
      "success": "#4A7C59",
      "error": "#8B4049",
      "warning": "#B8956A",
      "info": "#6B7C8B",
      "usage": "Form validation, notifications, status indicators"
    }
  }
}
```

### Color Usage Priority:
1. **White/Ivory backgrounds** (#FFFFF0, #FAFAF8) for ALL cards and content areas
2. **Charcoal text** (#2C2C2C) for body, **Deep Charcoal** (#1A1A1A) for headings
3. **Champagne Gold** (#C9A75E) for primary CTAs and interactive elements
4. **Gradients** ONLY for hero sections (max 20% viewport) - use subtle 2-color combinations:
   - Hero Option 1: `linear-gradient(135deg, #FAFAF8 0%, #E8E3D9 100%)`
   - Hero Option 2: `linear-gradient(180deg, #FFFFF0 0%, #F5F5F0 50%, #E8E3D9 100%)`
   - CTA Button: `linear-gradient(135deg, #D4AF37 0%, #C9A75E 100%)`

### Contrast Requirements:
- **Body text on white**: Minimum 7:1 (WCAG AAA) - Use #2C2C2C or darker
- **Headings**: Minimum 7:1 - Use #1A1A1A
- **Gold CTAs**: Ensure text is #0A0A0A or white depending on background
- **All interactive elements**: 4.5:1 minimum

---

## 3. TYPOGRAPHY SYSTEM

### Font Families:

```json
{
  "typography": {
    "primary_font": {
      "name": "Cormorant Garamond",
      "weights": [300, 400, 500, 600, 700],
      "usage": "Headings, hero text, product names, luxury storytelling",
      "import": "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');"
    },
    "secondary_font": {
      "name": "Inter",
      "weights": [300, 400, 500, 600],
      "usage": "Body text, navigation, forms, buttons, product descriptions",
      "import": "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');"
    },
    "accent_font": {
      "name": "Playfair Display",
      "weights": [400, 500, 600, 700],
      "usage": "Special callouts, testimonials, 'Made in Toronto' badges",
      "import": "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');"
    }
  }
}
```

### Typography Scale & Hierarchy:

```json
{
  "text_sizes": {
    "h1_hero": {
      "mobile": "text-4xl (36px)",
      "tablet": "text-5xl (48px)",
      "desktop": "text-6xl (60px)",
      "font": "Cormorant Garamond",
      "weight": "font-light (300) or font-normal (400)",
      "line_height": "leading-tight (1.25)",
      "letter_spacing": "tracking-tight (-0.025em)",
      "usage": "Homepage hero, custom jewelry landing page heroes"
    },
    "h1_page": {
      "mobile": "text-3xl (30px)",
      "tablet": "text-4xl (36px)",
      "desktop": "text-5xl (48px)",
      "font": "Cormorant Garamond",
      "weight": "font-normal (400)",
      "line_height": "leading-tight (1.25)",
      "usage": "Page titles, product category headers"
    },
    "h2_section": {
      "mobile": "text-2xl (24px)",
      "tablet": "text-3xl (30px)",
      "desktop": "text-4xl (36px)",
      "font": "Cormorant Garamond",
      "weight": "font-normal (400)",
      "line_height": "leading-snug (1.375)",
      "usage": "Section headings, product detail titles"
    },
    "h3_subsection": {
      "mobile": "text-xl (20px)",
      "tablet": "text-2xl (24px)",
      "desktop": "text-2xl (24px)",
      "font": "Cormorant Garamond",
      "weight": "font-medium (500)",
      "line_height": "leading-snug (1.375)",
      "usage": "Subsection titles, card headers"
    },
    "body_large": {
      "mobile": "text-base (16px)",
      "tablet": "text-lg (18px)",
      "desktop": "text-lg (18px)",
      "font": "Inter",
      "weight": "font-normal (400)",
      "line_height": "leading-relaxed (1.625)",
      "usage": "Product descriptions, intro paragraphs"
    },
    "body_regular": {
      "all_sizes": "text-base (16px)",
      "font": "Inter",
      "weight": "font-normal (400)",
      "line_height": "leading-relaxed (1.625)",
      "usage": "Standard body text, form labels"
    },
    "body_small": {
      "all_sizes": "text-sm (14px)",
      "font": "Inter",
      "weight": "font-normal (400)",
      "line_height": "leading-normal (1.5)",
      "usage": "Captions, metadata, secondary information"
    },
    "label_uppercase": {
      "all_sizes": "text-xs (12px)",
      "font": "Inter",
      "weight": "font-medium (500)",
      "transform": "uppercase",
      "letter_spacing": "tracking-wider (0.05em)",
      "usage": "Category labels, trust badges, navigation items"
    }
  }
}
```

### Typography Best Practices:
- **Line Length**: Max 65-75 characters for body text (use `max-w-prose`)
- **Paragraph Spacing**: `space-y-4` (16px) between paragraphs
- **Heading Spacing**: `mb-6` (24px) after headings
- **Color**: Headings use #1A1A1A, body uses #2C2C2C, secondary text uses #8B7D6B

---

## 4. SPACING SYSTEM

### Tailwind Spacing Scale:

```json
{
  "spacing": {
    "micro": {
      "space-1": "4px",
      "space-2": "8px",
      "usage": "Icon padding, tight element spacing"
    },
    "small": {
      "space-3": "12px",
      "space-4": "16px",
      "usage": "Button padding, form field spacing, card padding"
    },
    "medium": {
      "space-6": "24px",
      "space-8": "32px",
      "usage": "Section spacing, component margins, card gaps"
    },
    "large": {
      "space-12": "48px",
      "space-16": "64px",
      "usage": "Section padding, hero spacing, major layout gaps"
    },
    "extra_large": {
      "space-20": "80px",
      "space-24": "96px",
      "space-32": "128px",
      "usage": "Page sections, hero padding, major visual breaks"
    }
  }
}
```

### Layout Spacing Rules:
- **Container Max Width**: `max-w-7xl` (1280px) for main content
- **Container Padding**: `px-4` (mobile), `px-6` (tablet), `px-8` (desktop)
- **Section Vertical Spacing**: `py-16` (mobile), `py-20` (tablet), `py-24` (desktop)
- **Grid Gaps**: `gap-6` (24px) for product grids, `gap-8` (32px) for feature sections
- **Whitespace Philosophy**: Use 2-3x more spacing than feels comfortable - cramped designs look cheap

---

## 5. COMPONENT LIBRARY & USAGE

### Button System:

```json
{
  "buttons": {
    "primary_cta": {
      "component": "Button from /app/frontend/src/components/ui/button.jsx",
      "style": "Slim, tall, rounded corners (rounded-lg = 8px)",
      "background": "bg-[#C9A75E] (champagne gold)",
      "text": "text-[#0A0A0A] font-medium",
      "padding": "px-8 py-3.5",
      "hover": "hover:bg-[#D4AF37] hover:shadow-lg transition-all duration-300",
      "focus": "focus:ring-2 focus:ring-[#C9A75E] focus:ring-offset-2",
      "data_testid": "primary-cta-button",
      "usage": "Main CTAs: 'Start Your Journey', 'Add to Cart', 'Submit Custom Request'"
    },
    "secondary_cta": {
      "component": "Button variant='outline'",
      "style": "Slim, tall, rounded corners (rounded-lg = 8px)",
      "border": "border-2 border-[#2C2C2C]",
      "text": "text-[#2C2C2C] font-medium",
      "padding": "px-8 py-3.5",
      "hover": "hover:bg-[#2C2C2C] hover:text-white transition-all duration-300",
      "focus": "focus:ring-2 focus:ring-[#2C2C2C] focus:ring-offset-2",
      "data_testid": "secondary-cta-button",
      "usage": "Secondary actions: 'Learn More', 'View Collection', 'Continue Shopping'"
    },
    "ghost_button": {
      "component": "Button variant='ghost'",
      "style": "Minimal, text-based",
      "text": "text-[#8B7D6B] font-medium hover:text-[#C9A75E]",
      "padding": "px-4 py-2",
      "hover": "hover:bg-[#F5F5F0] transition-colors duration-200",
      "data_testid": "ghost-button",
      "usage": "Tertiary actions: 'Cancel', 'Back', navigation links"
    },
    "icon_button": {
      "component": "Button variant='ghost' with icon only",
      "style": "Circle or square (rounded-full or rounded-lg)",
      "size": "w-10 h-10 or w-12 h-12",
      "hover": "hover:bg-[#F5F5F0] hover:text-[#C9A75E] transition-all duration-200",
      "data_testid": "icon-button-{action}",
      "usage": "Cart icon, wishlist, close modals, image gallery navigation"
    }
  }
}
```

### Form Components:

```json
{
  "form_components": {
    "text_input": {
      "component": "Input from /app/frontend/src/components/ui/input.jsx",
      "style": "border border-[#D4CFC5] rounded-md bg-white",
      "padding": "px-4 py-3",
      "focus": "focus:border-[#C9A75E] focus:ring-2 focus:ring-[#C9A75E]/20 transition-all duration-200",
      "placeholder": "text-[#A9A9A9]",
      "data_testid": "input-{field-name}",
      "usage": "Name, email, phone, address fields"
    },
    "textarea": {
      "component": "Textarea from /app/frontend/src/components/ui/textarea.jsx",
      "style": "border border-[#D4CFC5] rounded-md bg-white min-h-[120px]",
      "padding": "px-4 py-3",
      "focus": "focus:border-[#C9A75E] focus:ring-2 focus:ring-[#C9A75E]/20",
      "data_testid": "textarea-{field-name}",
      "usage": "Custom design descriptions, special requests, messages"
    },
    "select_dropdown": {
      "component": "Select from /app/frontend/src/components/ui/select.jsx",
      "style": "border border-[#D4CFC5] rounded-md bg-white",
      "padding": "px-4 py-3",
      "focus": "focus:border-[#C9A75E] focus:ring-2 focus:ring-[#C9A75E]/20",
      "data_testid": "select-{field-name}",
      "usage": "Metal type, stone type, ring size, budget range"
    },
    "radio_group": {
      "component": "RadioGroup from /app/frontend/src/components/ui/radio-group.jsx",
      "style": "Custom styled with gold accent when selected",
      "selected": "border-[#C9A75E] bg-[#C9A75E]/10",
      "data_testid": "radio-{option-name}",
      "usage": "Natural vs Lab-Grown diamonds, jewelry style preferences"
    },
    "checkbox": {
      "component": "Checkbox from /app/frontend/src/components/ui/checkbox.jsx",
      "style": "border-[#D4CFC5] checked:bg-[#C9A75E] checked:border-[#C9A75E]",
      "data_testid": "checkbox-{option-name}",
      "usage": "Terms acceptance, newsletter signup, filter options"
    },
    "file_upload": {
      "component": "Custom drag-and-drop using Input type='file'",
      "style": "border-2 border-dashed border-[#D4CFC5] rounded-lg bg-[#FAFAF8] hover:border-[#C9A75E] transition-colors",
      "padding": "p-8",
      "icon": "Upload icon from lucide-react",
      "preview": "Show thumbnail grid with remove option",
      "data_testid": "file-upload-inspiration",
      "usage": "Custom jewelry inspiration images (multi-step forms)"
    },
    "label": {
      "component": "Label from /app/frontend/src/components/ui/label.jsx",
      "style": "text-sm font-medium text-[#2C2C2C] mb-2",
      "required_indicator": "text-[#8B4049] ml-1",
      "usage": "All form field labels"
    }
  }
}
```

### Card Components:

```json
{
  "cards": {
    "product_card": {
      "component": "Card from /app/frontend/src/components/ui/card.jsx",
      "structure": "CardContent with image, title, price, quick actions",
      "style": "bg-white border border-[#E8E3D9] rounded-lg overflow-hidden",
      "hover": "hover:shadow-xl hover:-translate-y-2 transition-all duration-300",
      "image_container": "aspect-square overflow-hidden",
      "image_hover": "group-hover:scale-108 transition-transform duration-500",
      "data_testid": "product-card-{product-id}",
      "usage": "Product catalog grid, featured products, related items"
    },
    "custom_jewelry_card": {
      "component": "Card with icon, title, description, CTA",
      "style": "bg-white border-2 border-[#E8E3D9] rounded-xl p-8 hover:border-[#C9A75E] transition-all duration-300",
      "icon": "w-12 h-12 text-[#C9A75E] mb-4",
      "data_testid": "custom-jewelry-card-{type}",
      "usage": "Homepage custom jewelry options (Engagement Rings, Grillz, Chains, Pendants)"
    },
    "testimonial_card": {
      "component": "Card with quote, author, rating",
      "style": "bg-[#FAFAF8] border-l-4 border-[#C9A75E] rounded-r-lg p-6",
      "quote_style": "font-['Playfair_Display'] text-lg italic text-[#2C2C2C]",
      "data_testid": "testimonial-card-{index}",
      "usage": "Customer testimonials section"
    },
    "trust_badge_card": {
      "component": "Small card with icon and text",
      "style": "bg-white rounded-lg p-4 text-center",
      "icon": "w-8 h-8 text-[#C9A75E] mx-auto mb-2",
      "text": "text-xs uppercase tracking-wider text-[#2C2C2C]",
      "data_testid": "trust-badge-{type}",
      "usage": "Insured Shipping, Lifetime Warranty, Complimentary Resizing, 21+ Signature"
    }
  }
}
```

### Navigation Components:

```json
{
  "navigation": {
    "header": {
      "component": "Custom header with sticky behavior",
      "style": "bg-white/95 backdrop-blur-md border-b border-[#E8E3D9] sticky top-0 z-50",
      "height": "h-20",
      "container": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      "logo": "font-['Playfair_Display'] text-2xl font-semibold text-[#1A1A1A]",
      "data_testid": "main-header",
      "usage": "Site-wide navigation"
    },
    "nav_menu_desktop": {
      "component": "NavigationMenu from /app/frontend/src/components/ui/navigation-menu.jsx",
      "style": "Hidden on mobile (hidden lg:flex)",
      "items": "text-sm uppercase tracking-wider text-[#2C2C2C] hover:text-[#C9A75E] transition-colors",
      "dropdown": "bg-white shadow-xl rounded-lg border border-[#E8E3D9] p-4",
      "data_testid": "desktop-nav-menu",
      "categories": ["Engagement Rings", "Grillz", "Chains", "Pendants", "Necklaces", "Bracelets", "Custom Jewelry", "About"]
    },
    "mobile_menu": {
      "component": "Sheet from /app/frontend/src/components/ui/sheet.jsx",
      "trigger": "Hamburger icon button (lg:hidden)",
      "style": "bg-white w-full max-w-sm",
      "animation": "Slide in from right",
      "items": "text-base text-[#2C2C2C] py-3 border-b border-[#E8E3D9]",
      "data_testid": "mobile-menu",
      "usage": "Mobile navigation (< 1024px)"
    },
    "breadcrumb": {
      "component": "Breadcrumb from /app/frontend/src/components/ui/breadcrumb.jsx",
      "style": "text-sm text-[#8B7D6B]",
      "separator": "text-[#D4CFC5]",
      "current": "text-[#2C2C2C] font-medium",
      "data_testid": "breadcrumb-navigation",
      "usage": "Product pages, category pages, custom forms"
    }
  }
}
```

### Modal & Dialog Components:

```json
{
  "modals": {
    "dialog": {
      "component": "Dialog from /app/frontend/src/components/ui/dialog.jsx",
      "overlay": "bg-black/50 backdrop-blur-sm",
      "content": "bg-white rounded-xl shadow-2xl max-w-lg",
      "header": "border-b border-[#E8E3D9] pb-4",
      "close_button": "text-[#8B7D6B] hover:text-[#2C2C2C]",
      "data_testid": "dialog-{purpose}",
      "usage": "Quick view product, confirm actions, image zoom"
    },
    "alert_dialog": {
      "component": "AlertDialog from /app/frontend/src/components/ui/alert-dialog.jsx",
      "style": "Similar to dialog but for critical actions",
      "data_testid": "alert-dialog-{action}",
      "usage": "Delete confirmations, cart clearing, order cancellation"
    },
    "drawer": {
      "component": "Drawer from /app/frontend/src/components/ui/drawer.jsx",
      "style": "Slide from right, full height",
      "background": "bg-white",
      "data_testid": "drawer-{type}",
      "usage": "Shopping cart, filters on mobile, product details"
    }
  }
}
```

### Progress & Loading Components:

```json
{
  "progress_loading": {
    "progress_bar": {
      "component": "Progress from /app/frontend/src/components/ui/progress.jsx",
      "style": "bg-[#E8E3D9] h-2 rounded-full",
      "indicator": "bg-[#C9A75E]",
      "data_testid": "progress-indicator",
      "usage": "Multi-step form progress (custom jewelry forms)"
    },
    "skeleton_loader": {
      "component": "Skeleton from /app/frontend/src/components/ui/skeleton.jsx",
      "style": "bg-[#E8E3D9] animate-pulse rounded",
      "variants": ["Product card skeleton", "Text skeleton", "Image skeleton"],
      "data_testid": "skeleton-loader-{type}",
      "usage": "Loading states for products, images, content"
    },
    "spinner": {
      "component": "Custom spinner using lucide-react Loader2 icon",
      "style": "animate-spin text-[#C9A75E]",
      "sizes": ["w-4 h-4 (small)", "w-6 h-6 (medium)", "w-8 h-8 (large)"],
      "data_testid": "loading-spinner",
      "usage": "Button loading states, page transitions"
    }
  }
}
```

### Notification Components:

```json
{
  "notifications": {
    "toast": {
      "component": "Sonner from /app/frontend/src/components/ui/sonner.jsx",
      "style": "bg-white border border-[#E8E3D9] rounded-lg shadow-lg",
      "success": "border-l-4 border-[#4A7C59]",
      "error": "border-l-4 border-[#8B4049]",
      "info": "border-l-4 border-[#6B7C8B]",
      "data_testid": "toast-notification",
      "usage": "Add to cart, form submissions, errors, success messages"
    },
    "alert": {
      "component": "Alert from /app/frontend/src/components/ui/alert.jsx",
      "variants": ["default", "destructive"],
      "style": "border-l-4 rounded-r-lg p-4",
      "data_testid": "alert-{type}",
      "usage": "Page-level notifications, form validation summaries"
    }
  }
}
```

### Image & Media Components:

```json
{
  "media": {
    "image_gallery": {
      "component": "Carousel from /app/frontend/src/components/ui/carousel.jsx",
      "style": "Product detail page image gallery with thumbnails",
      "main_image": "aspect-square rounded-lg overflow-hidden",
      "thumbnails": "grid grid-cols-4 gap-2 mt-4",
      "zoom": "Click to open Dialog with zoomed image",
      "data_testid": "product-image-gallery",
      "usage": "Product detail pages"
    },
    "aspect_ratio_container": {
      "component": "AspectRatio from /app/frontend/src/components/ui/aspect-ratio.jsx",
      "ratios": ["1:1 (square)", "4:3", "16:9", "3:4 (portrait)"],
      "usage": "Consistent image sizing across product cards, hero sections"
    },
    "avatar": {
      "component": "Avatar from /app/frontend/src/components/ui/avatar.jsx",
      "style": "rounded-full border-2 border-[#E8E3D9]",
      "sizes": ["w-8 h-8", "w-10 h-10", "w-12 h-12"],
      "data_testid": "avatar-{user-id}",
      "usage": "Testimonials, admin dashboard, user profile"
    }
  }
}
```

### Data Display Components:

```json
{
  "data_display": {
    "table": {
      "component": "Table from /app/frontend/src/components/ui/table.jsx",
      "style": "border border-[#E8E3D9] rounded-lg overflow-hidden",
      "header": "bg-[#FAFAF8] text-[#2C2C2C] font-medium text-sm uppercase tracking-wider",
      "row": "border-b border-[#E8E3D9] hover:bg-[#FAFAF8] transition-colors",
      "data_testid": "data-table-{type}",
      "usage": "Admin dashboard (orders, custom inquiries, products)"
    },
    "badge": {
      "component": "Badge from /app/frontend/src/components/ui/badge.jsx",
      "variants": {
        "default": "bg-[#E8E3D9] text-[#2C2C2C]",
        "gold": "bg-[#C9A75E] text-[#0A0A0A]",
        "outline": "border border-[#D4CFC5] text-[#2C2C2C]"
      },
      "data_testid": "badge-{type}",
      "usage": "Product tags, status indicators, category labels"
    },
    "separator": {
      "component": "Separator from /app/frontend/src/components/ui/separator.jsx",
      "style": "bg-[#E8E3D9]",
      "orientation": ["horizontal", "vertical"],
      "usage": "Section dividers, content separation"
    }
  }
}
```

---

## 6. LAYOUT STRUCTURES

### Homepage Layout:

```json
{
  "homepage": {
    "hero_section": {
      "structure": "Full viewport height (min-h-screen), centered content",
      "background": "Subtle gradient: linear-gradient(180deg, #FFFFF0 0%, #F5F5F0 50%, #E8E3D9 100%)",
      "content": "max-w-4xl mx-auto text-center",
      "heading": "H1 Hero (Cormorant Garamond, 60px desktop)",
      "subheading": "Body Large (Inter, 18px)",
      "cta": "Primary CTA button + Secondary CTA button (flex gap-4)",
      "animation": "Fade in from bottom on load (Framer Motion)",
      "data_testid": "homepage-hero"
    },
    "trust_badges_section": {
      "structure": "Grid grid-cols-2 md:grid-cols-4 gap-6",
      "background": "bg-white",
      "padding": "py-12",
      "badges": ["Fully Insured Shipping", "Lifetime Warranty", "Complimentary Resizing", "Adult Signature (21+)"],
      "data_testid": "trust-badges-section"
    },
    "featured_products_section": {
      "structure": "Container with heading + grid",
      "heading": "H2 Section (Cormorant Garamond, 36px)",
      "grid": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
      "background": "bg-[#FAFAF8]",
      "padding": "py-20",
      "data_testid": "featured-products-section"
    },
    "custom_jewelry_section": {
      "structure": "Container with heading + grid of 4 cards",
      "heading": "H2 Section with subtitle",
      "grid": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
      "cards": ["Engagement Rings", "Grillz", "Chains", "Pendants"],
      "background": "bg-white",
      "padding": "py-24",
      "data_testid": "custom-jewelry-section"
    },
    "made_in_toronto_section": {
      "structure": "Split layout: image left, content right (lg:grid-cols-2)",
      "image": "aspect-[4/3] object-cover rounded-lg",
      "content": "Storytelling text + CTA",
      "background": "bg-[#FAFAF8]",
      "padding": "py-20",
      "data_testid": "made-in-toronto-section"
    },
    "testimonials_section": {
      "structure": "Carousel of testimonial cards",
      "component": "Carousel with 3 visible cards on desktop",
      "background": "bg-white",
      "padding": "py-20",
      "data_testid": "testimonials-section"
    },
    "cta_section": {
      "structure": "Centered content with large CTA",
      "background": "bg-[#2C2C2C] text-white",
      "padding": "py-16",
      "heading": "H2 in white",
      "cta": "Gold primary button",
      "data_testid": "final-cta-section"
    }
  }
}
```

### Product Catalog Layout:

```json
{
  "product_catalog": {
    "page_structure": "Sidebar filters (desktop) + product grid",
    "sidebar": {
      "desktop": "w-64 sticky top-24 h-fit",
      "mobile": "Drawer component",
      "filters": ["Category", "Metal Type", "Stone Type", "Price Range", "Natural vs Lab-Grown"],
      "data_testid": "product-filters"
    },
    "product_grid": {
      "structure": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
      "container": "flex-1",
      "pagination": "Pagination component at bottom",
      "data_testid": "product-grid"
    },
    "header": {
      "structure": "Breadcrumb + page title + sort dropdown",
      "sort_options": ["Featured", "Price: Low to High", "Price: High to Low", "Newest"],
      "data_testid": "catalog-header"
    }
  }
}
```

### Product Detail Layout:

```json
{
  "product_detail": {
    "layout": "lg:grid lg:grid-cols-2 gap-12",
    "image_section": {
      "component": "Image gallery with main image + thumbnails",
      "features": ["Zoom on click", "360° view if available", "Multiple angles"],
      "data_testid": "product-images"
    },
    "info_section": {
      "structure": "Sticky on desktop (sticky top-24)",
      "elements": [
        "Breadcrumb",
        "Product name (H1)",
        "Price (large, bold)",
        "Rating + reviews count",
        "Short description",
        "Inventory type toggle (Natural vs Lab-Grown)",
        "Specifications accordion",
        "Add to Cart button",
        "Start Custom Journey CTA",
        "Trust badges",
        "Share buttons"
      ],
      "data_testid": "product-info"
    },
    "tabs_section": {
      "component": "Tabs from shadcn",
      "tabs": ["Description", "Specifications", "Care Instructions", "Shipping & Returns"],
      "data_testid": "product-tabs"
    },
    "related_products": {
      "structure": "Carousel of product cards",
      "heading": "You May Also Like",
      "data_testid": "related-products"
    }
  }
}
```

### Custom Jewelry Form Layout (Multi-Step):

```json
{
  "custom_form_layout": {
    "hero_section": {
      "structure": "Jewelry-type specific hero (e.g., 'Custom Engagement Rings')",
      "background": "Subtle gradient with jewelry image overlay",
      "heading": "H1 Hero",
      "subheading": "Compelling description",
      "data_testid": "custom-form-hero"
    },
    "form_container": {
      "structure": "max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12",
      "progress_indicator": {
        "component": "Progress bar at top",
        "style": "Shows current step / total steps",
        "visual": "Dots or bar with step labels",
        "data_testid": "form-progress"
      },
      "step_content": {
        "structure": "Fade in/out animation between steps (Framer Motion)",
        "padding": "py-8",
        "data_testid": "form-step-{number}"
      },
      "navigation": {
        "structure": "flex justify-between mt-8",
        "back_button": "Secondary CTA (if not first step)",
        "next_button": "Primary CTA ('Next' or 'Submit')",
        "data_testid": "form-navigation"
      }
    },
    "steps": {
      "step_1_inquiry": {
        "fields": ["Name", "Email", "Phone", "Budget Range (select)"],
        "data_testid": "step-inquiry"
      },
      "step_2_preferences": {
        "fields": ["Jewelry Style (radio)", "Metal Type (select)", "Stone Preferences (checkboxes)"],
        "data_testid": "step-preferences"
      },
      "step_3_inspiration": {
        "component": "Drag-and-drop file upload",
        "features": ["Multiple images", "Preview thumbnails", "Remove option"],
        "data_testid": "step-inspiration"
      },
      "step_4_specifications": {
        "fields": ["Size/Dimensions", "Timeline (select)", "Additional Notes (textarea)"],
        "data_testid": "step-specifications"
      },
      "step_5_review": {
        "structure": "Summary of all inputs",
        "editable": "Click to go back to specific step",
        "data_testid": "step-review"
      },
      "confirmation": {
        "structure": "Success message + next steps",
        "icon": "Check circle icon (large, gold)",
        "message": "Thank you message + timeline expectations",
        "cta": "Return to homepage or browse products",
        "data_testid": "form-confirmation"
      }
    }
  }
}
```

### Shopping Cart & Checkout Layout:

```json
{
  "cart_checkout": {
    "cart_drawer": {
      "component": "Drawer from shadcn (slide from right)",
      "structure": "Cart items list + summary + CTAs",
      "item_card": "Image + name + price + quantity selector + remove",
      "summary": "Subtotal, shipping, tax, total",
      "ctas": ["Continue Shopping (ghost)", "Checkout (primary)"],
      "data_testid": "shopping-cart-drawer"
    },
    "checkout_page": {
      "layout": "lg:grid lg:grid-cols-3 gap-12",
      "form_section": {
        "col_span": "lg:col-span-2",
        "steps": ["Shipping Information", "Payment Method", "Review Order"],
        "component": "Tabs or accordion",
        "data_testid": "checkout-form"
      },
      "summary_section": {
        "col_span": "lg:col-span-1",
        "structure": "Sticky sidebar with order summary",
        "elements": ["Cart items", "Subtotal", "Shipping", "Tax", "Total", "Trust badges"],
        "data_testid": "order-summary"
      }
    },
    "success_page": {
      "structure": "Centered content with confirmation",
      "icon": "Large check circle (gold)",
      "heading": "Order Confirmed!",
      "order_details": "Order number, email confirmation, estimated delivery",
      "cta": "Continue Shopping",
      "data_testid": "order-confirmation"
    }
  }
}
```

### Admin Dashboard Layout:

```json
{
  "admin_dashboard": {
    "layout": "Sidebar navigation + main content area",
    "sidebar": {
      "width": "w-64",
      "background": "bg-[#2C2C2C] text-white",
      "items": ["Dashboard", "Custom Inquiries", "Products", "Orders", "Settings"],
      "data_testid": "admin-sidebar"
    },
    "main_content": {
      "structure": "flex-1 p-8",
      "header": "Page title + actions",
      "content": "Tables, forms, or cards based on page",
      "data_testid": "admin-content"
    },
    "dashboard_overview": {
      "structure": "Grid of stat cards + tables",
      "stats": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
      "tables": "Custom inquiries table + recent orders table",
      "data_testid": "dashboard-overview"
    },
    "custom_inquiries_table": {
      "component": "Table with filters and status badges",
      "columns": ["ID", "Name", "Type", "Budget", "Status", "Date", "Actions"],
      "filters": ["All", "New", "In Progress", "Completed"],
      "data_testid": "custom-inquiries-table"
    }
  }
}
```

---

## 7. ANIMATION & MOTION GUIDELINES

### Motion Principles:
- **Subtle & Smooth**: Never jarring or aggressive
- **Purpose-Driven**: Every animation serves a function
- **Performance**: GPU-accelerated (use transform and opacity)
- **Accessibility**: Respect `prefers-reduced-motion`

### Framer Motion Implementation:

```json
{
  "animations": {
    "page_transitions": {
      "type": "Fade in from bottom",
      "config": {
        "initial": { "opacity": 0, "y": 20 },
        "animate": { "opacity": 1, "y": 0 },
        "transition": { "duration": 0.5, "ease": "easeOut" }
      },
      "usage": "Page loads, section reveals"
    },
    "product_card_hover": {
      "type": "Lift + shadow + image scale",
      "config": {
        "whileHover": {
          "y": -8,
          "boxShadow": "0 20px 40px rgba(0,0,0,0.15)",
          "transition": { "duration": 0.3, "ease": "easeOut" }
        }
      },
      "image_scale": {
        "whileHover": { "scale": 1.08 },
        "transition": { "duration": 0.5, "ease": "easeOut" }
      },
      "usage": "Product cards in catalog and homepage"
    },
    "button_interactions": {
      "type": "Scale + color transition",
      "config": {
        "whileHover": { "scale": 1.02 },
        "whileTap": { "scale": 0.98 },
        "transition": { "duration": 0.2 }
      },
      "css_transition": "transition-all duration-300 ease-out",
      "usage": "All buttons"
    },
    "form_step_transition": {
      "type": "Fade + slide",
      "config": {
        "initial": { "opacity": 0, "x": 20 },
        "animate": { "opacity": 1, "x": 0 },
        "exit": { "opacity": 0, "x": -20 },
        "transition": { "duration": 0.4, "ease": "easeInOut" }
      },
      "usage": "Multi-step form navigation"
    },
    "modal_animations": {
      "overlay": {
        "initial": { "opacity": 0 },
        "animate": { "opacity": 1 },
        "exit": { "opacity": 0 }
      },
      "content": {
        "initial": { "opacity": 0, "scale": 0.95, "y": 20 },
        "animate": { "opacity": 1, "scale": 1, "y": 0 },
        "exit": { "opacity": 0, "scale": 0.95, "y": 20 },
        "transition": { "duration": 0.3, "ease": "easeOut" }
      },
      "usage": "Dialogs, drawers, modals"
    },
    "scroll_reveal": {
      "type": "Fade in from bottom on scroll",
      "config": {
        "initial": { "opacity": 0, "y": 40 },
        "whileInView": { "opacity": 1, "y": 0 },
        "viewport": { "once": true, "margin": "-100px" },
        "transition": { "duration": 0.6, "ease": "easeOut" }
      },
      "usage": "Section reveals on homepage, product detail tabs"
    },
    "image_gallery_transition": {
      "type": "Fade + scale",
      "config": {
        "initial": { "opacity": 0, "scale": 0.9 },
        "animate": { "opacity": 1, "scale": 1 },
        "transition": { "duration": 0.4 }
      },
      "usage": "Product image gallery navigation"
    },
    "loading_states": {
      "skeleton": "animate-pulse",
      "spinner": "animate-spin",
      "progress_bar": "Smooth width transition with duration based on step"
    }
  }
}
```

### CSS Transitions (Non-Framer Motion):

```css
/* Button hover */
.btn-primary {
  transition: background-color 300ms ease-out, box-shadow 300ms ease-out, transform 200ms ease-out;
}

/* Input focus */
.input-field {
  transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
}

/* Card hover */
.product-card {
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
}

/* Image hover */
.product-image {
  transition: transform 500ms ease-out;
}

/* Navigation items */
.nav-item {
  transition: color 200ms ease-out;
}
```

### Easing Functions:
- **ease-out**: Default for most interactions (natural deceleration)
- **ease-in-out**: For reversible animations (modals, drawers)
- **spring**: For playful, premium feel (product cards, buttons)
- **cubic-bezier(0.215, 0.61, 0.355, 1)**: Custom luxury easing

---

## 8. RESPONSIVE DESIGN & BREAKPOINTS

### Tailwind Breakpoints:

```json
{
  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  }
}
```

### Mobile-First Approach:

```json
{
  "responsive_patterns": {
    "container_padding": {
      "mobile": "px-4 (16px)",
      "tablet": "sm:px-6 (24px)",
      "desktop": "lg:px-8 (32px)"
    },
    "section_padding": {
      "mobile": "py-12 (48px)",
      "tablet": "sm:py-16 (64px)",
      "desktop": "lg:py-20 (80px) or lg:py-24 (96px)"
    },
    "grid_columns": {
      "product_grid": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      "feature_grid": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "trust_badges": "grid-cols-2 md:grid-cols-4"
    },
    "typography_scaling": {
      "h1_hero": "text-4xl sm:text-5xl lg:text-6xl",
      "h2_section": "text-2xl sm:text-3xl lg:text-4xl",
      "body": "text-sm sm:text-base"
    },
    "navigation": {
      "mobile": "Hamburger menu (Sheet component)",
      "desktop": "Full navigation menu (lg:flex)"
    },
    "sidebar_filters": {
      "mobile": "Drawer component (button to open)",
      "desktop": "Sticky sidebar (lg:block)"
    },
    "product_detail": {
      "mobile": "Stacked (image then info)",
      "desktop": "Side-by-side (lg:grid-cols-2)"
    }
  }
}
```

### Touch Optimization:
- **Minimum touch target**: 44x44px (w-11 h-11 or larger)
- **Button padding**: Generous (px-8 py-3.5 minimum)
- **Form inputs**: Large enough for easy tapping (py-3)
- **Spacing between interactive elements**: Minimum 8px gap

---

## 9. IMAGE GUIDELINES & URLS

### Image Treatment:
- **Quality**: High-resolution, professional photography
- **Consistency**: Uniform lighting, white or neutral backgrounds
- **Aspect Ratios**: 
  - Product cards: 1:1 (square)
  - Hero images: 16:9 or 3:2
  - Lifestyle images: 4:3 or 3:4
- **Optimization**: WebP format, lazy loading, responsive srcset
- **Alt text**: Descriptive for accessibility and SEO

### Image URLs by Category:

```json
{
  "image_urls": {
    "product_images": {
      "description": "High-quality jewelry product photos on white background",
      "usage": "Product cards, product detail pages, cart items",
      "urls": [
        "https://images.unsplash.com/photo-1721103428207-597c5ceff1cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwZGlhbW9uZCUyMHJpbmclMjBlbGVnYW50JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc2NzMzNzMzNnww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1721808084960-02d8e6b1e8f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBqZXdlbHJ5JTIwZGlhbW9uZCUyMHJpbmclMjBlbGVnYW50JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc2NzMzNzMzNnww&ixlib=rb-4.1.0&q=85",
        "https://images.pexels.com/photos/16576817/pexels-photo-16576817.jpeg",
        "https://images.pexels.com/photos/16576816/pexels-photo-16576816.jpeg"
      ]
    },
    "chain_necklace_images": {
      "description": "Gold chain necklaces and luxury jewelry",
      "usage": "Chain product category, custom chain landing page",
      "urls": [
        "https://images.unsplash.com/photo-1758995115518-26f90aa61b97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY2hhaW4lMjBuZWNrbGFjZSUyMGx1eHVyeSUyMGpld2VscnklMjBtaW5pbWFsfGVufDB8fHx8MTc2NzMzNzM0NXww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1601121141499-17ae80afc03a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxnb2xkJTIwY2hhaW4lMjBuZWNrbGFjZSUyMGx1eHVyeSUyMGpld2VscnklMjBtaW5pbWFsfGVufDB8fHx8MTc2NzMzNzM0NXww&ixlib=rb-4.1.0&q=85",
        "https://images.pexels.com/photos/8084610/pexels-photo-8084610.jpeg",
        "https://images.pexels.com/photos/23495721/pexels-photo-23495721.jpeg"
      ]
    },
    "craftsmanship_images": {
      "description": "Artisan hands crafting jewelry, workshop scenes",
      "usage": "'Made in Toronto' section, about page, custom jewelry storytelling",
      "urls": [
        "https://images.unsplash.com/photo-1706955008775-c00874bb4d4b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBqZXdlbHJ5JTIwd29ya3Nob3AlMjBjcmFmdHNtYW5zaGlwJTIwYXJ0aXNhbiUyMGhhbmRzfGVufDB8fHx8MTc2NzMzNzM0N3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1659682699444-9ebad278fbd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxjdXN0b20lMjBqZXdlbHJ5JTIwd29ya3Nob3AlMjBjcmFmdHNtYW5zaGlwJTIwYXJ0aXNhbiUyMGhhbmRzfGVufDB8fHx8MTc2NzMzNzM0N3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1598724168411-9ba1e003a7fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxjdXN0b20lMjBqZXdlbHJ5JTIwd29ya3Nob3AlMjBjcmFmdHNtYW5zaGlwJTIwYXJ0aXNhbiUyMGhhbmRzfGVufDB8fHx8MTc2NzMzNzM0N3ww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1526907279934-3c9d2e53170f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxjdXN0b20lMjBqZXdlbHJ5JTIwd29ya3Nob3AlMjBjcmFmdHNtYW5zaGlwJTIwYXJ0aXNhbiUyMGhhbmRzfGVufDB8fHx8MTc2NzMzNzM0N3ww&ixlib=rb-4.1.0&q=85",
        "https://images.pexels.com/photos/6263114/pexels-photo-6263114.jpeg",
        "https://images.pexels.com/photos/6263066/pexels-photo-6263066.jpeg"
      ]
    },
    "lifestyle_images": {
      "description": "Elegant people wearing jewelry, sophisticated portraits",
      "usage": "Testimonials, hero sections, lifestyle storytelling",
      "urls": [
        "https://images.unsplash.com/photo-1764179690227-af049306cd20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjB3ZWFyaW5nJTIwamV3ZWxyeSUyMHBvcnRyYWl0JTIwc29waGlzdGljYXRlZHxlbnwwfHx8fDE3NjczMzczNDl8MA&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1745542284155-52a2d488547b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5JTIwZGlhbW9uZCUyMHJpbmclMjBlbGVnYW50JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc2NzMzNzMzNnww&ixlib=rb-4.1.0&q=85"
      ]
    },
    "toronto_images": {
      "description": "Toronto skyline and cityscape for 'Made in Toronto' branding",
      "usage": "About page, footer, 'Made in Toronto' section backgrounds",
      "urls": [
        "https://images.unsplash.com/photo-1745978815571-047fb7ca310f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxUb3JvbnRvJTIwc2t5bGluZSUyMGNpdHlzY2FwZSUyMHVyYmFuJTIwbW9kZXJufGVufDB8fHx8MTc2NzMzNzM2NXww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1764732841982-dd089674846f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxUb3JvbnRvJTIwc2t5bGluZSUyMGNpdHlzY2FwZSUyMHVyYmFuJTIwbW9kZXJufGVufDB8fHx8MTc2NzMzNzM2NXww&ixlib=rb-4.1.0&q=85",
        "https://images.unsplash.com/photo-1762787564072-616ee1e06a4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxUb3JvbnRvJTIwc2t5bGluZSUyMGNpdHlzY2FwZSUyMHVyYmFuJTIwbW9kZXJufGVufDB8fHx8MTc2NzMzNzM2NXww&ixlib=rb-4.1.0&q=85",
        "https://images.pexels.com/photos/35425923/pexels-photo-35425923.jpeg",
        "https://images.pexels.com/photos/457937/pexels-photo-457937.jpeg"
      ]
    }
  }
}
```

---

## 10. ACCESSIBILITY GUIDELINES

### WCAG Compliance:
- **Target Level**: WCAG 2.1 AA minimum, AAA where possible
- **Color Contrast**: 
  - Body text: 7:1 (AAA)
  - Large text (18px+): 4.5:1 (AA)
  - Interactive elements: 4.5:1 minimum
- **Focus States**: All interactive elements must have visible focus indicators
- **Keyboard Navigation**: Full site navigable via keyboard
- **Screen Readers**: Semantic HTML, ARIA labels where needed

### Implementation Checklist:

```json
{
  "accessibility": {
    "semantic_html": {
      "use": ["<header>", "<nav>", "<main>", "<section>", "<article>", "<aside>", "<footer>"],
      "avoid": "Excessive <div> nesting without semantic meaning"
    },
    "aria_labels": {
      "buttons": "aria-label for icon-only buttons",
      "forms": "aria-describedby for error messages",
      "navigation": "aria-current='page' for active nav items",
      "modals": "aria-modal='true', role='dialog'"
    },
    "focus_management": {
      "visible_focus": "focus:ring-2 focus:ring-[#C9A75E] focus:ring-offset-2",
      "skip_links": "Skip to main content link at top",
      "modal_focus": "Trap focus within modals, return focus on close"
    },
    "images": {
      "alt_text": "Descriptive alt text for all images",
      "decorative": "alt='' for purely decorative images"
    },
    "forms": {
      "labels": "Every input must have associated <Label>",
      "errors": "Clear error messages with aria-describedby",
      "required": "Indicate required fields visually and with aria-required"
    },
    "motion": {
      "reduced_motion": "Respect prefers-reduced-motion media query",
      "implementation": "@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }"
    }
  }
}
```

---

## 11. ADDITIONAL LIBRARIES & INTEGRATIONS

### Required Libraries:

```json
{
  "libraries": {
    "framer_motion": {
      "purpose": "Animations and micro-interactions",
      "installation": "npm install framer-motion",
      "usage": "Page transitions, scroll reveals, hover effects, form step transitions",
      "docs": "https://www.framer.com/motion/"
    },
    "lucide_react": {
      "purpose": "Icon library (already installed)",
      "usage": "All icons throughout the site (NO emoji characters)",
      "examples": ["ShoppingCart", "Heart", "User", "Search", "ChevronRight", "Upload", "Check", "X"]
    },
    "react_hook_form": {
      "purpose": "Form state management and validation",
      "installation": "npm install react-hook-form",
      "usage": "All forms, especially multi-step custom jewelry forms",
      "docs": "https://react-hook-form.com/"
    },
    "zod": {
      "purpose": "Schema validation for forms",
      "installation": "npm install zod",
      "usage": "Form validation schemas with react-hook-form",
      "docs": "https://zod.dev/"
    },
    "embla_carousel_react": {
      "purpose": "Carousel functionality (used by shadcn Carousel)",
      "installation": "npm install embla-carousel-react",
      "usage": "Product image galleries, testimonials, related products",
      "note": "Already integrated with shadcn Carousel component"
    },
    "react_medium_image_zoom": {
      "purpose": "Image zoom functionality for product images",
      "installation": "npm install react-medium-image-zoom",
      "usage": "Product detail page image zoom",
      "docs": "https://github.com/rpearce/react-medium-image-zoom"
    },
    "stripe_js": {
      "purpose": "Payment processing",
      "installation": "npm install @stripe/stripe-js @stripe/react-stripe-js",
      "usage": "Checkout page payment form",
      "docs": "https://stripe.com/docs/stripe-js/react"
    }
  }
}
```

### Optional Enhancements:

```json
{
  "optional_libraries": {
    "react_three_fiber": {
      "purpose": "3D product visualization (future enhancement)",
      "installation": "npm install @react-three/fiber @react-three/drei three",
      "usage": "360° product views, 3D ring customizer",
      "note": "Consider for Phase 2"
    },
    "recharts": {
      "purpose": "Charts for admin dashboard",
      "installation": "npm install recharts",
      "usage": "Sales analytics, custom inquiry trends",
      "note": "Admin dashboard only"
    }
  }
}
```

---

## 12. INSTRUCTIONS TO MAIN AGENT

### Implementation Priority:

1. **Phase 1 - Foundation (Week 1)**:
   - Set up color system in index.css (CSS custom properties)
   - Import Google Fonts (Cormorant Garamond, Inter, Playfair Display)
   - Configure Tailwind with custom colors and spacing
   - Create base layout components (Header, Footer, Container)
   - Implement navigation (desktop + mobile)

2. **Phase 2 - Homepage (Week 1-2)**:
   - Hero section with gradient background and CTAs
   - Trust badges section
   - Featured products grid (with hover animations)
   - Custom jewelry cards section
   - "Made in Toronto" storytelling section
   - Testimonials carousel
   - Final CTA section

3. **Phase 3 - Product Catalog & Detail (Week 2)**:
   - Product catalog page with filters and grid
   - Product card component with hover effects
   - Product detail page with image gallery
   - Add to cart functionality
   - Related products section

4. **Phase 4 - Custom Jewelry Forms (Week 3) - CRITICAL**:
   - Create 4 separate landing pages (Engagement Rings, Grillz, Chains, Pendants)
   - Implement multi-step form component with progress indicator
   - Build each form step with proper validation
   - Implement drag-and-drop file upload for inspiration images
   - Create confirmation/success page
   - Connect to backend API

5. **Phase 5 - Cart & Checkout (Week 3-4)**:
   - Shopping cart drawer
   - Checkout page with Stripe integration
   - Order confirmation page
   - Email notifications (backend)

6. **Phase 6 - Admin Dashboard (Week 4)**:
   - Admin login
   - Dashboard overview
   - Custom inquiries management
   - Basic product CRUD
   - Order management

7. **Phase 7 - Polish & Testing (Week 4)**:
   - Responsive testing on all devices
   - Accessibility audit
   - Performance optimization
   - Animation refinement
   - Cross-browser testing

### Critical Implementation Notes:

#### Color System Setup:
```css
/* Add to index.css AFTER Tailwind imports */
:root {
  /* Primary Colors */
  --color-ivory: #FFFFF0;
  --color-off-white: #FAFAF8;
  --color-warm-white: #F5F5F0;
  
  /* Secondary Colors */
  --color-charcoal: #2C2C2C;
  --color-deep-charcoal: #1A1A1A;
  --color-soft-black: #0A0A0A;
  
  /* Accent Gold */
  --color-champagne-gold: #C9A75E;
  --color-warm-gold: #D4AF37;
  --color-rose-gold: #B89778;
  
  /* Neutral Depth */
  --color-taupe: #8B7D6B;
  --color-warm-gray: #A9A9A9;
  --color-soft-beige: #E8E3D9;
  --color-stone: #D4CFC5;
  
  /* Semantic */
  --color-success: #4A7C59;
  --color-error: #8B4049;
  --color-warning: #B8956A;
  --color-info: #6B7C8B;
}
```

#### Tailwind Config Extension:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ivory: '#FFFFF0',
        'off-white': '#FAFAF8',
        'warm-white': '#F5F5F0',
        charcoal: '#2C2C2C',
        'deep-charcoal': '#1A1A1A',
        'soft-black': '#0A0A0A',
        'champagne-gold': '#C9A75E',
        'warm-gold': '#D4AF37',
        'rose-gold': '#B89778',
        taupe: '#8B7D6B',
        'warm-gray': '#A9A9A9',
        'soft-beige': '#E8E3D9',
        stone: '#D4CFC5',
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
}
```

#### Multi-Step Form Pattern:
```javascript
// Example structure for custom jewelry forms
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const steps = [
  { id: 1, name: 'Inquiry', fields: ['name', 'email', 'phone', 'budget'] },
  { id: 2, name: 'Preferences', fields: ['style', 'metal', 'stones'] },
  { id: 3, name: 'Inspiration', fields: ['images'] },
  { id: 4, name: 'Specifications', fields: ['size', 'timeline', 'notes'] },
  { id: 5, name: 'Review', fields: [] },
];

export const CustomJewelryForm = ({ type }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  const form = useForm({
    resolver: zodResolver(getSchemaForStep(currentStep)),
  });
  
  const onNext = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      handleSubmit(formData);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                step.id === currentStep ? 'text-champagne-gold' : 'text-warm-gray'
              }`}
            >
              <div className={`w-8 h-8 mx-auto rounded-full border-2 ${
                step.id <= currentStep ? 'border-champagne-gold bg-champagne-gold text-white' : 'border-stone'
              } flex items-center justify-center mb-1`}>
                {step.id}
              </div>
              <span className="text-xs">{step.name}</span>
            </div>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} />
      </div>
      
      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderStepContent(currentStep, form)}
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            data-testid="form-back-button"
          >
            Back
          </Button>
        )}
        <Button
          onClick={form.handleSubmit(onNext)}
          className="ml-auto"
          data-testid="form-next-button"
        >
          {currentStep === steps.length ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
```

#### Product Card Hover Effect:
```javascript
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      data-testid={`product-card-${product.id}`}
    >
      <Card className="overflow-hidden border border-soft-beige hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-square overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-cormorant text-xl font-medium text-deep-charcoal mb-1">
            {product.name}
          </h3>
          <p className="text-champagne-gold font-semibold">
            ${product.price.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
```

### Data-TestID Naming Convention:
- Use kebab-case
- Format: `{component-type}-{specific-identifier}-{action?}`
- Examples:
  - `primary-cta-button`
  - `product-card-123`
  - `input-email`
  - `form-step-2`
  - `custom-jewelry-card-engagement-rings`
  - `trust-badge-insured-shipping`

### File Structure:
```
/app/frontend/src/
├── components/
│   ├── ui/                    # shadcn components (already exists)
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Container.jsx
│   │   └── MobileMenu.jsx
│   ├── product/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductFilters.jsx
│   │   └── ProductImageGallery.jsx
│   ├── forms/
│   │   ├── MultiStepForm.jsx
│   │   ├── FormStep.jsx
│   │   ├── ProgressIndicator.jsx
│   │   └── FileUpload.jsx
│   └── sections/
│       ├── HeroSection.jsx
│       ├── TrustBadges.jsx
│       ├── FeaturedProducts.jsx
│       └── Testimonials.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProductCatalogPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CustomEngagementRingsPage.jsx
│   ├── CustomGrillzPage.jsx
│   ├── CustomChainsPage.jsx
│   ├── CustomPendantsPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   └── admin/
│       ├── DashboardPage.jsx
│       ├── CustomInquiriesPage.jsx
│       └── ProductsPage.jsx
├── hooks/
│   ├── useCart.js
│   ├── useProducts.js
│   └── useCustomForm.js
├── utils/
│   ├── api.js
│   └── validation.js
└── App.jsx
```

---

## 13. COMMON MISTAKES TO AVOID

### ❌ DON'T:
1. **Use dark/saturated gradients** (purple/pink, blue/purple) anywhere
2. **Let gradients cover more than 20% of viewport**
3. **Apply gradients to text-heavy areas or small UI elements**
4. **Use emoji icons** (🤖💎✨) - always use lucide-react icons
5. **Center-align all text** (disrupts natural reading flow)
6. **Use universal transitions** (`transition: all`) - breaks transforms
7. **Forget data-testid attributes** on interactive elements
8. **Skip focus states** on interactive elements
9. **Use inconsistent spacing** - stick to the spacing system
10. **Ignore mobile responsiveness** - mobile-first approach is critical

### ✅ DO:
1. **Use white/ivory backgrounds** for all content and card areas
2. **Use champagne gold (#C9A75E)** for primary CTAs and accents
3. **Use lucide-react icons** for all iconography
4. **Add specific transitions** (e.g., `transition-colors`, `transition-transform`)
5. **Include data-testid** on all buttons, inputs, and key elements
6. **Test on mobile devices** throughout development
7. **Use Framer Motion** for smooth, luxury animations
8. **Maintain generous whitespace** (2-3x more than feels comfortable)
9. **Follow typography hierarchy** (Cormorant for headings, Inter for body)
10. **Respect accessibility guidelines** (contrast, focus states, keyboard nav)

---

## 14. DESIGN SYSTEM SUMMARY

### Quick Reference Card:

| Element | Specification |
|---------|--------------|
| **Primary Font** | Cormorant Garamond (headings) |
| **Body Font** | Inter (body text) |
| **Accent Font** | Playfair Display (special callouts) |
| **Primary Color** | #FFFFF0 (Ivory) |
| **Text Color** | #2C2C2C (Charcoal) |
| **Heading Color** | #1A1A1A (Deep Charcoal) |
| **Accent Color** | #C9A75E (Champagne Gold) |
| **Border Color** | #E8E3D9 (Soft Beige) |
| **Button Radius** | rounded-lg (8px) |
| **Card Radius** | rounded-lg (8px) or rounded-xl (12px) |
| **Container Max Width** | max-w-7xl (1280px) |
| **Grid Gap** | gap-6 (24px) or gap-8 (32px) |
| **Section Padding** | py-20 (80px) or py-24 (96px) |
| **Transition Duration** | 300ms (standard), 500ms (images) |
| **Easing** | ease-out (default) |
| **Focus Ring** | ring-2 ring-champagne-gold ring-offset-2 |

---

## 15. FINAL NOTES

This design system is crafted to create a **"Digital Atelier"** experience that mirrors the intimacy and precision of a luxury jewelry showroom. Every element—from the generous whitespace to the subtle gold accents—is intentional and serves the brand's "Quiet Luxury" positioning.

The multi-step custom jewelry forms are the **heart of the omnichannel experience**, seamlessly connecting the transactional e-commerce side with the bespoke, high-touch custom jewelry service. These forms must feel luxurious, not overwhelming, with smooth transitions and elegant progress indicators.

**Key Success Metrics:**
- Conversion rate on "Start Your Journey" CTAs
- Custom inquiry form completion rate
- Average time on product detail pages
- Mobile vs. desktop engagement
- Cart abandonment rate

**Brand Differentiators:**
- "Made in Toronto" storytelling
- Ethical sourcing transparency
- Natural vs Lab-Grown diamond options
- Seamless omnichannel experience
- Trust signals (insured shipping, warranty, resizing)

Implement this system with care, attention to detail, and a focus on creating a truly premium digital experience that converts browsers into buyers and encourages custom jewelry inquiries.

---

# GENERAL UI/UX DESIGN GUIDELINES (APPEND TO ALL IMPLEMENTATIONS)

## Universal Design Rules

### Transition Rules:
- **NEVER** apply universal transition (`transition: all`)
- **ALWAYS** add transitions for specific properties: `transition-colors`, `transition-transform`, `transition-opacity`, `transition-shadow`
- **EXCLUDE** transforms from universal transitions to prevent breaking animations

### Text Alignment:
- **NEVER** center-align the app container (`.App { text-align: center; }`)
- **RESPECT** natural reading flow (left-aligned for body text)
- **CENTER** only specific elements (headings, CTAs, hero sections)

### Icon Usage:
- **NEVER** use emoji characters (🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇)
- **ALWAYS** use lucide-react library or FontAwesome CDN for icons
- **ENSURE** icons are semantic and accessible

### Gradient Restrictions (CRITICAL):
- **PROHIBITED**: Dark/saturated gradients (purple/pink, blue-500 to purple-600, purple-500 to pink-500, green-500 to blue-500, red to pink)
- **NEVER** let gradients cover more than 20% of viewport
- **NEVER** apply gradients to text-heavy content or reading areas
- **NEVER** use gradients on small UI elements (<100px width)
- **NEVER** stack multiple gradient layers in same viewport
- **NEVER** use dark gradients for logo, testimonial, footer sections

### Gradient Enforcement:
**IF** gradient area exceeds 20% of viewport **OR** affects readability  
**THEN** use solid colors immediately

### Allowed Gradient Usage:
- Section backgrounds (not content backgrounds)
- Hero section header content (2-3 mild colors, horizontal/vertical/diagonal)
- Decorative overlays and accent elements only
- Large CTA buttons (subtle, 2-color max)

### Color Guidelines for AI/Voice Applications:
- **DO NOT** use purple color for AI chat or voice applications
- **USE** colors like light green, ocean blue, peach orange, soft teal

### Animation & Motion:
- Every interaction needs micro-animations (hover states, transitions, parallax effects, entrance animations)
- Use 2-3x more spacing than feels comfortable (cramped designs look cheap)
- Add subtle grain textures, noise overlays, custom cursors, selection states, loading animations

### Design Token Instantiation:
- Before generating UI, infer visual style from problem statement (palette, contrast, mood, motion)
- Immediately set global design tokens (primary, secondary/accent, background, foreground, ring, state colors)
- **DO NOT** rely on library defaults
- **DO NOT** make background dark by default - understand problem first and define colors accordingly
- If problem implies playful/energetic → choose colorful scheme
- If problem implies monochrome/minimal → choose black-white/neutral scheme

### Component Reuse:
- Prioritize using pre-existing components from `src/components/ui` when applicable
- Create new components that match style and conventions of existing components
- Examine existing components to understand project's component patterns before creating new ones

### Component Library Priority:
- **IMPORTANT**: Do not use HTML-based components (dropdown, calendar, toast)
- **MUST** always use `/app/frontend/src/components/ui/` as primary components (modern and stylish)
- Use Shadcn/UI as primary component library for consistency and accessibility
- Import path: `./components/[component-name]`

### Export Conventions:
- Components **MUST** use named exports: `export const ComponentName = ...`
- Pages **MUST** use default exports: `export default function PageName() {...}`

### Toast Notifications:
- Use `sonner` for toasts
- Sonner component located in `/app/frontend/src/components/ui/sonner.jsx`

### Gradient Creation:
- Use 2-4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals
- Gradients can be horizontal, vertical, or diagonal

### Testing Requirements:
- All interactive and key informational elements **MUST** include `data-testid` attribute
- Use kebab-case convention that defines element's role, not appearance
- Example: `data-testid="login-form-submit-button"`
- Creates stable, decoupled interface for tests, preventing breakage from stylistic refactors

### Calendar Component:
- If calendar is required, always use shadcn calendar component

---

**This design system is production-ready and optimized for implementation by AI agents. Follow these guidelines precisely to create a stunning, luxury jewelry e-commerce experience that converts and delights users.**
