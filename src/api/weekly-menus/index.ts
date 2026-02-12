export {
  listWeeksByUser,
  getWeekById,
  createWeek,
  updateWeek,
  deleteWeek,
  createDay,
  updateDay,
  deleteDay,
  upsertDayRecipe,
  deleteDayRecipe,
  clearWeeklyMenusStore,
} from "./storage";

export {
  apiListWeeksByUser,
  apiGetWeekById,
  apiCreateWeek,
  apiUpdateWeek,
  apiDeleteWeek,
  apiCreateDay,
  apiUpdateDay,
  apiDeleteDay,
  apiUpsertDayRecipe,
  apiDeleteDayRecipe,
  weeklyMenusMockHandlers,
} from "./mockApi";

export type {
  MealType,
  WeeklyMenuRecipeSlot,
  WeeklyMenuDay,
  WeeklyMenuWeek,
  CreateWeekInput,
  UpdateWeekInput,
  CreateDayInput,
  UpdateDayInput,
  UpsertDayRecipeInput,
  WeeklyMenuResponse,
  WeeklyMenusListResponse,
} from "./types";
