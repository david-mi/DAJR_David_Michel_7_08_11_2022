import { recipesContainer } from "./constants";

/**
 * Insert recipe html to {@link recipesContainer}
 * 
 * @param {string} recipeHtml
 */

export const displayRecipeToDom = (recipeHtml) => {
  recipesContainer?.insertAdjacentHTML("beforeend", recipeHtml);
};