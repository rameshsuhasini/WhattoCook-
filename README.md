# WhatToCook? UI System

A modern, warm, appetizing design system for a modular meal-planning experience.

## 1) Color Palette

Design intent: **fresh + culinary warmth + high legibility**.

### Core Brand Colors
- **Tomato 500** `#E65C3A` — primary brand accent, CTAs
- **Saffron 500** `#F4B740` — highlights, cheerful moments
- **Leaf 500** `#3FA66B` — success, freshness, completed states
- **Berry 500** `#7A4D8E` — secondary accent for richer content zones

### Neutrals (UI Foundations)
- **Cream 50** `#FFF9F2` — app background
- **Cream 100** `#FDF2E6` — elevated warm surfaces
- **Stone 200** `#E8DFD5` — borders/dividers
- **Stone 400** `#B8AB9C` — placeholders/subtle text
- **Cocoa 700** `#4A3D33` — body text
- **Cocoa 900** `#2A211B` — headings/high contrast text

### Semantic Colors
- **Success** `#2E9B62`
- **Warning** `#D9911A`
- **Error** `#C94A3D`
- **Info** `#3D7BC9`

### Functional Usage Rules
- Keep backgrounds warm and light (`Cream 50/100`) for appetite-friendly tone.
- Use `Tomato 500` for primary actions only (avoid over-saturation).
- Use `Leaf 500` for completion/check states in grocery lists.
- Maintain WCAG AA contrast for text/action labels.

---

## 2) Typography Scale

Design intent: **friendly editorial + product clarity**.

### Font Stack
- **Heading font:** `"Fraunces", "DM Serif Display", Georgia, serif`
- **Body/UI font:** `"Inter", "SF Pro Text", "Segoe UI", sans-serif`

### Type Scale (Desktop)
- **Display**: 48 / 56, weight 600
- **H1**: 36 / 44, weight 600
- **H2**: 30 / 38, weight 600
- **H3**: 24 / 32, weight 600
- **H4**: 20 / 28, weight 600
- **Body L**: 18 / 28, weight 400
- **Body M**: 16 / 24, weight 400 (default)
- **Body S**: 14 / 20, weight 400
- **Label**: 14 / 18, weight 500
- **Caption**: 12 / 16, weight 400

### Mobile Adjustment
- Scale headings down ~12–15%.
- Keep Body M at `16px` minimum for readability.

### Typography Rules
- Use serif headings for appetite/brand personality.
- Use sans body for forms, data, and dense task flows.
- Max line length: ~70 characters for body text.

---

## 3) Spacing Rules

Use an **8pt grid** with compact variants for dense planner layouts.

### Spacing Scale
- `4, 8, 12, 16, 24, 32, 40, 48, 64`

### Layout Rules
- Screen horizontal padding: `24` desktop / `16` mobile
- Section spacing: `40` desktop / `32` mobile
- Card internal padding: `16` default, `24` for hero cards
- Grid gap: `16` default
- Form row gap: `12`

### Radius + Elevation
- Radius: `8` (inputs), `12` (cards), `999` (chips/pills)
- Shadows:
  - **sm**: `0 1px 2px rgba(42,33,27,0.08)`
  - **md**: `0 4px 12px rgba(42,33,27,0.10)`
  - **lg**: `0 12px 24px rgba(42,33,27,0.12)`

---

## 4) Iconography Guidelines

Style intent: **simple, rounded, friendly utility icons**.

### Icon Style
- 24px base size (20px in dense contexts)
- 1.75px stroke, rounded caps/joins
- Slightly rounded geometry (not sharp corporate)

### Icon Behavior
- Default icon color: `Cocoa 700`
- Muted/inactive: `Stone 400`
- Success state icons: `Leaf 500`
- Never rely on icon-only meaning for critical actions; pair with labels/tooltips.

### Suggested Icon Set Categories
- Navigation: Home, Calendar, Book, Cart
- Meal planning: Add, Swap, Repeat, Clock
- Groceries: Check, List, Filter, Share
- Utility: Search, Settings, Profile, Notification

---

## 5) Button Styles

Design intent: **comfort-food warmth + crisp product ergonomics**.

### Button Sizes
- **Large**: 48px height, 20px horizontal padding
- **Medium**: 40px height, 16px horizontal padding
- **Small**: 32px height, 12px horizontal padding

### Variants
1. **Primary**
   - BG: `Tomato 500`
   - Text/Icon: `#FFFFFF`
   - Hover: `#D94E2D`
   - Pressed: `#C84628`
   - Focus: `2px` ring `#F4B740`

2. **Secondary**
   - BG: `Cream 100`
   - Border: `Stone 200`
   - Text: `Cocoa 900`
   - Hover BG: `#F8E7D6`

3. **Tertiary / Ghost**
   - BG: transparent
   - Text: `Tomato 500`
   - Hover BG: `rgba(230,92,58,0.10)`

4. **Success Action** (e.g., “Mark all bought”)
   - BG: `Leaf 500`
   - Text: white

5. **Destructive**
   - BG: `Error`
   - Text: white

### Interaction Rules
- Transition: `150ms ease-out`
- Disabled opacity: `0.5` and no shadow
- Maintain 44px min touch target on mobile

---

## 6) Figma Style Tokens (Reusable)

```json
{
  "color": {
    "brand": {
      "tomato": { "500": "#E65C3A" },
      "saffron": { "500": "#F4B740" },
      "leaf": { "500": "#3FA66B" },
      "berry": { "500": "#7A4D8E" }
    },
    "neutral": {
      "cream": { "50": "#FFF9F2", "100": "#FDF2E6" },
      "stone": { "200": "#E8DFD5", "400": "#B8AB9C" },
      "cocoa": { "700": "#4A3D33", "900": "#2A211B" }
    },
    "semantic": {
      "success": "#2E9B62",
      "warning": "#D9911A",
      "error": "#C94A3D",
      "info": "#3D7BC9"
    },
    "surface": {
      "app": "{color.neutral.cream.50}",
      "card": "#FFFFFF",
      "warm": "{color.neutral.cream.100}"
    },
    "text": {
      "primary": "{color.neutral.cocoa.900}",
      "secondary": "{color.neutral.cocoa.700}",
      "muted": "{color.neutral.stone.400}",
      "inverse": "#FFFFFF"
    },
    "border": {
      "default": "{color.neutral.stone.200}",
      "focus": "{color.brand.saffron.500}"
    },
    "button": {
      "primary": {
        "bg": "{color.brand.tomato.500}",
        "text": "#FFFFFF",
        "hover": "#D94E2D",
        "pressed": "#C84628"
      },
      "secondary": {
        "bg": "{color.neutral.cream.100}",
        "text": "{color.neutral.cocoa.900}",
        "border": "{color.neutral.stone.200}"
      },
      "ghost": {
        "text": "{color.brand.tomato.500}",
        "hoverBg": "rgba(230, 92, 58, 0.10)"
      },
      "success": {
        "bg": "{color.brand.leaf.500}",
        "text": "#FFFFFF"
      },
      "danger": {
        "bg": "{color.semantic.error}",
        "text": "#FFFFFF"
      }
    }
  },
  "typography": {
    "fontFamily": {
      "heading": "Fraunces, DM Serif Display, Georgia, serif",
      "body": "Inter, SF Pro Text, Segoe UI, sans-serif"
    },
    "scale": {
      "display": { "size": 48, "lineHeight": 56, "weight": 600 },
      "h1": { "size": 36, "lineHeight": 44, "weight": 600 },
      "h2": { "size": 30, "lineHeight": 38, "weight": 600 },
      "h3": { "size": 24, "lineHeight": 32, "weight": 600 },
      "h4": { "size": 20, "lineHeight": 28, "weight": 600 },
      "bodyL": { "size": 18, "lineHeight": 28, "weight": 400 },
      "bodyM": { "size": 16, "lineHeight": 24, "weight": 400 },
      "bodyS": { "size": 14, "lineHeight": 20, "weight": 400 },
      "label": { "size": 14, "lineHeight": 18, "weight": 500 },
      "caption": { "size": 12, "lineHeight": 16, "weight": 400 }
    }
  },
  "spacing": {
    "4": 4,
    "8": 8,
    "12": 12,
    "16": 16,
    "24": 24,
    "32": 32,
    "40": 40,
    "48": 48,
    "64": 64
  },
  "radius": {
    "sm": 8,
    "md": 12,
    "pill": 999
  },
  "shadow": {
    "sm": "0 1px 2px rgba(42,33,27,0.08)",
    "md": "0 4px 12px rgba(42,33,27,0.10)",
    "lg": "0 12px 24px rgba(42,33,27,0.12)"
  },
  "icon": {
    "size": { "default": 24, "dense": 20 },
    "stroke": 1.75,
    "radiusStyle": "rounded"
  },
  "motion": {
    "fast": "150ms ease-out"
  }
}
```

---

## 7) Quick UI Composition Pattern (Optional Starter)

- **Home hero**: warm gradient (`Cream 50` to `Cream 100`) + primary CTA.
- **Weekly menu cards**: white cards, `md` radius, subtle `sm` shadow, color-dot by meal type.
- **Recipe cards**: large image, cuisine chip (pill), quick metadata row (time, difficulty).
- **Groceries**: grouped checklist with sticky category headers and success states in `Leaf`.

This system keeps the product modern and seamless while still feeling appetizing and human.

---

## Supabase Auth Integration (All Screens)

The UI modules now support a shared Supabase authentication/session layer across Home, Weekly Menu, Recipes, and Groceries.

### Login methods
- Email magic link (`signInWithOtp`)
- Google OAuth (`signInWithOAuth({ provider: "google" })`)

### Clean session management logic
1. `AuthProvider` initializes the Supabase client and fetches current session on mount.
2. `AuthProvider` subscribes to `onAuthStateChange` to keep session/user state synchronized.
3. Session state (`session`, `user`, `loading`, `authError`) is exposed via context (`useAuth`).
4. Shared `AuthControls` can be rendered in each screen for consistent sign-in/out UX.
5. `AppLayout` can consume Supabase auth for header-level session controls.

### Required environment variables
- `NEXT_PUBLIC_SUPABASE_URL` or `VITE_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `VITE_SUPABASE_ANON_KEY`
