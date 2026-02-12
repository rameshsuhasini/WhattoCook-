# Recipe API Schema (Design)

## Endpoints

### `GET /api/recipes`
Search and filter recipes.

#### Query params
- `q` (string, optional): free-text search across title/description/cuisine/country
- `cuisine` (string, optional): exact cuisine match (case-insensitive)
- `minCalories` (number, optional)
- `maxCalories` (number, optional)
- `dietaryTags` (string[], optional): e.g. `vegan,gluten-free`
- `page` (number, default `1`)
- `pageSize` (number, default `12`)

#### Response (200)
```json
{
  "data": [
    {
      "id": "r_001",
      "title": "Mediterranean Chickpea Bowl",
      "cuisine": "Mediterranean",
      "country": "Greece",
      "calories": 510,
      "dietaryTags": ["vegetarian", "high-protein"]
    }
  ],
  "page": 1,
  "pageSize": 12,
  "total": 42,
  "hasMore": true
}
```

### `GET /api/recipes/:id`
Fetch full recipe details.

#### Response (200)
```json
{
  "data": {
    "id": "r_001",
    "title": "Mediterranean Chickpea Bowl",
    "cuisine": "Mediterranean",
    "country": "Greece",
    "calories": 510,
    "dietaryTags": ["vegetarian", "high-protein"],
    "description": "Lemony chickpeas...",
    "ingredients": ["1 cup chickpeas"],
    "steps": ["Roast vegetables"],
    "cookTimeMinutes": 30,
    "servings": 2
  }
}
```

#### Response (404)
```json
{
  "error": "Recipe not found for id: r_999"
}
```

## Notes
- Prefer filtering server-side when datasets are large.
- `dietaryTags` filter applies AND semantics (recipe must include all requested tags).
