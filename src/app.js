import "./styles/index.scss";
import "./handlers.js";
import { createRecipeCard, createOptionContent } from "./create";
import { displayRecipe, displayOptionsListsContent } from "./display";
import { recipesContainer } from "./constants";
import { recipesData } from "./data/recipesData";

const ingredientsListContainer = document.querySelector(".ingredients ul");
const applianceListContainer = document.querySelector(".appliance ul");
const ustensilsListContainer = document.querySelector(".ustensils ul");

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

/**
 * Reset options lists data and html content
 */

const resetOptionsLists = () => {
  ingredientsListContainer.innerHTML = "";
  applianceListContainer.innerHTML = "";
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

const sortAndDisplaySetData = (set, containerElement) => {
  [...set]
    .sort()
    .forEach(element => {
      const optionElement = createOptionContent(element);
      displayOptionsListsContent(optionElement, containerElement);
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

  sortAndDisplaySetData(recipesData.ingredients, ingredientsListContainer);
  sortAndDisplaySetData(recipesData.appliances, applianceListContainer);
  sortAndDisplaySetData(recipesData.ustensils, ustensilsListContainer);
};

createAndDisplayRecipes(recipesData.full);
createAndDisplayOptionsLists(recipesData.full);
