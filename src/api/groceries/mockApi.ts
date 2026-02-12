import {
  addGroceryItem,
  createGroceryList,
  deleteGroceryList,
  getGroceryListById,
  getGroceryListByShareToken,
  listGroceryListsByUser,
  removeGroceryItem,
  setGroceryListShared,
  updateGroceryItem,
  updateGroceryList,
} from "./storage";
import {
  CreateGroceryItemInput,
  CreateGroceryListInput,
  GroceryListResponse,
  GroceryListsResponse,
  UpdateGroceryItemInput,
  UpdateGroceryListInput,
} from "./types";

export async function apiListGroceryListsByUser(userId: string): Promise<GroceryListsResponse> {
  return { data: listGroceryListsByUser(userId) };
}

export async function apiGetGroceryList(listId: string): Promise<GroceryListResponse> {
  return { data: getGroceryListById(listId) };
}

export async function apiCreateGroceryList(input: CreateGroceryListInput): Promise<GroceryListResponse> {
  return { data: createGroceryList(input) };
}

export async function apiUpdateGroceryList(
  listId: string,
  patch: UpdateGroceryListInput
): Promise<GroceryListResponse> {
  return { data: updateGroceryList(listId, patch) };
}

export async function apiDeleteGroceryList(listId: string): Promise<{ deleted: true }> {
  return deleteGroceryList(listId);
}

export async function apiAddGroceryItem(
  listId: string,
  input: CreateGroceryItemInput
): Promise<GroceryListResponse> {
  addGroceryItem(listId, input);
  return { data: getGroceryListById(listId) };
}

export async function apiUpdateGroceryItem(
  listId: string,
  itemId: string,
  patch: UpdateGroceryItemInput
): Promise<GroceryListResponse> {
  updateGroceryItem(listId, itemId, patch);
  return { data: getGroceryListById(listId) };
}

export async function apiRemoveGroceryItem(listId: string, itemId: string): Promise<GroceryListResponse> {
  removeGroceryItem(listId, itemId);
  return { data: getGroceryListById(listId) };
}

export async function apiSetGroceryListShared(listId: string, shared: boolean): Promise<GroceryListResponse> {
  return { data: setGroceryListShared(listId, shared) };
}

export async function apiGetSharedGroceryList(shareToken: string): Promise<GroceryListResponse> {
  return { data: getGroceryListByShareToken(shareToken) };
}

export const groceryMockHandlers = {
  async list(userId: string) {
    return { status: 200, body: await apiListGroceryListsByUser(userId) };
  },
  async get(listId: string) {
    try {
      return { status: 200, body: await apiGetGroceryList(listId) };
    } catch (error) {
      return { status: 404, body: { error: error instanceof Error ? error.message : "Not found" } };
    }
  },
  async create(payload: CreateGroceryListInput) {
    return { status: 201, body: await apiCreateGroceryList(payload) };
  },
  async update(listId: string, patch: UpdateGroceryListInput) {
    try {
      return { status: 200, body: await apiUpdateGroceryList(listId, patch) };
    } catch (error) {
      return { status: 404, body: { error: error instanceof Error ? error.message : "Not found" } };
    }
  },
  async remove(listId: string) {
    try {
      return { status: 200, body: await apiDeleteGroceryList(listId) };
    } catch (error) {
      return { status: 404, body: { error: error instanceof Error ? error.message : "Not found" } };
    }
  },
};
