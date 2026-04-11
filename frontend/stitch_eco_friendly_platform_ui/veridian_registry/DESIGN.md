# Design System Specification: The Ethereal Registry

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Arboretum"**

This design system rejects the "SaaS-in-a-box" aesthetic in favor of a high-end, editorial experience that mirrors the precision and transparency required of a carbon credit registry. We are not building a dashboard; we are curating an environmental ledger.

The visual language is rooted in **Soft Minimalism** and **Atmospheric Depth**. By utilizing wide margins, intentional asymmetry, and a "paper-on-glass" layering philosophy, we move away from rigid, boxed-in layouts. The interface should feel like light passing through a forest canopy—structured, yet organic and breathable.

---

## 2. Colors: Tonal Integrity
We utilize a Material Design-inspired palette, but with a strict editorial application. Color is used to signify biological health and institutional trust.

### Primary Palette
- **Primary (`#00535b`) & Primary Container (`#006d77`):** Our "Deep Teal." Reserved for high-priority actions and authoritative states.
- **Secondary (`#236863`):** The "Sage Transition." Used for secondary navigation and supportive interactive elements.
- **Surface & Background (`#f5fafa`):** A cool, crisp white with a hint of teal to prevent eye strain and maintain the "eco-friendly" light theme.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Layout boundaries must be established through:
1.  **Background Shifts:** Place a `surface-container-low` section against a `surface` background.
2.  **Tonal Transitions:** Use subtle shifts between `surface-container-lowest` (pure white) and `surface-container-high` to denote nesting.

### The "Glass & Gradient" Rule
To elevate the "Modern" requirement, floating elements (modals, dropdowns, or featured cards) should utilize **Glassmorphism**:
- **Fill:** `surface` at 70% opacity.
- **Effect:** 20px - 32px Backdrop Blur.
- **CTA Soul:** Apply a subtle linear gradient from `primary` to `primary_container` on main buttons to add three-dimensional depth.

---

## 3. Typography: The Editorial Voice
We pair the technical precision of **Inter** with the structural elegance of **Manrope** to create a hierarchy that feels both modern and trustworthy.

- **Display & Headlines (Manrope):** These are our "Statement" tiers. Use `display-lg` (3.5rem) with wide tracking (-0.02em) for hero sections to establish an authoritative, editorial presence.
- **Titles & Body (Inter):** Inter is our "Workhorse." Use `body-lg` (1rem) for all technical data and registry descriptions to ensure maximum legibility at high densities.
- **Labels (Inter):** Use `label-md` (0.75rem) in all-caps with +0.05em letter spacing for metadata and status indicators to provide a "stamped" or "certified" feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We define depth through physical stacking and ambient light.

### The Layering Principle
Build your UI like a physical desk of semi-transparent materials:
- **Base Layer:** `surface` (#f5fafa).
- **Secondary Layer:** `surface-container-low` for large content areas.
- **Primary Content:** `surface-container-lowest` (#ffffff) for the main card or focal point.

### Ambient Shadows & Ghost Borders
- **Shadows:** If a floating state is required, use a shadow with a 40px blur, 0px offset, and 6% opacity of the `on-surface` color (#171d1d).
- **Ghost Borders:** For accessibility on white-on-white elements, use the `outline_variant` (#bec8ca) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components: Precision & Transparency

### Buttons
- **Primary:** `primary` background, `on-primary` text. 0.375rem (md) corner radius. Use a subtle 2px inner-glow on hover.
- **Tertiary:** No background or border. Use `primary` text with an underline that only appears on hover.

### Status Badges (The "Registry Stamps")
These must be high-contrast and clear:
- **Verified:** `secondary_container` background with `on_secondary_container` text.
- **Pending:** `surface_container_highest` background with `outline` text.
- **Approved:** `primary_fixed` background with `on_primary_fixed_variant` text.
- **Expired:** `error_container` background with `on_error_container` text.

### Glassmorphic Cards
Cards do not have borders. They use `surface_container_lowest` at 80% opacity with a 16px backdrop blur. Forbid the use of divider lines within cards; use `24px` vertical spacing to separate header, body, and footer.

### Form Fields
- **Input Surface:** `surface_container_low`.
- **Active State:** Change background to `surface_container_lowest` and add a 1px "Ghost Border" using `primary` at 30% opacity.
- **Labels:** Always use `label-md` positioned strictly above the field, never as a placeholder.

---

## 6. Do's and Don'ts

### Do:
- **Embrace White Space:** Treat "empty" space as a functional component that increases the perceived value of the data.
- **Use Intentional Asymmetry:** Align text to the left but allow imagery or data visualizations to bleed off the right edge of the grid.
- **Use Tonal Depth:** Nest a `surface-container-high` element inside a `surface-container-low` element to show containment.

### Don't:
- **No Heavy Borders:** Never use a solid, high-contrast border to separate content.
- **No Pure Black:** Use `on_surface` (#171d1d) for text to maintain a softer, organic feel.
- **No Standard Shadows:** Avoid small, dark, "muddy" shadows. If it doesn't look like ambient light, don't use it.
- **No Dividers:** Avoid horizontal rules (`<hr>`). Use a 40px - 64px gap to indicate a new section of the registry.