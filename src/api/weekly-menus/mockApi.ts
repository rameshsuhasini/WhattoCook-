import {
  createDay,
  createWeek,
  deleteDay,
  deleteDayRecipe,
  deleteWeek,
  getWeekById,
  listWeeksByUser,
  updateDay,
  updateWeek,
  upsertDayRecipe,
} from "./storage";
import {
  CreateDayInput,
  CreateWeekInput,
  UpdateDayInput,
  UpdateWeekInput,
  UpsertDayRecipeInput,
  WeeklyMenuResponse,
  WeeklyMenusListResponse,
} from "./types";

export async function apiListWeeksByUser(userId: string): Promise<WeeklyMenusListResponse> {
  return { data: listWeeksByUser(userId) };
}

export async function apiGetWeekById(weekId: string): Promise<WeeklyMenuResponse> {
  return { data: getWeekById(weekId) };
}

export async function apiCreateWeek(input: CreateWeekInput): Promise<WeeklyMenuResponse> {
  return { data: createWeek(input) };
}

export async function apiUpdateWeek(weekId: string, patch: UpdateWeekInput): Promise<WeeklyMenuResponse> {
  return { data: updateWeek(weekId, patch) };
}

export async function apiDeleteWeek(weekId: string): Promise<{ deleted: true }> {
  return deleteWeek(weekId);
}

export async function apiCreateDay(weekId: string, input: CreateDayInput): Promise<WeeklyMenuResponse> {
  createDay(weekId, input);
  return { data: getWeekById(weekId) };
}

export async function apiUpdateDay(
  weekId: string,
  dayId: string,
  patch: UpdateDayInput
): Promise<WeeklyMenuResponse> {
  updateDay(weekId, dayId, patch);
  return { data: getWeekById(weekId) };
}

export async function apiDeleteDay(weekId: string, dayId: string): Promise<WeeklyMenuResponse> {
  deleteDay(weekId, dayId);
  return { data: getWeekById(weekId) };
}

export async function apiUpsertDayRecipe(
  weekId: string,
  dayId: string,
  input: UpsertDayRecipeInput
): Promise<WeeklyMenuResponse> {
  upsertDayRecipe(weekId, dayId, input);
  return { data: getWeekById(weekId) };
}

export async function apiDeleteDayRecipe(
  weekId: string,
  dayId: string,
  mealType: UpsertDayRecipeInput["mealType"]
): Promise<WeeklyMenuResponse> {
  deleteDayRecipe(weekId, dayId, mealType);
  return { data: getWeekById(weekId) };
}

export const weeklyMenusMockHandlers = {
  async list(userId: string) {
    return { status: 200, body: await apiListWeeksByUser(userId) };
  },
  async get(weekId: string) {
    try {
      return { status: 200, body: await apiGetWeekById(weekId) };
    } catch (error) {
      return { status: 404, body: { error: error instanceof Error ? error.message : "Not found" } };
    }
  },
  async create(payload: CreateWeekInput) {
    return { status: 201, body: await apiCreateWeek(payload) };
  },
  async update(weekId: string, patch: UpdateWeekInput) {
    try {
      return { status: 200, body: await apiUpdateWeek(weekId, patch) };
    } catch (error) {
      return { status: 404, body: { error: error instanceof Error ? error.message : "Not found" } };
    }
  },
  async remove(weekId: string) {
    try {
      return { status: 200, body: await apiDeleteWeek(weekId) };
    } catch (error) {
      return { status: 404, body: { error: error instanceof Error ? error.message : "Not found" } };
    }
  },
};
