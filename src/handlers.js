import { filterAndSortOptions, filterRecipes } from "./filter";
import { recipesData } from "./data/recipesData";
import {
  toggleAdvancedSearchAttributes,
  createOptionListElement,
  createAndDisplayRecipes,
  createAndDisplayOptionsLists,
  removeTrapFocusOnOption,
  addTrapFocusOnOption
} from "./view.js";
import { formatString } from "./utils.js";

let previousInput = "";

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
      recipesData.filtered = filterRecipes("", recipesData.recipes);
    }
  } else if (userInput.startsWith(previousInput)) {
    recipesData.filtered = filterRecipes(userInput, recipesData.filtered);
  } else {
    recipesData.filtered = filterRecipes(userInput, recipesData.recipes);
  }

  createAndDisplayRecipes(recipesData.filtered);
  createAndDisplayOptionsLists(recipesData.filtered);
  previousInput = userInput;
}


function handleMainFormSubmit(event) {
  event.preventDefault();
  handleMainSearchInput();
}


/*****************************************/
/*************** OPTIONS  ****************/
/*****************************************/


/**
 * - Remove focus trap on closed option
 * - Clear option input
 * - Trigger input event to reset option list
 * 
 * @param {HTMLElement} target option who got closed
 */

function handleCloseOption({ target }) {
  removeTrapFocusOnOption();

  const optionInputElement = target.querySelector("input");
  optionInputElement.value = "";

  const inputEvent = new Event("input");
  optionInputElement.dispatchEvent(inputEvent);
}


/**
 * - Add focus trap on opened option
 * - Put focus on option input
 * 
 * @param {HTMLElement} target option who got opened
 */

function handleOpenOption({ target }) {
  const optionChoice = target.dataset.option;
  addTrapFocusOnOption(optionChoice);

  const optionInputElement = target.querySelector("input");
  optionInputElement.focus();
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
    const emptyMessageWarning = optionListContainer.dataset.empty;
    const emptyListHtml = `<p>${emptyMessageWarning}</p>`;
    optionListContainer.insertAdjacentHTML("beforeend", emptyListHtml);
  }
}
