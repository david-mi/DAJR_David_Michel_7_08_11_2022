import { filterRecipes } from "./filter";
import { recipesData } from "./data/data";
import { createAndDisplayRecipes } from "./app";

let isPasting = false;
let previousInput = "";
const searchInput = document.querySelector("input");
const form = document.querySelector("form");
searchInput.addEventListener("input", handleSearchInput);
searchInput.addEventListener("paste", handlePasteInput);
form.addEventListener("submit", handleFormSubmit);

/**
 * Handle user input, then filter and display recipes
 */

function handleSearchInput() {
  const userInput = searchInput.value.toLowerCase().trim();

  if (
    userInput.length < 3 && recipesData.filtered.length === recipesData.full.length
  ) return;

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
 * Set {@link isPasting} variable to trace if a user is actually pasting something into search input 
 */

function handlePasteInput() {
  isPasting = true;
}

function handleFormSubmit(event) {
  event.preventDefault();
  handleSearchInput();
}