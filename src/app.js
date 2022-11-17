import "./styles/index.scss";
import "./handlers.js";
import { recipesData } from "./data/recipesData";
import { createAndDisplayOptionsLists, createAndDisplayRecipes } from "./view.js";

createAndDisplayRecipes(recipesData.recipes);
createAndDisplayOptionsLists(recipesData.recipes);
