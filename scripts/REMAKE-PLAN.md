# Chain Image Remake Plan - Complete Redo with Corrected Patterns + Silver/Grey Background

## Summary
Remake ALL 196+ chain gallery images with:
1. Corrected chain pattern descriptions based on actual Tecimer supplier photos
2. More silver/grey background presence (brand color)
3. Better prompt structure following best practices
4. Consistency across all 7 lengths per set

## Background Strategy
Use Recraft V4.1 parameters:
- `background_color`: "#B8B8B8" (silver-grey)
- `colors`: ["#B8B8B8", "#D4D4D4", "#8A8A8A"] (silver palette for background tones)
- Prompt describes: "polished brushed silver-grey stone surface with subtle gradient from light silver to medium grey"
- This creates a dominant silver/grey presence matching the website's accent color

## Prompt Template (Improved)
```
Professional e-commerce product photograph, 100mm macro lens at f/4, {WIDTH}mm {CHAIN_TYPE} chain in 14K {METAL_DESCRIPTION}, {LENGTH} inch length. Chain laid flat in a gentle S-curve on a polished brushed silver-grey stone surface. {CHAIN_PATTERN_DESCRIPTION}. Single soft directional light from upper left creating gentle shadow on right side. Sharp focus on chain links showing metallic luster and surface detail. The background is a smooth gradient from light silver to medium grey. No text, no watermarks, no clasps, no other objects. Luxury jewelry product photography.
```

## Key Improvements from Research
- "100mm macro lens at f/4" triggers photographic realism (EXIF-trained models)
- Single light source described well > multiple vague ones
- "No clasps" prevents the AI from adding lobster claw hardware
- Surface material described specifically (brushed silver-grey stone)
- Colors parameter locks the background palette

---

## Chain Type Descriptions (CORRECTED from supplier photos)

### 1. ANCHOR
**What it actually is (from Tecimer):** Puffed oval links that look like coffee beans or mariner links - each link is a rounded oval with TWO HOLES through it (like a figure-8 or pig-nose shape), connected by small round jump rings between them.
**OLD WRONG prompt:** "Flat oval links with a vertical bar through the center of each link"
**NEW CORRECT prompt:** "Puffed mariner-style anchor links, each link is a rounded puffy oval with two holes through it resembling a coffee bean shape, links connected by small round jump rings between each puffed link. The pattern alternates: puffed oval link, small round ring, puffed oval link, consistently throughout."

### 2. BEAD (yellow-gold, white-gold)
**What it actually is:** Uniform round solid beads strung tightly together with no visible chain between beads. Beads touch each other continuously.
**OLD prompt was OK:** "Evenly spaced round gold beads on a thin chain"
**NEW IMPROVED:** "Solid round gold beads strung tightly together in a continuous line, beads touching each other with no visible chain or gaps between them. Uniform bead size throughout, smooth polished spherical beads."

### 3. BEAD (two-tone)
**What it actually is:** Station bead chain - larger round beads spaced apart on a thin chain, alternating yellow and white gold beads.
**NEW prompt:** "Station bead chain with evenly spaced larger round gold beads on a thin chain, beads are separated by short sections of thin chain. Alternating between yellow gold beads and white gold beads creating a two-tone effect. Each bead is a polished sphere."

### 4. BYZANTINE
**What it actually is:** Tight interlocking pattern creating repeating X or eye-shaped motifs when viewed from above. Each section shows pointed oval shapes that interlock. Very dense, flat-laying woven pattern.
**OLD WRONG prompt:** "Intricate interlocking loops creating a woven rope-like texture"
**NEW CORRECT prompt:** "Byzantine weave chain with a tight, flat interlocking pattern creating repeating pointed eye-shaped or X-shaped motifs when viewed from above. Dense, compact weave where flattened oval rings interlock in groups of four to create a symmetrical geometric pattern. The chain lies completely flat and shows a uniform zigzag texture throughout."

### 5. CABLE
**What it actually is:** Simple, delicate chain with small uniform round or slightly oval links alternating perpendicular to each other. Very basic, classic chain pattern - the most common simple chain.
**OLD prompt was close but generated anchor-looking chains**
**NEW CORRECT prompt:** "Classic cable chain with small uniform round links, each link perpendicular to the next in a simple alternating pattern. Delicate, fine chain with thin wire links. Very basic, traditional chain construction - the simplest chain style. Links are small, round, and uniform in size."

### 6. CUBAN
**Supplier shows:** Thick, flat interlocking oval links in a tight heavy pattern. Domed profile.
**Current prompt OK:** "Flat interlocking oval links in a tight, heavy pattern with domed profile."

### 7. CURB
**Supplier shows:** Flat, uniform interlocking links that lay perfectly flat, with diamond-cut beveled edges that catch light.
**Current prompt OK:** "Flat, uniform interlocking links that lay flat when worn, diamond-cut beveled edges that catch and reflect light."

### 8. FIGARO
**What it actually is (from Tecimer):** Strictly repeating pattern of exactly 3 small round curb-style links followed by 1 elongated oval link. This 3+1 pattern repeats perfectly consistently throughout.
**OLD prompt was right in description but AI couldn't count**
**NEW MORE SPECIFIC prompt:** "Figaro chain with a strict repeating pattern: three small flat round links followed by one longer elongated oval link, then three small flat round links again, then one long oval link. This exact 3-short-1-long pattern repeats consistently and uniformly throughout the entire chain without variation. The small links are curb-style flat links, the long links are smooth elongated ovals approximately 3x the length of the small links."

### 9. FRANCO
**Supplier shows:** Tight, square cross-section chain with interlocking V-shaped links creating a solid, square profile.
**Current prompt OK:** "Interlocking V-shaped links creating a solid square cross-section profile, tight and compact weave."

### 10. OVAL-LINK
**What it actually is (from Tecimer):** Elongated oval open links with TEXTURED/TWISTED wire - each link has a rope-textured surface, not smooth. Links are generously sized ovals connected end to end.
**OLD WRONG prompt:** "Elongated oval open links connected end to end"
**NEW CORRECT prompt:** "Open cable chain with large elongated oval links made from twisted rope-textured gold wire. Each oval link has a rope/twisted texture on the wire surface, not smooth. Links are generously sized, approximately 8-10mm long, connected end to end in an open airy pattern. Delicate and feminine appearance."

### 11. PAPERCLIP
**What it actually is (from Tecimer):** Very small, delicate elongated rectangular links that look like tiny miniature paperclips. Much smaller and finer than typical paperclip chains.
**OLD prompt was OK but composition was wrong (chain standing up)**
**NEW prompt:** "Miniature paperclip chain with very small, fine elongated rectangular links resembling tiny paperclips, connected end to end. Delicate and thin, with each link approximately 4-5mm long. Chain laid completely flat on the surface in a gentle curve. Very fine, minimalist appearance."

### 12. ROPE
**Supplier shows:** Twisted rope pattern with tight spiral weave creating a round profile.
**Current prompt OK:** "Twisted rope pattern with tight diamond-cut spiral weave creating a round rope-like profile."

### 13. ROUND-LINK
**What it actually is (from Tecimer):** Large, elongated pointed/angular links (like stretched teardrops or pointed ovals) in alternating yellow and white gold. NOT round circles - more like angular/pointed elongated shapes.
**OLD WRONG prompt:** "Perfectly round open links connected through each other"
**NEW CORRECT prompt:** "Fancy link chain with large elongated pointed angular links, each link shaped like a stretched pointed oval or angular teardrop. Links alternate between yellow gold and white gold creating a two-tone effect. Each link is approximately 12-15mm long with pointed ends. Open, airy design with clearly visible individual links."

### 14. SINGAPORE
**What it actually is:** Twisted flat herringbone-style chain that creates a sparkling spiral effect. Delicate, with twisted flat links that catch light from multiple angles.
**Current prompt OK:** "Twisted flat chain with a delicate spiral pattern that catches light from multiple angles, creating a sparkling herringbone-like twisted effect."

### 15. SNAKE
**Supplier shows:** Smooth, round, flexible tube made of tightly fitted plates. Seamless appearance.
**Current prompt OK:** "Smooth, round, flexible tube chain made of tightly fitted round metal plates creating a seamless, polished cylindrical appearance."

### 16. WHEAT
**What it actually is (from Tecimer):** A braided/woven chain similar to a foxtail but with visible individual strand crossings. Four thin strands woven together creating a compact, slightly textured round profile. The individual strand crossings create a subtle herringbone-like pattern.
**OLD WRONG prompt:** "Four strands of twisted oval links woven together in a wheat sheaf pattern"
**NEW CORRECT prompt:** "Wheat chain (also called spiga) with four thin wire strands braided tightly together creating a compact round profile. The individual strand crossings are visible, creating a subtle diagonal herringbone-like texture along the chain. Compact, solid-looking chain with a smooth but slightly textured surface from the woven strands."

### 17. BOX
**Supplier shows:** Square interlocking links forming a smooth square/rectangular profile.
**Current prompt OK:** "Square interlocking box links forming a smooth, geometric square-profile chain."

---

## Image Sets to Generate

### All types x metals (31 sets x 7 lengths = 217 images):

| # | Type | Metal | Lengths | Images |
|---|------|-------|---------|--------|
| 1 | anchor | yellow-gold | 18-30 | 7 |
| 2 | anchor | white-gold | 18-30 | 7 |
| 3 | bead | yellow-gold | 18-30 | 7 |
| 4 | bead | white-gold | 18-30 | 7 |
| 5 | bead | two-tone | 18-30 | 7 |
| 6 | box | white-gold | 18-30 | 7 |
| 7 | box | rose-gold | 18-30 | 7 |
| 8 | byzantine | yellow-gold | 18-30 | 7 |
| 9 | byzantine | white-gold | 18-30 | 7 |
| 10 | cable | yellow-gold | 18-30 | 7 |
| 11 | cable | white-gold | 18-30 | 7 |
| 12 | cable | rose-gold | 18-30 | 7 |
| 13 | cuban | white-gold | 18-30 | 7 |
| 14 | curb | yellow-gold | 18-30 | 7 |
| 15 | curb | white-gold | 18-30 | 7 |
| 16 | curb | rose-gold | 18-30 | 7 |
| 17 | curb | two-tone | 18-30 | 7 |
| 18 | figaro | white-gold | 18-30 | 7 |
| 19 | franco | white-gold | 18-30 | 7 |
| 20 | franco | rose-gold | 18-30 | 7 |
| 21 | oval-link | yellow-gold | 18-30 | 7 |
| 22 | paperclip | yellow-gold | 18-30 | 7 |
| 23 | rope | white-gold | 18-30 | 7 |
| 24 | round-link | two-tone | 18-30 | 7 |
| 25 | singapore | yellow-gold | 18-30 | 7 |
| 26 | singapore | white-gold | 18-30 | 7 |
| 27 | snake | yellow-gold | 18-30 | 7 |
| 28 | snake | white-gold | 18-30 | 7 |
| 29 | wheat | yellow-gold | 18-30 | 7 |
| 30 | wheat | white-gold | 18-30 | 7 |
| 31 | wheat | rose-gold | 18-30 | 7 |

**Total: 217 gallery images + 6 hero images = 223 images**
**Credit cost: 223 x 1.25 = ~279 credits**

## Generation Settings
- Model: recraft_v4_1
- model_type: utility
- resolution: 1k
- aspect_ratio: 1:1
- background_color: "#B8B8B8"
- colors: ["#B8B8B8", "#D4D4D4", "#8A8A8A"]

## Upload Strategy
- Use .set() for ALL chains (overwrite existing gallery images with new ones)
- Query: `*[_type == "chain" && chainType == $type && defaultMetal == $metal]{_id, name}`
- No filter on count(galleryImages) since we're replacing everything
