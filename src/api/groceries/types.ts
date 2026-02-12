export type GroceryCategory =
  | "produce"
  | "dairy"
  | "protein"
  | "pantry"
  | "frozen"
  | "bakery"
  | "beverages"
  | "other";

export type GroceryListItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  unit?: string;
  bought: boolean;
  note?: string;
};

export type GroceryList = {
  id: string;
  userId: string;
  weekLabel?: string;
  name: string;
  isShared: boolean;
  sharedToken?: string;
  items: GroceryListItem[];
  createdAtISO: string;
  updatedAtISO: string;
};

export type CreateGroceryListInput = {
  userId: string;
  name: string;
  weekLabel?: string;
  items?: Omit<GroceryListItem, "id">[];
};

export type UpdateGroceryListInput = {
  name?: string;
  weekLabel?: string;
};

export type CreateGroceryItemInput = Omit<GroceryListItem, "id">;

export type UpdateGroceryItemInput = Partial<Omit<GroceryListItem, "id">>;

export type GroceryListResponse = { data: GroceryList };
export type GroceryListsResponse = { data: GroceryList[] };
