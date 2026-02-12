# GroceriesScreen module

Reusable groceries screen module with grouped categories, editable quantities, bought toggles, and shopping mode.

## Features
- Aggregated list grouped by category (Produce, Dairy, etc.)
- Checkboxes to mark items as bought
- Inline quantity editing per item
- Save List and Share List action buttons
- Optional quick Shopping Mode (shows only unbought items)

## Props
- `items`: grocery items with category, quantity, and bought status
- `onItemsChange(nextItems)`: emits updates for checkbox/quantity edits
- `onSaveList(items)`, `onShareList(items)`: action callbacks
- `enableShoppingMode`, `defaultShoppingMode`: optional quick-mode controls

## Example
```tsx
<GroceriesScreen
  weekLabel="Mar 10 – Mar 16"
  items={items}
  onItemsChange={setItems}
  onSaveList={(next) => saveGroceries(next)}
  onShareList={(next) => shareGroceries(next)}
  enableShoppingMode
/>
```
