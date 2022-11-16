import "./styles/index.scss";
import "./resizeObserver.js";
import "./handlers.js";
import { recipesData } from "./data/recipesData";
import { createAndDisplayOptionsLists, createAndDisplayRecipes } from "./view.js";



createAndDisplayRecipes(recipesData.full);
createAndDisplayOptionsLists(recipesData.full);
