import React from "react";
import "./HomeScreen.css";
import { AuthControls } from "../auth";

export type FeaturedRecipe = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  cuisine?: string;
  cookTime?: string;
  href?: string;
};

export type HomeScreenProps = {
  appName?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBackgroundImageUrl?: string;
  heroBackgroundImageAlt?: string;
  planningCtaLabel?: string;
  recipesCtaLabel?: string;
  onPlanningCtaClick?: () => void;
  onRecipesCtaClick?: () => void;
  featuredTitle?: string;
  featuredRecipes?: FeaturedRecipe[];
  showAuthControls?: boolean;
  authRedirectTo?: string;
};

const DEFAULT_RECIPES: FeaturedRecipe[] = [
  {
    id: "1",
    title: "Mediterranean Chickpea Bowl",
    description: "Bright herbs, lemon, and roasted vegetables for a quick weeknight meal.",
    cuisine: "Mediterranean",
    cookTime: "25 min",
  },
  {
    id: "2",
    title: "Thai Coconut Curry Noodles",
    description: "Creamy coconut curry with crisp vegetables and aromatic basil.",
    cuisine: "Thai",
    cookTime: "30 min",
  },
  {
    id: "3",
    title: "Mexican Street Corn Tacos",
    description: "Charred corn, lime crema, and avocado in soft tortillas.",
    cuisine: "Mexican",
    cookTime: "20 min",
  },
];

export function HomeScreen({
  appName = "WhatToCook?",
  heroTitle = "Plan delightful meals in minutes",
  heroDescription = "Build your week, discover recipes from around the world, and generate grocery lists instantly.",
  heroBackgroundImageUrl,
  heroBackgroundImageAlt = "Fresh ingredients on a kitchen counter",
  planningCtaLabel = "Start Weekly Planning",
  recipesCtaLabel = "Search Recipes",
  onPlanningCtaClick,
  onRecipesCtaClick,
  featuredTitle = "Featured Recipes",
  featuredRecipes = DEFAULT_RECIPES,
  showAuthControls = true,
  authRedirectTo,
}: HomeScreenProps) {
  return (
    <>
      {showAuthControls && <AuthControls redirectTo={authRedirectTo} />}
      <div className="wtc-home-screen">
      <section
        className="wtc-home-hero"
        style={
          heroBackgroundImageUrl
            ? {
                backgroundImage: `linear-gradient(120deg, rgba(42,33,27,0.72), rgba(230,92,58,0.45)), url(${heroBackgroundImageUrl})`,
              }
            : undefined
        }
        aria-label={heroBackgroundImageAlt}
      >
        <div className="wtc-home-hero-content">
          <p className="wtc-home-kicker">{appName}</p>
          <h1>{heroTitle}</h1>
          <p className="wtc-home-hero-description">{heroDescription}</p>
          <div className="wtc-home-hero-actions">
            <button type="button" className="wtc-home-btn wtc-home-btn-primary" onClick={onPlanningCtaClick}>
              {planningCtaLabel}
            </button>
            <button type="button" className="wtc-home-btn wtc-home-btn-secondary" onClick={onRecipesCtaClick}>
              {recipesCtaLabel}
            </button>
          </div>
        </div>
      </section>

      <section className="wtc-featured-recipes" aria-labelledby="featured-recipes-heading">
        <div className="wtc-featured-header">
          <h2 id="featured-recipes-heading">{featuredTitle}</h2>
          <p>Handpicked global flavors to inspire your week.</p>
        </div>

        <ul className="wtc-recipe-grid" role="list">
          {featuredRecipes.map((recipe) => {
            const content = (
              <>
                <div className="wtc-recipe-image-wrap">
                  {recipe.imageUrl ? (
                    <img
                      className="wtc-recipe-image"
                      src={recipe.imageUrl}
                      alt={recipe.imageAlt ?? recipe.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="wtc-recipe-image-placeholder" aria-hidden="true">
                      🍽️
                    </div>
                  )}
                </div>
                <div className="wtc-recipe-body">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <div className="wtc-recipe-meta" aria-label="Recipe details">
                    {recipe.cuisine && <span>{recipe.cuisine}</span>}
                    {recipe.cookTime && <span>{recipe.cookTime}</span>}
                  </div>
                </div>
              </>
            );

            return (
              <li key={recipe.id} className="wtc-recipe-card">
                {recipe.href ? (
                  <a className="wtc-recipe-link" href={recipe.href} aria-label={`View recipe: ${recipe.title}`}>
                    {content}
                  </a>
                ) : (
                  <article aria-label={recipe.title}>{content}</article>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
    </>
  );
}

export default HomeScreen;
