import { MOCK_RECIPES } from "./mockData";
import {
  RecipeDetailsResponse,
  RecipeSummary,
  SearchRecipesQuery,
  SearchRecipesResponse,
} from "./types";

function toSummary(recipe: (typeof MOCK_RECIPES)[number]): RecipeSummary {
  const { id, title, cuisine, country, calories, dietaryTags } = recipe;
  return { id, title, cuisine, country, calories, dietaryTags };
}

export async function searchRecipes(query: SearchRecipesQuery): Promise<SearchRecipesResponse> {
  const {
    q,
    cuisine,
    minCalories,
    maxCalories,
    dietaryTags = [],
    page = 1,
    pageSize = 12,
  } = query;

  const normalizedText = q?.trim().toLowerCase();
  const normalizedCuisine = cuisine?.trim().toLowerCase();

  const filtered = MOCK_RECIPES.filter((recipe) => {
    const textMatch =
      !normalizedText ||
      `${recipe.title} ${recipe.description} ${recipe.cuisine} ${recipe.country ?? ""}`
        .toLowerCase()
        .includes(normalizedText);

    const cuisineMatch = !normalizedCuisine || recipe.cuisine.toLowerCase() === normalizedCuisine;

    const minMatch = minCalories === undefined || recipe.calories >= minCalories;
    const maxMatch = maxCalories === undefined || recipe.calories <= maxCalories;

    const tagsMatch =
      !dietaryTags.length || dietaryTags.every((tag) => recipe.dietaryTags.includes(tag));

    return textMatch && cuisineMatch && minMatch && maxMatch && tagsMatch;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageData = filtered.slice(start, end).map(toSummary);

  return {
    data: pageData,
    page,
    pageSize,
    total,
    hasMore: end < total,
  };
}

export async function getRecipeDetails(recipeId: string): Promise<RecipeDetailsResponse> {
  const recipe = MOCK_RECIPES.find((item) => item.id === recipeId);

  if (!recipe) {
    throw new Error(`Recipe not found for id: ${recipeId}`);
  }

  return { data: recipe };
}

/**
 * Mock HTTP handlers (framework-agnostic shape)
 * You can adapt these return values directly in Next.js route handlers, Express, Fastify, etc.
 */
export const recipeMockHandlers = {
  async search(reqQuery: SearchRecipesQuery) {
    return {
      status: 200,
      body: await searchRecipes(reqQuery),
    };
  },

  async details(recipeId: string) {
    try {
      return {
        status: 200,
        body: await getRecipeDetails(recipeId),
      };
    } catch (error) {
      return {
        status: 404,
        body: { error: error instanceof Error ? error.message : "Not found" },
      };
    }
  },
};
