import "./data/types.js";

/**
 * @param {Recipe} recipe 
 * @returns {string} Html string card structure for a recipe
 */

export const createRecipeCard = (recipe) => {
  const recipeIngredientsHtml = createIngredientsHtml(recipe.ingredients);
  return `
  <a href="#" class="recipe-link" title="${recipe.name}">
    <article class="recipe-card">
      <img class="recipe-picture" src="./assets/food.png">
      <div class="recipe-top">
        <h2 class="recipe-title">${recipe.name}</h2>
        <img class="recipe-clock" src="./assets/icons/clock.svg">
        <h3 class="recipe-duration">${recipe.time}min</h3>
      </div>
      <ul class="recipe-ingredients">${recipeIngredientsHtml}</ul>
      <p class="recipe-instructions">${recipe.description}</p>
    </article>
  </a>
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