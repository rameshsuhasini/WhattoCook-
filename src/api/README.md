# API / Mock API modules

## Recipes API
Located at `src/api/recipes`.

Includes:
- Typed schema models (`types.ts`)
- Mock dataset (`mockData.ts`)
- Query/filter/detail API functions (`mockApi.ts`)
- Endpoint contract documentation (`schema.md`)

### Use in UI layer
```ts
import { searchRecipes, getRecipeDetails } from "../api/recipes";

const results = await searchRecipes({ q: "curry", cuisine: "Thai", maxCalories: 650, dietaryTags: ["dairy-free"] });
const recipe = await getRecipeDetails("r_002");
```


## Weekly Menus API
Located at `src/api/weekly-menus`.

Includes:
- User-scoped week/day/recipe-slot storage (`storage.ts`)
- Async API wrappers + mock HTTP handlers (`mockApi.ts`)
- Endpoint/storage schema documentation (`schema.md`)

### Use in UI layer
```ts
import { apiCreateWeek, apiCreateDay, apiUpsertDayRecipe } from "../api/weekly-menus";

const week = await apiCreateWeek({ userId: "user_123", weekStartISO: "2026-03-09", weekEndISO: "2026-03-15", label: "Mar 9 - Mar 15" });
await apiCreateDay(week.data.id, { dateISO: "2026-03-09" });
await apiUpsertDayRecipe(week.data.id, week.data.days[0].id, {
  recipeId: "r_001",
  recipeTitle: "Mediterranean Chickpea Bowl",
  mealType: "dinner",
  servings: 2
});
```


## Groceries API
Located at `src/api/groceries`.

Includes:
- User-scoped grocery list storage (`storage.ts`)
- CRUD wrappers + mock handlers (`mockApi.ts`)
- Shareable list model with share-token reads (`schema.md`)

### Use in UI layer
```ts
import { apiCreateGroceryList, apiAddGroceryItem, apiUpdateGroceryItem, apiSetGroceryListShared } from "../api/groceries";

const list = await apiCreateGroceryList({ userId: "user_123", name: "Weekly groceries" });
const withItem = await apiAddGroceryItem(list.data.id, { name: "Tomatoes", category: "produce", quantity: 6, bought: false });
await apiUpdateGroceryItem(withItem.data.id, withItem.data.items[0].id, { bought: true });
await apiSetGroceryListShared(list.data.id, true);
```
