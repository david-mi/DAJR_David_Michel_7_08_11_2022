import "./data/types.js";
import { recipesData } from "./data/recipesData.js";
import { recipesContainer, ingredientsListContainer, appliancesListContainer, ustensilsListContainer } from "./constants";

/*****************************************/
/**************** RECIPES ****************/
/*****************************************/

/**
 * @param {Recipe} recipe 
 * @returns {string} Html string card structure for a recipe
 */

const createRecipeHtml = (recipe) => {
  const recipeIngredientsHtml = createRecipeIngredientsHtml(recipe.ingredients);
  return `
  <a href="#" class="recipe-link" title="${recipe.name}">
    <article class="recipe-card">
      <img class="recipe-picture" src="./assets/food.png" alt="${recipe.name}">
      <div class="recipe-top">
        <h2 class="recipe-title">${recipe.name}</h2>
        <img class="recipe-clock" src="./assets/icons/clock.svg" alt="icône de minuteur">
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

const createRecipeIngredientsHtml = (ingredients) => {
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


/**
 * - Reset {@link recipesContainer} html content
 * - Create each recipe html string and insert it to {@link recipesContainer}
 * @param {Recipe[]} recipes 
 */

export const createAndDisplayRecipes = (recipes) => {
  recipesContainer.innerHTML = "";

  if (recipes.length !== 0) {
    recipes.forEach(recipe => {
      const recipeCard = createRecipeHtml(recipe);
      recipesContainer.insertAdjacentHTML("beforeend", recipeCard);
    });
  } else {
    const emptyMessageWarning = recipesContainer.dataset.empty;
    const emptyListHtml = `<p>${emptyMessageWarning}</p>`;
    recipesContainer.insertAdjacentHTML("beforeend", emptyListHtml);
  }
};


/*****************************************/
/************ ADVANCED SEARCH ***********/
/*****************************************/


/**
 * Open or close targeted options input and list,
 * If opening, put focus to associated form input
 * 
 * @param {MouseEvent} currentTarget clicked drop down button
 */

export const toggleAdvancedSearchAttributes = (currentTarget) => {
  const chosenOption = currentTarget.dataset.option;
  currentTarget.toggleAttribute("data-display");

  const targetOptionElement = document.querySelector(`.option[data-option="${chosenOption}"] `);
  targetOptionElement.toggleAttribute("data-display");

  const elementsWhereToToggleDisplay = document.querySelectorAll(`.bg-fixed, [data-option="${chosenOption}"] :is(ul, h2, input)`);
  elementsWhereToToggleDisplay.forEach(element => {
    element.classList.toggle("display-none");
  });

  const optionButtonElement = document.querySelector(`[data-option="${chosenOption}"] .dropdown-btn`);
  optionButtonElement.classList.toggle("expand");
};


/*****************************************/
/************* OPTIONS LISTS *************/
/*****************************************/


/**
 * @param {string} option 
 * @returns {HTMLLIElement}
 */

export const createOptionListElement = (option) => {
  const liElement = document.createElement("li");
  liElement.innerText = option;

  liElement.addEventListener("click", () => {
    console.log("handle tag selection");
  });

  return liElement;
};


/**
 * - Convert a Set of strings into array
 * - Sort array in alphabetical order
 * - Iterate through created array, create Element and insert it
 *  into {@link containerElement}
 * 
 * @param {Set<String>} optionSet 
 * @param {HTMLUListElement} containerElement 
 */

export const createAndDisplaySortedOptionLists = (optionSet, listContainer) => {
  [...optionSet]
    .sort((a, b) => a.localeCompare(b))
    .forEach(element => {
      const optionElement = createOptionListElement(element);
      listContainer.insertAdjacentElement("beforeend", optionElement);
    });
};


/**
 * - Reset options lists data and html content
 * - Create and display every options for recipes
 * @param {Recipe} recipes 
 */

export const createAndDisplayOptionsLists = (recipes) => {
  ingredientsListContainer.innerHTML = "";
  appliancesListContainer.innerHTML = "";
  ustensilsListContainer.innerHTML = "";

  recipesData.ingredients = new Set();
  recipesData.appliances = new Set();
  recipesData.ustensils = new Set();

  recipes.forEach(({ ingredients, appliance, ustensils }) => {
    recipesData.appliances.add(appliance);

    ingredients.forEach(({ ingredient }) => {
      recipesData.ingredients.add(ingredient);
    });

    ustensils.forEach(ustensil => {
      recipesData.ustensils.add(ustensil);
    });
  });

  createAndDisplaySortedOptionLists(recipesData.ingredients, ingredientsListContainer);
  createAndDisplaySortedOptionLists(recipesData.appliances, appliancesListContainer);
  createAndDisplaySortedOptionLists(recipesData.ustensils, ustensilsListContainer);
};


/*****************************************/
/************* OPTIONS INPUTS ************/
/*****************************************/


/**
 * - If input is displayed, put focus on it
 * - If not, reset it's value
 * 
 * @param {HTMLButtonElement} currentTarget
 */

export function handleOptionDisplayInput(currentTarget) {
  const chosenOption = currentTarget.dataset.option;

  const optionInputElement = document.querySelector(`[data-option="${chosenOption}"] input`);
  if (optionInputElement.classList.contains("display-none")) {
    optionInputElement.value = "";
    const inputEvent = new Event("input");
    optionInputElement.dispatchEvent(inputEvent);
  } else {
    optionInputElement.focus();
  }
}


