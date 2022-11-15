import { recipesContainer } from "./constants";

/**
 * Insert recipe html to {@link recipesContainer}
 * 
 * @param {string} recipeHtml
 */

export const displayRecipe = (recipeHtml) => {
  recipesContainer.insertAdjacentHTML("beforeend", recipeHtml);
};