import "./data/types.js";

/**
 * @param {string} userInput text input from search input in lowercase
 * @param {string} recipes recipes to filter
 * @return {Recipe[]} filtered recipe based on recipe's ingredients, name and description
 */


const filterforLoop = (userInput, recipes) => {
  const filteredRecipes = [];
  const recipeLength = recipes.length;

  for (let i = 0; i < recipeLength; i++) {
    if (
      recipes[i].name.toLowerCase().indexOf(userInput) !== -1 ||
      recipes[i].description.toLowerCase().indexOf(userInput) !== -1
    ) {
      filteredRecipes.push(recipes[i]);
      continue;
    }

    const ingredientsLength = recipes[i].ingredients.length;

    for (let j = 0; j < ingredientsLength; j++) {
      if (recipes[i].ingredients[j].ingredient.toLowerCase().indexOf(userInput) !== -1) {
        filteredRecipes.push(recipes[i]);
        break;
      }
    }
  }

  return filteredRecipes;
};

export const filterRecipes = (userInput, recipes) => {
  return recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().indexOf(userInput) !== -1 ||
      recipe.description.toLowerCase().indexOf(userInput) !== -1 ||
      recipe.ingredients.some((ingredient) => {
        return ingredient.ingredient.toLowerCase().indexOf(userInput) !== -1;
      })
    );
  });
};
