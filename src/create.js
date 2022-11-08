import "./types.js";

/**
 * @param {Recipe} recipe 
 * @returns {string} Html string card structure for a recipe
 */

export const createRecipeCard = (recipe) => {
  const recipeIngredientsHtml = createIngredientsHtml(recipe.ingredients);
  return `
  <article class="recipe-card">
    <h2 class="recipe-title">${recipe.name}</h2>
    <h3 class="recipe-duration">${recipe.time}min</h3>
    <ul class="recipe-ingredients">${recipeIngredientsHtml}</ul>
    <p class="recipe-instructions">${recipe.description}</p>
  </article>
  `;
};

/**
 * @param {Ingredient[]} ingredients 
 * @return {string} Html li strings with ingredients infos for a recipe
 */

const createIngredientsHtml = (ingredients) => {
  return ingredients.reduce((str, { ingredient, quantity, unit }) => {
    const separator = quantity || unit ? ":" : "";
    return str += `
    <li>
      <span class="ingredient-name">${ingredient}</span>
      ${separator}
      ${quantity ? quantity : ""}
      ${unit ? unit : ""}
    </li>
    `;
  }, "");
};