import { filterRecipes } from "./filter";
import { recipesData } from "./data/data";
import { createAndDisplayRecipes } from "./app";
import { toggleDisplayOptionsLists, triggerClickOnDisplayedOptionButton } from "./display";

let isPasting = false;
let previousInput = "";

const searchInput = document.querySelector("input");
searchInput.addEventListener("input", handleSearchInput);
searchInput.addEventListener("paste", handlePasteInput);

const mainForm = document.querySelector("form");
mainForm.addEventListener("submit", handleMainFormSubmit);

const optionsElements = document.querySelectorAll(".dropdown-btn");
optionsElements.forEach(button => {
  button.addEventListener("click", toggleDisplayOptionsLists);
});

const backgroundHideOptions = document.querySelector(".bg-fixed");
backgroundHideOptions.addEventListener("click", triggerClickOnDisplayedOptionButton);

/**
 * Handle user input, then filter and display recipes
 */

function handleSearchInput() {
  const userInput = searchInput.value.toLowerCase().trim();

  if (userInput.length < 3 && recipesData.filtered.length === recipesData.full.length) {
    return;
  }

  if (!isPasting && previousInput.length > 0 && userInput.length > previousInput.length) {
    recipesData.filtered = filterRecipes(userInput, recipesData.filtered);
  } else {
    recipesData.filtered = filterRecipes(userInput, recipesData.full);
  }

  createAndDisplayRecipes(recipesData.filtered);
  isPasting = false;
  previousInput = userInput;
}

/** 
 * Set {@link isPasting} variable to true, to tell if user is actually pasting something into search input 
 * instead of writing 
 */

function handlePasteInput() {
  isPasting = true;
}

function handleMainFormSubmit(event) {
  event.preventDefault();
  handleSearchInput();
}