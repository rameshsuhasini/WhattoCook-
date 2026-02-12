# RecipeExplorer module

A fully exportable Recipe Explorer screen component with filters, recipe cards, details modal, and grocery action.

## Includes
- Card grid with image, title, calories
- Filter bar for country/cuisine, dietary tags, and free-text search
- Click card to open modal with full recipe details + ingredients (+ optional steps)
- "Add to Grocery List" action callback
- Intuitive pagination UX: supports both infinite scroll (IntersectionObserver sentinel) and explicit "Load more" button

## Props
- `recipes`: recipe collection to display
- `onAddToGroceryList(recipe)`: called from modal action
- `hasMore`, `isLoadingMore`, `onLoadMore`: pagination/infinite-scroll controls
- `availableCountriesOrCuisines`, `availableDietaryTags`: optional filter options

## Example
```tsx
<RecipeExplorer
  recipes={recipes}
  hasMore={hasMore}
  isLoadingMore={loadingMore}
  onLoadMore={fetchNextPage}
  onAddToGroceryList={(recipe) => addRecipeIngredients(recipe.id)}
/>
```
