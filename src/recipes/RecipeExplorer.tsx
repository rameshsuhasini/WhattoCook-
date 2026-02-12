import React, { useEffect, useMemo, useRef, useState } from "react";
import "./RecipeExplorer.css";
import { AuthControls } from "../auth";

export type RecipeDietTag = "vegan" | "vegetarian" | "gluten-free" | "dairy-free" | "high-protein";

export type RecipeItem = {
  id: string;
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  calories: number;
  country?: string;
  cuisine?: string;
  dietaryTags?: RecipeDietTag[];
  description?: string;
  ingredients: string[];
  steps?: string[];
};

export type RecipeExplorerFilters = {
  search: string;
  countryOrCuisine: string;
  dietaryTags: RecipeDietTag[];
};

export type RecipeExplorerProps = {
  recipes: RecipeItem[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  onAddToGroceryList?: (recipe: RecipeItem) => void;
  availableCountriesOrCuisines?: string[];
  availableDietaryTags?: RecipeDietTag[];
  title?: string;
  showAuthControls?: boolean;
  authRedirectTo?: string;
};

const DEFAULT_TAGS: RecipeDietTag[] = ["vegan", "vegetarian", "gluten-free", "dairy-free", "high-protein"];

export function RecipeExplorer({
  recipes,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  onAddToGroceryList,
  availableCountriesOrCuisines,
  availableDietaryTags = DEFAULT_TAGS,
  title = "Recipe Explorer",
  showAuthControls = true,
  authRedirectTo,
}: RecipeExplorerProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState<RecipeExplorerFilters>({
    search: "",
    countryOrCuisine: "all",
    dietaryTags: [],
  });
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const countryCuisineOptions = useMemo(() => {
    if (availableCountriesOrCuisines?.length) return availableCountriesOrCuisines;
    return Array.from(
      new Set(recipes.flatMap((recipe) => [recipe.country, recipe.cuisine].filter(Boolean) as string[]))
    ).sort((a, b) => a.localeCompare(b));
  }, [recipes, availableCountriesOrCuisines]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const search = filters.search.trim().toLowerCase();
      const searchable = `${recipe.title} ${recipe.cuisine ?? ""} ${recipe.country ?? ""} ${
        recipe.description ?? ""
      }`.toLowerCase();
      const searchMatch = !search || searchable.includes(search);

      const cc = filters.countryOrCuisine;
      const ccMatch =
        cc === "all" ||
        recipe.cuisine?.toLowerCase() === cc.toLowerCase() ||
        recipe.country?.toLowerCase() === cc.toLowerCase();

      const tags = filters.dietaryTags;
      const tagsMatch =
        !tags.length || tags.every((tag) => (recipe.dietaryTags ?? []).map((t) => t.toLowerCase()).includes(tag));

      return searchMatch && ccMatch && tagsMatch;
    });
  }, [recipes, filters]);

  const selectedRecipe = useMemo(
    () => filteredRecipes.find((recipe) => recipe.id === selectedRecipeId) ?? null,
    [filteredRecipes, selectedRecipeId]
  );

  useEffect(() => {
    if (!hasMore || !onLoadMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore) onLoadMore();
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore, isLoadingMore]);

  function toggleTag(tag: RecipeDietTag) {
    setFilters((prev) => ({
      ...prev,
      dietaryTags: prev.dietaryTags.includes(tag)
        ? prev.dietaryTags.filter((t) => t !== tag)
        : [...prev.dietaryTags, tag],
    }));
  }

  return (
    <>
      {showAuthControls && <AuthControls redirectTo={authRedirectTo} />}
      <section className="wtc-recipe-explorer" aria-label="Recipe explorer">
      <header className="wtc-recipe-header">
        <h1>{title}</h1>
      </header>

      <div className="wtc-filter-bar" role="search">
        <input
          type="search"
          className="wtc-filter-search"
          value={filters.search}
          onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
          placeholder="Search recipe, ingredient, cuisine"
          aria-label="Search recipes"
        />

        <select
          className="wtc-filter-select"
          value={filters.countryOrCuisine}
          onChange={(event) => setFilters((prev) => ({ ...prev, countryOrCuisine: event.target.value }))}
          aria-label="Filter by country or cuisine"
        >
          <option value="all">All countries/cuisines</option>
          {countryCuisineOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="wtc-tag-row" aria-label="Filter by dietary tags">
          {availableDietaryTags.map((tag) => {
            const active = filters.dietaryTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                className={`wtc-tag-chip ${active ? "active" : ""}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <p className="wtc-results-count">{filteredRecipes.length} recipes</p>

      <ul className="wtc-recipe-grid" role="list">
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <button
              type="button"
              className="wtc-recipe-card"
              onClick={() => setSelectedRecipeId(recipe.id)}
              aria-label={`Open details for ${recipe.title}`}
            >
              <div className="wtc-recipe-image-wrap">
                {recipe.imageUrl ? (
                  <img src={recipe.imageUrl} alt={recipe.imageAlt ?? recipe.title} className="wtc-recipe-image" loading="lazy" />
                ) : (
                  <div className="wtc-recipe-placeholder" aria-hidden="true">
                    🍳
                  </div>
                )}
              </div>
              <div className="wtc-recipe-card-body">
                <h2>{recipe.title}</h2>
                <p>{recipe.calories} kcal</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className="wtc-pager">
        {hasMore && (
          <button type="button" className="wtc-load-more" onClick={onLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? "Loading more..." : "Load more recipes"}
          </button>
        )}
        <div ref={sentinelRef} aria-hidden="true" />
      </div>

      {selectedRecipe && (
        <div className="wtc-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="recipe-modal-title">
          <article className="wtc-modal">
            <button
              type="button"
              className="wtc-close-btn"
              onClick={() => setSelectedRecipeId(null)}
              aria-label="Close recipe details"
            >
              ✕
            </button>

            <h3 id="recipe-modal-title">{selectedRecipe.title}</h3>
            <p className="wtc-modal-subtitle">
              {selectedRecipe.cuisine ?? selectedRecipe.country ?? "Global"} · {selectedRecipe.calories} kcal
            </p>
            {selectedRecipe.description && <p className="wtc-modal-description">{selectedRecipe.description}</p>}

            <section aria-label="Ingredients">
              <h4>Ingredients</h4>
              <ul className="wtc-ingredients-list">
                {selectedRecipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>

            {!!selectedRecipe.steps?.length && (
              <section aria-label="Recipe steps">
                <h4>How to cook</h4>
                <ol className="wtc-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <li key={`${selectedRecipe.id}-step-${index}`}>{step}</li>
                  ))}
                </ol>
              </section>
            )}

            <button
              type="button"
              className="wtc-add-grocery-btn"
              onClick={() => onAddToGroceryList?.(selectedRecipe)}
            >
              Add to Grocery List
            </button>
          </article>
        </div>
      )}
    </section>
    </>
  );
}

export default RecipeExplorer;
