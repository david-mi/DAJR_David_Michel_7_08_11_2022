import "./data/types.js";
import { recipesData } from "./data/recipesData.js";
import { recipesContainer, ingredientsListContainer, appliancesListContainer, ustensilsListContainer } from "./constants";
import { handleOptionListClick, handleTagClick } from "./handlers.js";

const openOptionEvent = new Event("openoption");
const closeOptionEvent = new Event("closeoption");


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

export const createAndDisplaySortedRecipes = (recipes) => {
  recipes.sort((a, b) => a.name.localeCompare(b.name));
  recipesContainer.innerHTML = "";

  if (recipes.length !== 0) {
    recipes.forEach(recipe => {
      const recipeCard = createRecipeHtml(recipe);
      recipesContainer.insertAdjacentHTML("beforeend", recipeCard);
    });
  } else {
    createAndDisplayEmptyDataWarning(recipesContainer);
  }
};


/*****************************************/
/************ ADVANCED SEARCH ***********/
/*****************************************/


/**
 * Open or close targeted options input and list,
 * - If a menu was already open, close it
 * - If opening, put focus to associated form input
 * 
 * @param {MouseEvent} currentTarget clicked drop down button
 */

export const toggleAdvancedSearchAttributes = ({ currentTarget }) => {
  const currentOpenedOptionButton = document.querySelector(".option[data-display] .dropdown-btn");
  if (currentOpenedOptionButton !== null && currentOpenedOptionButton !== currentTarget) {
    toggleAdvancedSearchAttributes({ currentTarget: currentOpenedOptionButton });
  }

  const chosenOption = currentTarget.dataset.option;
  const targetOptionElement = document.querySelector(`.option[data-option="${chosenOption}"] `);
  targetOptionElement.toggleAttribute("data-display");

  const elementsWhereToToggleDisplay = document.querySelectorAll(
    `.bg-fixed,
     [data-option="${chosenOption}"] :is(ul, h2, input)`
  );
  elementsWhereToToggleDisplay.forEach(element => {
    element.classList.toggle("display-none");
  });

  if (targetOptionElement.dataset.display === undefined) {
    targetOptionElement.dispatchEvent(closeOptionEvent);
  } else {
    targetOptionElement.dispatchEvent(openOptionEvent);
  }
};


/*****************************************/
/***************** TAGS ******************/
/*****************************************/


/**
 * Create tag button element
 * 
 * @param {string} tagName name of tha tag
 * @param {"ingredients" | "appliances" | "ustensils"} targetOption option targeted
 */

export const createTagButton = (tagName, targetOption) => {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("tag");
  buttonElement.dataset.option = targetOption;
  buttonElement.addEventListener("click", handleTagClick);

  const buttonHtmlContent = `
    <span>${tagName}</span>
    <img src="./assets/icons/close.svg" alt="icône qui représente une croix">
  `;
  buttonElement.insertAdjacentHTML("beforeend", buttonHtmlContent);

  return buttonElement;
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
  liElement.tabIndex = "0";

  liElement.addEventListener("click", handleOptionListClick);

  return liElement;
};


/**
 * If an option list is open, add negative tabIndex on any other element, except displayed options and tags
 * If no options list are open, remove every negative tabIndex
 */

export const handleTrapFocusOnOption = () => {
  const isOptionOpened = document.querySelector(".option[data-display]");

  if (isOptionOpened) {
    addTrapFocusOnOption();
  } else {
    removeTrapFocusOnOption();
  }
};



/**
 * Add negative tabIndex on any other element, except displayed options and tags
 */

function addTrapFocusOnOption() {
  const focusableElementsOustideOption = document.querySelectorAll(
    `input:not([data-display] input),
   button:not([data-display] button, button.tag),
   a`
  );
  focusableElementsOustideOption.forEach(element => {
    element.tabIndex = "-1";
  });
}

/**
 * Remove tabIndex attribute on every elements who had it set to -1
 */

function removeTrapFocusOnOption() {
  const elementsWithTabIndex = document.querySelectorAll("[tabIndex='-1']");
  elementsWithTabIndex.forEach(element => {
    element.removeAttribute("tabIndex");
  });
}


/**
 * - Sort array in alphabetical order
 * - Iterate through array, create Element and insert them
 *  into {@link containerElement}
 * 
 * @param {string} option
 * @param {HTMLUListElement} optionListContainer 
 */

export const createAndDisplaySortedOptionLists = (option, optionListContainer) => {
  const optionArray = recipesData[option];
  if (optionArray.length === 0) {
    createAndDisplayEmptyDataWarning(optionListContainer);
  } else {
    optionArray
      .sort((a, b) => a.localeCompare(b))
      .forEach(element => {
        const optionElement = createOptionListElement(element);
        optionListContainer.insertAdjacentElement("beforeend", optionElement);
      });
  }
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

  recipesData.ingredients = [];
  recipesData.appliances = [];
  recipesData.ustensils = [];

  recipes.forEach(({ ingredients, appliance, ustensils }) => {
    if (recipesData.tags.appliances.indexOf(appliance) === -1) {
      recipesData.appliances.push(appliance);
    }

    ingredients.forEach(({ ingredient }) => {
      if (recipesData.tags.ingredients.indexOf(ingredient) === -1) {
        recipesData.ingredients.push(ingredient);
      }
    });

    ustensils.forEach(ustensil => {
      if (recipesData.tags.ustensils.indexOf(ustensil) === -1) {
        recipesData.ustensils.push(ustensil);
      }
    });
  });

  recipesData.appliances = [...new Set(recipesData.appliances)];
  recipesData.ingredients = [...new Set(recipesData.ingredients)];
  recipesData.ustensils = [...new Set(recipesData.ustensils)];

  createAndDisplaySortedOptionLists("ingredients", ingredientsListContainer);
  createAndDisplaySortedOptionLists("appliances", appliancesListContainer);
  createAndDisplaySortedOptionLists("ustensils", ustensilsListContainer);
};

/**
 * Create and display html to warn about empty data
 * 
 * @param {HTMLElement} element element who contains data-empty attribute
 */

export const createAndDisplayEmptyDataWarning = (element) => {
  const emptyMessageWarning = element.dataset.empty;
  const emptyListHtml = `<p>${emptyMessageWarning}</p>`;
  element.insertAdjacentHTML("beforeend", emptyListHtml);
};