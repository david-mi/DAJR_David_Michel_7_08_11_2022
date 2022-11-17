import "./data/types.js";
import { formatString } from "./utils.js";


/*****************************************/
/*************** RECIPES *****************/
/*****************************************/


/**
 * @param {string} userInput text input from search input in lowercase
 * @param {string} recipes recipes to filter
 * @return {Recipe[]} filtered recipe based on recipe's ingredients, name and description
 */

export const filterRecipesForLoopAccents = (userInput, recipes) => {
  const filteredRecipes = [];

  function isStrIncluded(strToCompare, str) {
    if (str.length === 0) return true;

    for (let i = 0; i < strToCompare.length; i++) {
      let matchCount = 0;

      for (let k = 0; k < str.length; k++) {
        if (strToCompare[i + k] === str[k]) {
          matchCount++;
        } else {
          matchCount = 0;
        }

        if (matchCount === str.length) {
          return true;
        }
      }
    }

    return false;
  }

  for (let i = 0; i < recipes.length; i++) {
    if (
      isStrIncluded(formatString(recipes[i].name), userInput) ||
      isStrIncluded(formatString(recipes[i].description), userInput)
    ) {
      filteredRecipes.push(recipes[i]);
      continue;
    }

    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (isStrIncluded(formatString(recipes[i].ingredients[j].ingredient), userInput)) {
        filteredRecipes.push(recipes[i]);
        break;
      }
    }
  }

  return filteredRecipes;
};


/**
 * @param {string} userInput text input from search input in lowercase
 * @param {string} recipes recipes to filter
 * @return {Recipe[]} filtered recipe based on recipe's ingredients, name and description
 */

export const filterRecipes = (userInput, recipes) => {
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    if (
      formatString(recipes[i].name).indexOf(userInput) !== -1 ||
      formatString(recipes[i].description).indexOf(userInput) !== -1
    ) {
      filteredRecipes.push(recipes[i]);
      continue;
    }

    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (formatString(recipes[i].ingredients[j].ingredient).indexOf(userInput) !== -1) {
        filteredRecipes.push(recipes[i]);
        break;
      }
    }
  }

  return filteredRecipes;
};


/**
 * @param {string} userInput text input from search input in lowercase
 * @param {string} recipes recipes to filter
 * @return {Recipe[]} filtered recipe based on recipe's ingredients, name and description
 */

export const filterRecipesFunctionnal = (userInput, recipes) => {
  return recipes.filter(({ name, description, ingredients }) => {
    return (
      formatString(name).indexOf(userInput) !== -1 ||
      formatString(description).indexOf(userInput) !== -1 ||
      ingredients.some(({ ingredient }) => {
        return formatString(ingredient).indexOf(userInput) !== -1;
      })
    );
  });
};


/*****************************************/
/*************** OPTIONS *****************/
/*****************************************/


export const filterAndSortOptions = (userInput, options) => {
  return options
    .filter((option) => {
      return formatString(option).indexOf(userInput) !== -1;
    })
    .sort((a, b) => a.localeCompare(b));
};
