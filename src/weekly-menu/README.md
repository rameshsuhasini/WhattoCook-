# WeeklyMenuScreen module

Independent weekly planner UI module.

## Features
- Current week header with Previous / Next navigation buttons
- Day cards showing planned meals
- Day click/tap opens edit modal
- Modal includes search bar and async recipe search results
- Selecting a recipe auto-populates the tapped day (writes to dinner slot by default)

## Props
- `weekData`: current week label + per-day meals
- `searchRecipes(query)`: async search function injected by parent
- `onWeekNavigate(direction)`: callback for prev/next week changes
- `onWeekDataChange(nextWeekData)`: emits updated week data after recipe selection

## Example
```tsx
<WeeklyMenuScreen
  weekData={weekData}
  onWeekNavigate={(dir) => setWeekOffset((o) => (dir === "next" ? o + 1 : o - 1))}
  onWeekDataChange={setWeekData}
  searchRecipes={(query) => api.searchRecipes(query)}
/>
```
