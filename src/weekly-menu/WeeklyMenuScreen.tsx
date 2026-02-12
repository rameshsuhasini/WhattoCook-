import React, { useEffect, useMemo, useState } from "react";
import "./WeeklyMenuScreen.css";
import { AuthControls } from "../auth";

export type MealSlot = {
  mealType: "breakfast" | "lunch" | "dinner";
  recipeId?: string;
  recipeTitle: string;
};

export type WeekDayPlan = {
  id: string;
  dateISO: string;
  label: string;
  meals: MealSlot[];
};

export type RecipeSearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  cookTime?: string;
};

export type WeeklyMenuWeekData = {
  weekLabel: string;
  days: WeekDayPlan[];
};

export type WeeklyMenuScreenProps = {
  weekData: WeeklyMenuWeekData;
  onWeekNavigate?: (direction: "prev" | "next") => void;
  onWeekDataChange?: (nextWeekData: WeeklyMenuWeekData) => void;
  searchRecipes: (query: string) => Promise<RecipeSearchResult[]>;
  showAuthControls?: boolean;
  authRedirectTo?: string;
};

export function WeeklyMenuScreen({
  weekData,
  onWeekNavigate,
  onWeekDataChange,
  searchRecipes,
  showAuthControls = true,
  authRedirectTo,
}: WeeklyMenuScreenProps) {
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RecipeSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const activeDay = useMemo(
    () => weekData.days.find((day) => day.id === activeDayId) ?? null,
    [weekData.days, activeDayId]
  );

  useEffect(() => {
    if (!activeDayId) return;

    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      setResults([]);
      setSearchError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setSearchError(null);
        const nextResults = await searchRecipes(normalizedQuery);
        if (!cancelled) setResults(nextResults);
      } catch {
        if (!cancelled) {
          setSearchError("Could not load recipes. Please try again.");
          setResults([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [activeDayId, query, searchRecipes]);

  function closeModal() {
    setActiveDayId(null);
    setQuery("");
    setResults([]);
    setSearchError(null);
    setIsLoading(false);
  }

  function applyRecipeToDay(recipe: RecipeSearchResult) {
    if (!activeDay) return;

    const nextDays = weekData.days.map((day) => {
      if (day.id !== activeDay.id) return day;

      if (!day.meals.length) {
        return {
          ...day,
          meals: [{ mealType: "dinner", recipeId: recipe.id, recipeTitle: recipe.title }],
        };
      }

      const hasDinner = day.meals.some((meal) => meal.mealType === "dinner");
      if (hasDinner) {
        return {
          ...day,
          meals: day.meals.map((meal) =>
            meal.mealType === "dinner"
              ? { ...meal, recipeId: recipe.id, recipeTitle: recipe.title }
              : meal
          ),
        };
      }

      return {
        ...day,
        meals: [...day.meals, { mealType: "dinner", recipeId: recipe.id, recipeTitle: recipe.title }],
      };
    });

    onWeekDataChange?.({ ...weekData, days: nextDays });
    closeModal();
  }

  return (
    <>
      {showAuthControls && <AuthControls redirectTo={authRedirectTo} />}
      <section className="wtc-weekly-menu" aria-label="Weekly menu">
      <header className="wtc-weekly-menu-header">
        <button className="wtc-week-nav-btn" type="button" onClick={() => onWeekNavigate?.("prev")}>
          ← Previous
        </button>
        <h1>{weekData.weekLabel}</h1>
        <button className="wtc-week-nav-btn" type="button" onClick={() => onWeekNavigate?.("next")}>
          Next →
        </button>
      </header>

      <div className="wtc-day-grid" role="list" aria-label="Week days">
        {weekData.days.map((day) => (
          <button
            key={day.id}
            className="wtc-day-card"
            type="button"
            role="listitem"
            onClick={() => setActiveDayId(day.id)}
            aria-label={`Edit meals for ${day.label}`}
          >
            <div className="wtc-day-card-top">
              <h2>{day.label}</h2>
              <span>{new Date(day.dateISO).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
            </div>
            <ul className="wtc-day-meals" aria-label={`${day.label} planned meals`}>
              {day.meals.length ? (
                day.meals.map((meal) => (
                  <li key={`${day.id}-${meal.mealType}`}>
                    <span className="wtc-meal-type">{meal.mealType}</span>
                    <span className="wtc-meal-title">{meal.recipeTitle}</span>
                  </li>
                ))
              ) : (
                <li className="wtc-empty-day">No meals planned yet</li>
              )}
            </ul>
          </button>
        ))}
      </div>

      {activeDay && (
        <div className="wtc-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="edit-day-title">
          <div className="wtc-modal">
            <div className="wtc-modal-header">
              <h3 id="edit-day-title">Edit {activeDay.label}</h3>
              <button type="button" className="wtc-close-btn" onClick={closeModal} aria-label="Close edit day modal">
                ✕
              </button>
            </div>

            <label className="wtc-search-label" htmlFor="recipe-search-input">
              Find a recipe
            </label>
            <input
              id="recipe-search-input"
              className="wtc-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by recipe, cuisine, or ingredient"
              autoFocus
            />

            <div className="wtc-search-results" aria-live="polite">
              {isLoading && <p className="wtc-search-note">Searching recipes…</p>}
              {searchError && <p className="wtc-search-error">{searchError}</p>}
              {!isLoading && !searchError && query.trim() && !results.length && (
                <p className="wtc-search-note">No matching recipes found.</p>
              )}

              <ul className="wtc-results-list" role="listbox" aria-label="Recipe search results">
                {results.map((recipe) => (
                  <li key={recipe.id}>
                    <button
                      type="button"
                      className="wtc-result-card"
                      onClick={() => applyRecipeToDay(recipe)}
                      aria-label={`Select ${recipe.title} for ${activeDay.label}`}
                    >
                      <strong>{recipe.title}</strong>
                      <span>{recipe.subtitle}</span>
                      {recipe.cookTime && <em>{recipe.cookTime}</em>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
}

export default WeeklyMenuScreen;
