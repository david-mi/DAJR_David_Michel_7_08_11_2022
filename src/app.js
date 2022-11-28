import "./styles/index.scss";
import "./handlers.js";
import { recipesData } from "./data/recipesData";
import { createAndDisplayOptionsLists, createAndDisplaySortedRecipes } from "./view.js";

createAndDisplaySortedRecipes(recipesData.recipes);
createAndDisplayOptionsLists(recipesData.recipes);
