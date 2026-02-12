# Weekly Menus Storage + API Schema

Storage is user-scoped: every week belongs to a `userId`.

## Core entities
- `WeeklyMenuWeek`
- `WeeklyMenuDay`
- `WeeklyMenuRecipeSlot`

## Endpoints

### Week CRUD
- `GET /api/users/:userId/weeks` → list weeks for user
- `POST /api/users/:userId/weeks` → create week
- `GET /api/weeks/:weekId` → fetch week
- `PATCH /api/weeks/:weekId` → update week metadata
- `DELETE /api/weeks/:weekId` → delete week

### Day CRUD
- `POST /api/weeks/:weekId/days` → create day
- `PATCH /api/weeks/:weekId/days/:dayId` → update day
- `DELETE /api/weeks/:weekId/days/:dayId` → delete day

### Day Recipe CRUD
- `PUT /api/weeks/:weekId/days/:dayId/recipes` → upsert recipe slot by `mealType`
- `DELETE /api/weeks/:weekId/days/:dayId/recipes/:mealType` → remove meal slot

## Example payloads

### Create week
```json
{
  "userId": "user_123",
  "weekStartISO": "2026-03-09",
  "weekEndISO": "2026-03-15",
  "label": "Mar 9 - Mar 15",
  "days": [
    { "dateISO": "2026-03-09", "notes": "Prep day" }
  ]
}
```

### Upsert day recipe
```json
{
  "recipeId": "r_001",
  "recipeTitle": "Mediterranean Chickpea Bowl",
  "mealType": "dinner",
  "servings": 2
}
```
