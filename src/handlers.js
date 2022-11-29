import { filterAndSortOptions, filterRecipes, filterRecipesByTag, filterRecipesByTags } from "./filter";
import { recipesData } from "./data/recipesData";
import {
  toggleAdvancedSearchAttributes,
  createOptionListElement,
  createAndDisplaySortedRecipes,
  createAndDisplayOptionsLists,
  handleTrapFocusOnOption,
  createTagButton,
  createAndDisplayEmptyDataWarning
} from "./view.js";
import { formatString } from "./utils.js";

let previousInput = "";
const tagsContainer = document.querySelector(".tags");

const mainSearchInput = document.querySelector("input");
mainSearchInput.addEventListener("input", handleMainSearchInput);

const mainForm = document.querySelector("form");
mainForm.addEventListener("submit", handleMainFormSubmit);

const backgroundHideOptions = document.querySelector(".bg-fixed");
backgroundHideOptions.addEventListener("click", triggerClickOnActiveDropdownButton);

const optionsDropdownButtons = document.querySelectorAll(".dropdown-btn");
optionsDropdownButtons.forEach(button => {
  button.addEventListener("click", toggleAdvancedSearchAttributes);
});

const optionsForms = document.querySelectorAll(".option form");
optionsForms.forEach(optionsForm => {
  optionsForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

const optionsInputs = document.querySelectorAll(".option input");
optionsInputs.forEach(optionInput => {
  optionInput.addEventListener("input", handleSearchOptionInput);
});

const optionsElements = document.querySelectorAll(".option");
optionsElements.forEach(optionElement => {
  optionElement.addEventListener("closeoption", handleCloseOption);
  optionElement.addEventListener("openoption", handleOpenOption);
});

/*****************************************/
/********** MAIN SEARCH INPUT ************/
/*****************************************/


/**
 * Handle user input, then filter and display recipes
 */

function handleMainSearchInput() {
  const userInput = formatString(mainSearchInput.value).trim();

  if (userInput.length < 3) {
    if (recipesData.filtered.length === recipesData.recipes.length) {
      return;
    } else {
      recipesData.filtered = recipesData.recipes;
    }
  } else if (userInput.startsWith(previousInput)) {
    recipesData.filtered = filterRecipes(userInput, recipesData.filtered);
  } else {
    recipesData.filtered = filterRecipes(userInput, recipesData.recipes);
  }

  for (const tagOption in recipesData.tags) {
    if (recipesData.tags[tagOption].length > 0) {
      recipesData.filtered = filterRecipesByTags(tagOption, recipesData.filtered);
    }
  }

  createAndDisplaySortedRecipes(recipesData.filtered);
  createAndDisplayOptionsLists(recipesData.filtered);
  previousInput = userInput;
}


function handleMainFormSubmit(event) {
  event.preventDefault();
  handleMainSearchInput();
}


/*****************************************/
/***************** TAGS ******************/
/*****************************************/


/**
 * Gets called when user is clicking on an option from a displayed list
 * 
 * - Clear input related to option and put focus on it
 * - Create tag element and display it in {@link tagsContainer}
 * - Add the new tag name in corresponding tag array in {@link recipesData}
 * - Filter recipes based on previously filtered recipes 
 * - Create and display recipes
 * - Handle option trap focus
 * 
 * @param {MouseEvent} currentTarget 
 */

export const handleOptionListClick = ({ target }) => {
  const targetOption = target.parentElement.dataset.option;
  const tagName = target.innerText;

  const optionInput = document.querySelector(`input[data-option="${targetOption}"]`);
  optionInput.value = "";
  optionInput.focus();

  const tagButton = createTagButton(tagName, targetOption);
  tagsContainer.insertAdjacentElement("beforeend", tagButton);

  recipesData.tags[targetOption].push(tagName);

  recipesData.filtered = filterRecipesByTag(tagName, targetOption, recipesData.filtered);

  createAndDisplaySortedRecipes(recipesData.filtered);
  createAndDisplayOptionsLists(recipesData.filtered);
  handleTrapFocusOnOption();
};


/**
 * Gets called when user is clicking on a displayed tag
 * 
 * - Filter recipes based on selected tags 
 * - Remove clicked tag from the DOM
 * - Remove tag name from corresponding tag array in {@link recipesData}
 * - Filter recipes
 * - Create and display recipes
 * - Handle option trap focus
 * 
 * @param {MouseEvent} currentTarget  
 */

export const handleTagClick = ({ currentTarget }) => {
  const userInput = mainSearchInput.value.length < 3
    ? ""
    : formatString(mainSearchInput.value).trim();

  const targetOption = currentTarget.dataset.option;
  const tagName = currentTarget.innerText;
  currentTarget.remove();

  recipesData.tags[targetOption] = recipesData.tags[targetOption].filter(tag => {
    return tag !== tagName;
  });

  recipesData.filtered = filterRecipes(userInput, recipesData.recipes);

  for (const tagOption in recipesData.tags) {
    if (recipesData.tags[tagOption].length > 0) {
      recipesData.filtered = filterRecipesByTags(tagOption, recipesData.filtered);
    }
  }

  createAndDisplaySortedRecipes(recipesData.filtered);
  createAndDisplayOptionsLists(recipesData.filtered);
  handleTrapFocusOnOption();
};


/*****************************************/
/*************** OPTIONS  ****************/
/*****************************************/


/**
 * - Handle option trap focus
 * - Remove focus trap on closed option
 * - Clear option input
 * - Trigger input event to reset option list
 * 
 * @param {HTMLElement} target option who got closed
 */

function handleCloseOption({ target }) {
  handleTrapFocusOnOption();

  document.removeEventListener("keydown", handleEnterKeyOnOptions);

  const optionInputElement = target.querySelector("input");
  optionInputElement.value = "";

  const inputEvent = new Event("input");
  optionInputElement.dispatchEvent(inputEvent);
}


/**
 * - Handle option trap focus
 * - Add focus trap on opened option
 * - Put focus on option input
 * - Handle option trap focus
 * 
 * @param {HTMLElement} target option who got opened
 */

function handleOpenOption({ target }) {
  handleTrapFocusOnOption();

  document.addEventListener("keydown", handleEnterKeyOnOptions);

  const optionInputElement = target.querySelector("input");
  optionInputElement.focus();
}


/**
 * Enter key handler when options are open
 * 
 * @param {KeyboardEvent} event 
 */

function handleEnterKeyOnOptions(event) {
  const parentTarget = event.target.parentElement;
  if (event.key === "Enter" && parentTarget.classList.contains("list")) {
    handleOptionListClick(event);
  }
}

/*****************************************/
/******* OPTIONS DROPDOWN BUTTON *********/
/*****************************************/

/**
 *  Gets called when clicking on the transparent background behind opened options
 * 
 * - Check wich option element currently have data-display attribute
 * - Get associated drop down button
 * - Dispatch a click event on it
 */


function triggerClickOnActiveDropdownButton() {
  const currentActiveDropdownButton = document.querySelector("[data-display] .dropdown-btn");
  const clickEvent = new Event("click");
  currentActiveDropdownButton.dispatchEvent(clickEvent);
}

/*****************************************/
/************* OPTION INPUT **************/
/*****************************************/


export function handleSearchOptionInput({ target }) {
  const targetOption = target.dataset.option;

  const optionListContainer = document.querySelector(`ul[data-option="${targetOption}"]`);
  optionListContainer.innerHTML = "";

  const userInput = formatString(target.value).trim();

  const filteredOptions = filterAndSortOptions(userInput, recipesData[targetOption]);

  if (filteredOptions.length !== 0) {
    filteredOptions.forEach(filteredOption => {
      const optionElement = createOptionListElement(filteredOption);
      optionListContainer.insertAdjacentElement("beforeend", optionElement);
    });
  } else {
    createAndDisplayEmptyDataWarning(optionListContainer);
  }

  handleTrapFocusOnOption();
}
