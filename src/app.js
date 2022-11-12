import "./styles/index.scss";
import "./handlers.js";
import { createRecipeCard } from "./create";
import { displayRecipe } from "./display";
import { recipesContainer } from "./constants";
import { recipesData } from "./data/data";

/**
 * - Reset {@link recipesContainer} html content
 * - Create each recipe html string and insert it to {@link recipesContainer}
 * @param {Recipe[]} recipes 
 */

export const createAndDisplayRecipes = (recipes) => {
  recipesContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    displayRecipe(card);
  });
};

createAndDisplayRecipes(recipesData.full);
