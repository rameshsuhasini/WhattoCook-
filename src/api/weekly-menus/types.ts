export type MealType = "breakfast" | "lunch" | "dinner";

export type WeeklyMenuRecipeSlot = {
  id: string;
  recipeId: string;
  recipeTitle: string;
  mealType: MealType;
  servings?: number;
};

export type WeeklyMenuDay = {
  id: string;
  dateISO: string;
  notes?: string;
  recipes: WeeklyMenuRecipeSlot[];
};

export type WeeklyMenuWeek = {
  id: string;
  userId: string;
  weekStartISO: string;
  weekEndISO: string;
  label: string;
  createdAtISO: string;
  updatedAtISO: string;
  days: WeeklyMenuDay[];
};

export type CreateWeekInput = {
  userId: string;
  weekStartISO: string;
  weekEndISO: string;
  label: string;
  days?: Array<Pick<WeeklyMenuDay, "dateISO" | "notes">>;
};

export type UpdateWeekInput = {
  label?: string;
  weekStartISO?: string;
  weekEndISO?: string;
};

export type CreateDayInput = {
  dateISO: string;
  notes?: string;
};

export type UpdateDayInput = {
  dateISO?: string;
  notes?: string;
};

export type UpsertDayRecipeInput = {
  recipeId: string;
  recipeTitle: string;
  mealType: MealType;
  servings?: number;
};

export type WeeklyMenusListResponse = {
  data: WeeklyMenuWeek[];
};

export type WeeklyMenuResponse = {
  data: WeeklyMenuWeek;
};
