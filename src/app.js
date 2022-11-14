import "./styles/index.scss";
import "./handlers.js";
import { createRecipeCard, createOptionContent } from "./create";
import { displayRecipe, displayOptionsListsContent } from "./display";
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

const createAndDisplayOptionsLists = (recipes) => {
  recipes.forEach(recipe => {
    recipesData.appliances[recipe.appliance] = recipe.appliance;

    recipe.ingredients.forEach(({ ingredient }) => {
      recipesData.ingredients[ingredient] = ingredient;
    });

    recipe.ustensils.forEach(ustensil => {
      recipesData.ustensils[ustensil] = ustensil;
    });
  });

  for (const key in recipesData.ingredients) {
    const ingredientElement = createOptionContent(recipesData.ingredients[key]);
    displayOptionsListsContent(ingredientElement, ingredientsListContainer);
  }

  for (const key in recipesData.appliances) {
    const applianceElement = createOptionContent(recipesData.appliances[key]);
    displayOptionsListsContent(applianceElement, applianceListContainer);
  }

  for (const key in recipesData.ustensils) {
    const ustensilElement = createOptionContent(recipesData.ustensils[key]);
    displayOptionsListsContent(ustensilElement, ustensilsListContainer);
  }
};

createAndDisplayRecipes(recipesData.full);
createAndDisplayOptionsLists(recipesData.full);
