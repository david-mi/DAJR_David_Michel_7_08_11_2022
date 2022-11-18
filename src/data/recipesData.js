import "./types.js";
import { recipes } from "./recipes";

/**
 * @type {RecipeData}
 */

export const recipesData = {
  filtered: recipes,
  recipes: recipes,
  ingredients: [],
  appliances: [],
  ustensils: [],
  tags: {
    ingredients: [],
    appliances: [],
    ustensils: []
  }
};