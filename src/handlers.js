import { filterAndSortOptions, filterRecipes } from "./filter";
import { recipesData } from "./data/recipesData";
import {
  toggleAdvancedSearchAttributes,
  createOptionListElement,
  createAndDisplayRecipes,
  createAndDisplayOptionsLists,
  handleOptionDisplayInput
} from "./view.js";

let isPasting = false;
let previousInput = "";

const mainSearchInput = document.querySelector("input");
mainSearchInput.addEventListener("input", handleMainSearchInput);
mainSearchInput.addEventListener("paste", handlePasteOnMainSearchInput);

const mainForm = document.querySelector("form");
mainForm.addEventListener("submit", handleMainFormSubmit);

const backgroundHideOptions = document.querySelector(".bg-fixed");
backgroundHideOptions.addEventListener("click", triggerClickOnActiveDropdownButton);

const optionsDropdownButtons = document.querySelectorAll(".dropdown-btn");
optionsDropdownButtons.forEach(button => {
  button.addEventListener("click", handleOptionDrowDownButtonClick);
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


/*****************************************/
/********** MAIN SEARCH INPUT ************/
/*****************************************/


/**
 * Handle user input, then filter and display recipes
 */

function handleMainSearchInput() {
  const userInput = mainSearchInput.value.toLowerCase().trim();

  if (userInput.length < 3 && recipesData.filtered.length === recipesData.full.length) {
    return;
  }

  if (!isPasting && previousInput.length > 0 && userInput.length > previousInput.length) {
    recipesData.filtered = filterRecipes(userInput, recipesData.filtered);
  } else {
    recipesData.filtered = filterRecipes(userInput, recipesData.full);
  }

  createAndDisplayRecipes(recipesData.filtered);
  createAndDisplayOptionsLists(recipesData.filtered);
  isPasting = false;
  previousInput = userInput;
}

/** 
 * Set {@link isPasting} variable to true, to tell if user is actually pasting something into search input 
 * instead of writing 
 */

function handlePasteOnMainSearchInput() {
  isPasting = true;
}

function handleMainFormSubmit(event) {
  event.preventDefault();
  handleMainSearchInput();
}


/*****************************************/
/******* OPTIONS DROPDOWN BUTTON *********/
/*****************************************/


/**
 * @param {MouseEvent} currentTarget 
 */

function handleOptionDrowDownButtonClick({ currentTarget }) {
  toggleAdvancedSearchAttributes(currentTarget);
  handleOptionDisplayInput(currentTarget);
}

/**
 *  Gets called when clicking on the transparent background behind opened options
 * 
 * - Check wich option element currently have data-display attribute
 * - Get associated drop down button
 * - Dispatch a click event on it
 */

function triggerClickOnActiveDropdownButton() {
  const currentDisplayedOption = document.querySelector("[data-display]");
  const currentDisplayedOptionButton = currentDisplayedOption.querySelector(".dropdown-btn");
  const clickEvent = new Event("click");
  currentDisplayedOptionButton.dispatchEvent(clickEvent);
}


/*****************************************/
/************* OPTION INPUT **************/
/*****************************************/


export function handleSearchOptionInput({ target }) {
  const targetOption = target.dataset.option;

  const optionListContainer = document.querySelector(`ul[data-option="${targetOption}"]`);
  optionListContainer.innerHTML = "";

  const userInput = target.value.toLowerCase().trim();
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