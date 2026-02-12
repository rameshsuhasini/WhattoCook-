import {
  CreateGroceryItemInput,
  CreateGroceryListInput,
  GroceryList,
  GroceryListItem,
  UpdateGroceryItemInput,
  UpdateGroceryListInput,
} from "./types";

const groceryListStore = new Map<string, GroceryList>();

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function nowISO() {
  return new Date().toISOString();
}

function assertListExists(listId: string): GroceryList {
  const list = groceryListStore.get(listId);
  if (!list) throw new Error(`Grocery list not found: ${listId}`);
  return list;
}

function touchList(list: GroceryList): GroceryList {
  const next = { ...list, updatedAtISO: nowISO() };
  groceryListStore.set(next.id, next);
  return next;
}

export function listGroceryListsByUser(userId: string): GroceryList[] {
  return Array.from(groceryListStore.values())
    .filter((list) => list.userId === userId)
    .sort((a, b) => b.updatedAtISO.localeCompare(a.updatedAtISO));
}

export function getGroceryListById(listId: string): GroceryList {
  return assertListExists(listId);
}

export function createGroceryList(input: CreateGroceryListInput): GroceryList {
  const timestamp = nowISO();
  const list: GroceryList = {
    id: id("glist"),
    userId: input.userId,
    name: input.name,
    weekLabel: input.weekLabel,
    isShared: false,
    items: (input.items ?? []).map((item) => ({ ...item, id: id("gitem") })),
    createdAtISO: timestamp,
    updatedAtISO: timestamp,
  };
  groceryListStore.set(list.id, list);
  return list;
}

export function updateGroceryList(listId: string, patch: UpdateGroceryListInput): GroceryList {
  const list = assertListExists(listId);
  return touchList({ ...list, ...patch });
}

export function deleteGroceryList(listId: string): { deleted: true } {
  assertListExists(listId);
  groceryListStore.delete(listId);
  return { deleted: true };
}

export function addGroceryItem(listId: string, input: CreateGroceryItemInput): GroceryListItem {
  const list = assertListExists(listId);
  const item: GroceryListItem = { ...input, id: id("gitem") };
  const next = touchList({ ...list, items: [...list.items, item] });
  return next.items.find((i) => i.id === item.id)!;
}

export function updateGroceryItem(
  listId: string,
  itemId: string,
  patch: UpdateGroceryItemInput
): GroceryListItem {
  const list = assertListExists(listId);
  const exists = list.items.some((item) => item.id === itemId);
  if (!exists) throw new Error(`Grocery item not found: ${itemId}`);

  const next = touchList({
    ...list,
    items: list.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
  });

  return next.items.find((item) => item.id === itemId)!;
}

export function removeGroceryItem(listId: string, itemId: string): { deleted: true } {
  const list = assertListExists(listId);
  const exists = list.items.some((item) => item.id === itemId);
  if (!exists) throw new Error(`Grocery item not found: ${itemId}`);

  touchList({
    ...list,
    items: list.items.filter((item) => item.id !== itemId),
  });

  return { deleted: true };
}

export function setGroceryListShared(listId: string, shared: boolean): GroceryList {
  const list = assertListExists(listId);
  const sharedToken = shared ? list.sharedToken ?? id("share") : undefined;
  return touchList({ ...list, isShared: shared, sharedToken });
}

export function getGroceryListByShareToken(token: string): GroceryList {
  const list = Array.from(groceryListStore.values()).find((entry) => entry.sharedToken === token && entry.isShared);
  if (!list) throw new Error(`Shared grocery list not found for token: ${token}`);
  return list;
}

export function clearGroceryListStore() {
  groceryListStore.clear();
}
