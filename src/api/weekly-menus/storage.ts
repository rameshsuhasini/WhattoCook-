import {
  CreateDayInput,
  CreateWeekInput,
  UpdateDayInput,
  UpdateWeekInput,
  UpsertDayRecipeInput,
  WeeklyMenuDay,
  WeeklyMenuRecipeSlot,
  WeeklyMenuWeek,
} from "./types";

const weeklyMenusStore = new Map<string, WeeklyMenuWeek>();

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function nowISO() {
  return new Date().toISOString();
}

function assertWeekExists(weekId: string): WeeklyMenuWeek {
  const week = weeklyMenusStore.get(weekId);
  if (!week) {
    throw new Error(`Weekly menu not found: ${weekId}`);
  }
  return week;
}

function assertDayExists(week: WeeklyMenuWeek, dayId: string): WeeklyMenuDay {
  const day = week.days.find((d) => d.id === dayId);
  if (!day) {
    throw new Error(`Day not found in weekly menu ${week.id}: ${dayId}`);
  }
  return day;
}

function touchWeek(week: WeeklyMenuWeek): WeeklyMenuWeek {
  const nextWeek = { ...week, updatedAtISO: nowISO() };
  weeklyMenusStore.set(nextWeek.id, nextWeek);
  return nextWeek;
}

export function listWeeksByUser(userId: string): WeeklyMenuWeek[] {
  return Array.from(weeklyMenusStore.values())
    .filter((week) => week.userId === userId)
    .sort((a, b) => b.weekStartISO.localeCompare(a.weekStartISO));
}

export function getWeekById(weekId: string): WeeklyMenuWeek {
  return assertWeekExists(weekId);
}

export function createWeek(input: CreateWeekInput): WeeklyMenuWeek {
  const timestamp = nowISO();

  const days: WeeklyMenuDay[] = (input.days ?? []).map((day) => ({
    id: id("day"),
    dateISO: day.dateISO,
    notes: day.notes,
    recipes: [],
  }));

  const week: WeeklyMenuWeek = {
    id: id("week"),
    userId: input.userId,
    weekStartISO: input.weekStartISO,
    weekEndISO: input.weekEndISO,
    label: input.label,
    createdAtISO: timestamp,
    updatedAtISO: timestamp,
    days,
  };

  weeklyMenusStore.set(week.id, week);
  return week;
}

export function updateWeek(weekId: string, patch: UpdateWeekInput): WeeklyMenuWeek {
  const week = assertWeekExists(weekId);
  const next: WeeklyMenuWeek = {
    ...week,
    ...patch,
    updatedAtISO: nowISO(),
  };
  weeklyMenusStore.set(weekId, next);
  return next;
}

export function deleteWeek(weekId: string): { deleted: true } {
  assertWeekExists(weekId);
  weeklyMenusStore.delete(weekId);
  return { deleted: true };
}

export function createDay(weekId: string, input: CreateDayInput): WeeklyMenuDay {
  const week = assertWeekExists(weekId);
  const day: WeeklyMenuDay = {
    id: id("day"),
    dateISO: input.dateISO,
    notes: input.notes,
    recipes: [],
  };

  const next = touchWeek({
    ...week,
    days: [...week.days, day].sort((a, b) => a.dateISO.localeCompare(b.dateISO)),
  });

  return assertDayExists(next, day.id);
}

export function updateDay(weekId: string, dayId: string, patch: UpdateDayInput): WeeklyMenuDay {
  const week = assertWeekExists(weekId);

  const next = touchWeek({
    ...week,
    days: week.days.map((day) => (day.id === dayId ? { ...day, ...patch } : day)),
  });

  return assertDayExists(next, dayId);
}

export function deleteDay(weekId: string, dayId: string): { deleted: true } {
  const week = assertWeekExists(weekId);
  assertDayExists(week, dayId);

  touchWeek({
    ...week,
    days: week.days.filter((day) => day.id !== dayId),
  });

  return { deleted: true };
}

export function upsertDayRecipe(
  weekId: string,
  dayId: string,
  input: UpsertDayRecipeInput
): WeeklyMenuRecipeSlot {
  const week = assertWeekExists(weekId);
  const day = assertDayExists(week, dayId);

  const existing = day.recipes.find((recipe) => recipe.mealType === input.mealType);
  const nextSlot: WeeklyMenuRecipeSlot = existing
    ? {
        ...existing,
        recipeId: input.recipeId,
        recipeTitle: input.recipeTitle,
        servings: input.servings,
      }
    : {
        id: id("slot"),
        recipeId: input.recipeId,
        recipeTitle: input.recipeTitle,
        mealType: input.mealType,
        servings: input.servings,
      };

  const next = touchWeek({
    ...week,
    days: week.days.map((currentDay) => {
      if (currentDay.id !== dayId) return currentDay;
      const recipes = existing
        ? currentDay.recipes.map((recipe) => (recipe.mealType === input.mealType ? nextSlot : recipe))
        : [...currentDay.recipes, nextSlot];
      return { ...currentDay, recipes };
    }),
  });

  return assertDayExists(next, dayId).recipes.find((r) => r.mealType === input.mealType)!;
}

export function deleteDayRecipe(weekId: string, dayId: string, mealType: UpsertDayRecipeInput["mealType"]) {
  const week = assertWeekExists(weekId);
  assertDayExists(week, dayId);

  touchWeek({
    ...week,
    days: week.days.map((day) =>
      day.id === dayId ? { ...day, recipes: day.recipes.filter((recipe) => recipe.mealType !== mealType) } : day
    ),
  });

  return { deleted: true };
}

export function clearWeeklyMenusStore() {
  weeklyMenusStore.clear();
}
