# Groceries Storage + API Schema

Storage is user-scoped via `userId`.

## Entities
- `GroceryList`
- `GroceryListItem`

## Endpoints

### Grocery list CRUD
- `GET /api/users/:userId/grocery-lists`
- `POST /api/users/:userId/grocery-lists`
- `GET /api/grocery-lists/:listId`
- `PATCH /api/grocery-lists/:listId`
- `DELETE /api/grocery-lists/:listId`

### Grocery item CRUD
- `POST /api/grocery-lists/:listId/items`
- `PATCH /api/grocery-lists/:listId/items/:itemId`
- `DELETE /api/grocery-lists/:listId/items/:itemId`

### Shared lists
- `POST /api/grocery-lists/:listId/share` with `{ "shared": true }`
- `GET /api/shared/grocery-lists/:shareToken`

## Example payloads

### Create list
```json
{
  "userId": "user_123",
  "name": "Weekly groceries",
  "weekLabel": "Mar 9 - Mar 15",
  "items": [
    {
      "name": "Tomatoes",
      "category": "produce",
      "quantity": 6,
      "unit": "pcs",
      "bought": false
    }
  ]
}
```

### Update item
```json
{
  "quantity": 8,
  "bought": true
}
```
