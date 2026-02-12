# HomeScreen module

Reusable home screen UI for WhatToCook? focused on conversion and discovery.

## Includes
- Big hero banner with app name and customizable background image
- Brief explanatory copy under the main headline
- Two CTA buttons for weekly planning and recipe search
- Featured recipe list/cards
- Responsive and accessible defaults

## Props contract
- `heroBackgroundImageUrl`: image URL for hero background (optional)
- `heroTitle`, `heroDescription`, CTA labels: customizable copy
- `onPlanningCtaClick`, `onRecipesCtaClick`: action callbacks
- `featuredRecipes`: list of cards with optional `imageUrl`, `cuisine`, `cookTime`, and `href`

## Slotting into layout
Use `HomeScreen` inside the `AppLayout` main content area:

```tsx
<AppLayout activeNavKey="home" isLoggedIn>
  <HomeScreen
    heroBackgroundImageUrl="/images/hero.jpg"
    onPlanningCtaClick={() => navigate("/weekly-menu")}
    onRecipesCtaClick={() => navigate("/recipes")}
    featuredRecipes={recipes}
  />
</AppLayout>
```
