import { filterRecipes } from "./filter";
import { recipesData } from "./data/recipesData";
import { createAndDisplayRecipes } from "./app";

let isPasting = false;
let previousInput = "";

const mainSearchInput = document.querySelector("input");
mainSearchInput.addEventListener("input", handleMainSearchInput);
mainSearchInput.addEventListener("paste", handlePasteOnMainSearchInput);

const mainForm = document.querySelector("form");
mainForm.addEventListener("submit", handleMainFormSubmit);

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