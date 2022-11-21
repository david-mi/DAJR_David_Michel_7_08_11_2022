import { recipesData } from "./data/recipesData.js";
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

export const filterRecipesNoIndexOf = (userInput, recipes) => {
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


/*****************************************/
/***************** TAGS ******************/
/*****************************************/


/**
 * @param {string} userInput text input from search input in lowercase
 * @param {"ingredients" | "appliances" | "ustensils"} tagOption
 * @param {string} recipes recipes to filter
 * @return {Recipe[]} filtered recipe based on recipe's ingredients, name and description
 */

export const filterRecipesByTag = (tagName, tagOption, recipes) => {
  const filterByTagsCallbacks = {
    /**
     * Check if the tagName is present on current recipe ingredients
     * 
     * @param {RecipeData} recipes
     */

    ingredients: ({ ingredients }) => {
      return ingredients.some(({ ingredient }) => {
        return ingredient === tagName;
      });
    },

    /**
     * Check if the tagName is present on current recipe appliances
     * 
     * @param {RecipeData} recipes
     */

    appliances: ({ appliance }) => {
      return appliance === tagName;
    },

    /**
     * Check if the tagName is present on current recipe ustensils
     * 
     * @param {RecipeData} recipes
     */

    ustensils: ({ ustensils }) => {
      return ustensils.some((ustensil) => {
        return ustensil === tagName;
      });
    }
  };

  return recipes.filter(filterByTagsCallbacks[tagOption]);
};

/**
 * Filter recipes based on tagOption its ossociated tags
 * 
 *  @param {"ingredients" | "appliances" | "ustensils"} tagOption tagOption 
 * @param {Recipe[]} recipes 
 * @returns {Recipe[]}
 */

export const filterRecipesByTags = (tagOption, recipes) => {
  const filterByTagsCallbacks = {

    /**
    * Check if every ingredients on tags are present in the current recipe
    * 
    * @param {Recipe} recipes
    */

    ingredients: ({ ingredients }) => {
      return recipesData.tags.ingredients.every((ingredientTag) => {
        return ingredients.some(({ ingredient }) => {
          return ingredient === ingredientTag;
        });
      });
    },

    /**
     * Check if every appliances on tags are present in the current recipe
     * 
     * @param {Recipe} recipes
     */

    appliances: ({ appliance }) => {
      return recipesData.tags.appliances.every(applianceTag => {
        return applianceTag === appliance;
      });
    },

    /**
    * Check if every ustensils on tags are present in the current recipe
    * 
    * @param {Recipe} recipes
    */

    ustensils: ({ ustensils }) => {
      return recipesData.tags.ustensils.every((ustensilTag) => {
        return ustensils.some((ustensil) => {
          return ustensil === ustensilTag;
        });
      });
    }
  };

  return recipes.filter(filterByTagsCallbacks[tagOption]);
};


/*****************************************/
/*************** OPTIONS *****************/
/*****************************************/


/**
 * Filter displayed options from lists
 * 
 * @param {string} userInput user entry
 * @param {string[]} options 
 */

export const filterAndSortOptions = (userInput, options) => {
  return options
    .filter((option) => {
      return formatString(option).indexOf(userInput) !== -1;
    })
    .sort((a, b) => a.localeCompare(b));
};
