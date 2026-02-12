import React, { useMemo, useState } from "react";
import "./GroceriesScreen.css";
import { AuthControls } from "../auth";

export type GroceryCategory =
  | "produce"
  | "dairy"
  | "protein"
  | "pantry"
  | "frozen"
  | "bakery"
  | "beverages"
  | "other";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  unit?: string;
  bought: boolean;
  note?: string;
};

export type GroceriesScreenProps = {
  title?: string;
  weekLabel?: string;
  items: GroceryItem[];
  onItemsChange?: (nextItems: GroceryItem[]) => void;
  onSaveList?: (items: GroceryItem[]) => void;
  onShareList?: (items: GroceryItem[]) => void;
  enableShoppingMode?: boolean;
  defaultShoppingMode?: boolean;
  showAuthControls?: boolean;
  authRedirectTo?: string;
};

const CATEGORY_LABELS: Record<GroceryCategory, string> = {
  produce: "Produce",
  dairy: "Dairy",
  protein: "Protein",
  pantry: "Pantry",
  frozen: "Frozen",
  bakery: "Bakery",
  beverages: "Beverages",
  other: "Other",
};

export function GroceriesScreen({
  title = "Groceries",
  weekLabel = "This Week",
  items,
  onItemsChange,
  onSaveList,
  onShareList,
  enableShoppingMode = true,
  defaultShoppingMode = false,
  showAuthControls = true,
  authRedirectTo,
}: GroceriesScreenProps) {
  const [shoppingMode, setShoppingMode] = useState(defaultShoppingMode);

  const groupedItems = useMemo(() => {
    const map = new Map<GroceryCategory, GroceryItem[]>();

    items.forEach((item) => {
      const existing = map.get(item.category) ?? [];
      existing.push(item);
      map.set(item.category, existing);
    });

    return Array.from(map.entries()).sort((a, b) => CATEGORY_LABELS[a[0]].localeCompare(CATEGORY_LABELS[b[0]]));
  }, [items]);

  const visibleGroupedItems = useMemo(() => {
    if (!shoppingMode) return groupedItems;
    return groupedItems
      .map(([category, categoryItems]) => [category, categoryItems.filter((item) => !item.bought)] as const)
      .filter(([, categoryItems]) => categoryItems.length > 0);
  }, [groupedItems, shoppingMode]);

  const totalCount = items.length;
  const boughtCount = items.filter((item) => item.bought).length;

  function updateItem(itemId: string, patch: Partial<GroceryItem>) {
    const nextItems = items.map((item) => (item.id === itemId ? { ...item, ...patch } : item));
    onItemsChange?.(nextItems);
  }

  return (
    <>
      {showAuthControls && <AuthControls redirectTo={authRedirectTo} />}
      <section className="wtc-groceries" aria-label="Grocery list">
      <header className="wtc-groceries-header">
        <div>
          <h1>{title}</h1>
          <p>
            {weekLabel} · {boughtCount}/{totalCount} bought
          </p>
        </div>

        <div className="wtc-groceries-actions">
          {enableShoppingMode && (
            <button
              type="button"
              className={`wtc-action-btn ${shoppingMode ? "active" : ""}`}
              onClick={() => setShoppingMode((prev) => !prev)}
              aria-pressed={shoppingMode}
            >
              {shoppingMode ? "Exit Shopping Mode" : "Shopping Mode"}
            </button>
          )}
          <button type="button" className="wtc-action-btn" onClick={() => onSaveList?.(items)}>
            Save List
          </button>
          <button type="button" className="wtc-action-btn wtc-primary" onClick={() => onShareList?.(items)}>
            Share List
          </button>
        </div>
      </header>

      {!visibleGroupedItems.length ? (
        <p className="wtc-empty-state">All items are bought 🎉</p>
      ) : (
        <div className="wtc-grocery-groups">
          {visibleGroupedItems.map(([category, categoryItems]) => (
            <article className="wtc-grocery-group" key={category}>
              <header className="wtc-group-header">
                <h2>{CATEGORY_LABELS[category]}</h2>
                <span>{categoryItems.length} items</span>
              </header>

              <ul className="wtc-items-list" role="list">
                {categoryItems.map((item) => (
                  <li key={item.id} className={`wtc-item-row ${item.bought ? "bought" : ""}`}>
                    <label className="wtc-item-check-wrap">
                      <input
                        type="checkbox"
                        checked={item.bought}
                        onChange={(event) => updateItem(item.id, { bought: event.target.checked })}
                        aria-label={`Mark ${item.name} as bought`}
                      />
                      <span className="wtc-item-name">{item.name}</span>
                    </label>

                    <div className="wtc-item-qty-wrap">
                      <label htmlFor={`qty-${item.id}`} className="wtc-visually-hidden">
                        Edit quantity for {item.name}
                      </label>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        min={0}
                        step="0.25"
                        value={item.quantity}
                        onChange={(event) => updateItem(item.id, { quantity: Number(event.target.value) || 0 })}
                        className="wtc-qty-input"
                      />
                      <span className="wtc-item-unit">{item.unit ?? "qty"}</span>
                    </div>

                    {item.note && <span className="wtc-item-note">{item.note}</span>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
    </>
  );
}

export default GroceriesScreen;
