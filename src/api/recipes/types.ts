export type RecipeDietTag = "vegan" | "vegetarian" | "gluten-free" | "dairy-free" | "high-protein";

export type RecipeSummary = {
  id: string;
  title: string;
  cuisine: string;
  country?: string;
  calories: number;
  dietaryTags: RecipeDietTag[];
  imageUrl?: string;
};

export type RecipeDetails = RecipeSummary & {
  description: string;
  ingredients: string[];
  steps: string[];
  cookTimeMinutes: number;
  servings: number;
};

export type SearchRecipesQuery = {
  q?: string;
  cuisine?: string;
  minCalories?: number;
  maxCalories?: number;
  dietaryTags?: RecipeDietTag[];
  page?: number;
  pageSize?: number;
};

export type SearchRecipesResponse = {
  data: RecipeSummary[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
};

export type RecipeDetailsResponse = {
  data: RecipeDetails;
};
