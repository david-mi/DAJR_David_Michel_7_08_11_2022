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
/***************** TAGS ******************/
/*****************************************/


/**
 * @param {string} userInput text input from search input in lowercase
 * @param {string} recipes recipes to filter
 * @return {Recipe[]} filtered recipe based on recipe's ingredients, name and description
 */

export const filterRecipesByTag = (tagName, tagOption, recipes) => {
  const filterByTagsCallbacks = {
    ingredients: ({ ingredients }) => {
      return ingredients.some(({ ingredient }) => {
        return ingredient === tagName;
      });
    },
    appliances: ({ appliance }) => {
      return appliance === tagName;
    },
    ustensils: ({ ustensils }) => {
      return ustensils.some((ustensil) => {
        return ustensil === tagName;
      });
    }
  };

  return recipes.filter(filterByTagsCallbacks[tagOption]);
};


export const filterRecipesByTags = (tagOption, recipes) => {
  const filterByTagsCallbacks = {
    ingredients: ({ ingredients }) => {
      return recipesData.tags.ingredients.every((ingredientTag) => {
        return ingredients.some(({ ingredient }) => {
          return ingredient === ingredientTag;
        });
      });
    },
    appliances: ({ appliance }) => {
      return recipesData.tags.appliances.every(applianceTag => {
        return applianceTag === appliance;
      });
    },
    ustensils: ({ ustensils }) => {
      return recipesData.tags.ustensils.every((ustensilTag) => {
        return ustensils.some((ustensil) => {
          return ustensil === ustensilTag;
        });
      });
    }
  };

  recipes.filter(({ ingredients }) => {
    return recipesData.tags.ingredients.every((tagIngredient) => {
      return ingredients.some(({ ingredient }) => {
        return ingredient === tagIngredient;
      });
    });
  });

  return recipes.filter(filterByTagsCallbacks[tagOption]);
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
