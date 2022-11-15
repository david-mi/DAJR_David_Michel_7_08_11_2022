import "./styles/index.scss";
import "./resizeObserver.js";
import "./handlers.js";
import "./options/handlers.js";
import { createRecipeHtml } from "./create";
import { createOptionElement } from "./options/create";
import { displayRecipe } from "./display";
import { displayOptionListElements } from "./options/display";
import { recipesContainer, ingredientsListContainer, appliancesListContainer, ustensilsListContainer } from "./constants";
import { recipesData } from "./data/recipesData";

/**
 * - Reset {@link recipesContainer} html content
 * - Create each recipe html string and insert it to {@link recipesContainer}
 * @param {Recipe[]} recipes 
 */

export const createAndDisplayRecipes = (recipes) => {
  recipesContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const card = createRecipeHtml(recipe);
    displayRecipe(card);
  });
};

/**
 * Reset options lists data and html content
 */

const resetOptionsLists = () => {
  ingredientsListContainer.innerHTML = "";
  appliancesListContainer.innerHTML = "";
  ustensilsListContainer.innerHTML = "";

  recipesData.ingredients = new Set();
  recipesData.appliances = new Set();
  recipesData.ustensils = new Set();
};

/**
 * - Convert a Set of strings into array
 * - Sort array in alphabetical order
 * - Iterate through created array, create Element and insert it
 *  into {@link containerElement}
 * 
 * @param {Set<String>} set 
 * @param {HTMLElement} containerElement 
 */

const sortAndDisplayOptionsData = (set, containerElement) => {
  [...set]
    .sort()
    .forEach(element => {
      const optionElement = createOptionElement(element);
      displayOptionListElements(optionElement, containerElement);
    });
};

/**
 * Create and display every options for recipes
 * @param {Recipe} recipes 
 */

const createAndDisplayOptionsLists = (recipes) => {
  resetOptionsLists();

  recipes.forEach(({ ingredients, appliance, ustensils }) => {
    recipesData.appliances.add(appliance);

    ingredients.forEach(({ ingredient }) => {
      recipesData.ingredients.add(ingredient);
    });

    ustensils.forEach(ustensil => {
      recipesData.ustensils.add(ustensil);
    });
  });

  sortAndDisplayOptionsData(recipesData.ingredients, ingredientsListContainer);
  sortAndDisplayOptionsData(recipesData.appliances, appliancesListContainer);
  sortAndDisplayOptionsData(recipesData.ustensils, ustensilsListContainer);
};

createAndDisplayRecipes(recipesData.full);
createAndDisplayOptionsLists(recipesData.full);
