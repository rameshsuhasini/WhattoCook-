# AppLayout module

## Purpose
Reusable shell layout for WhatToCook? with:
- Sidebar navigation links: Home, Recipes, Weekly Menu, Groceries
- Sticky top header with app icon, login, profile, settings
- Responsive behavior (desktop persistent sidebar, mobile collapsible drawer)

## Files
- `AppLayout.tsx`: component + props API
- `AppLayout.css`: styling and responsive behavior

## Usage
```tsx
import AppLayout from "./layout/AppLayout";

export function WeeklyMenuPage() {
  return (
    <AppLayout activeNavKey="weekly-menu" isLoggedIn>
      <section>
        <h1>Weekly Menu</h1>
        <p>Your page content slots into the `children` region.</p>
      </section>
    </AppLayout>
  );
}
```

## Content slot contract
- Main page content is injected through `children`.
- Provide route-specific content as the main child tree.
- Use `headerActions` prop for page-level controls in the top-right header.
