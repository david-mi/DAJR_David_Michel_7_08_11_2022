import "./styles/index.scss";
import { getApiData } from "./api.js";
import { createRecipeCard } from "./create";
import { displayRecipeToDom } from "./display";
import { recipesContainer } from "./constants";

/**
 * - Reset {@link recipesContainer} html content
 * - Create each recipe html string and insert it to {@link recipesContainer}
 * @param {Recipe[]} recipes 
 */

const createAndDisplayRecipes = (recipes) => {
  recipesContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    displayRecipeToDom(card);
    console.log(card);
  });
};

(async () => {
  const recipes = await getApiData();
  createAndDisplayRecipes(recipes);
})();
