import "./styles/index.scss";
import { createRecipeCard } from "./create";
import { displayRecipeToDom } from "./display";
import { recipesContainer } from "./constants";
import { recipes } from "./data/recipes";

/**
 * - Reset {@link recipesContainer} html content
 * - Create each recipe html string and insert it to {@link recipesContainer}
 * @param {recipes} recipes 
 */

const createAndDisplayRecipes = (recipes) => {
  recipesContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    displayRecipeToDom(card);
    console.log(card);
  });
};

createAndDisplayRecipes(recipes);
