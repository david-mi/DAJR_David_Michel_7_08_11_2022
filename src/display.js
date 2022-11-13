import { recipesContainer } from "./constants";

/**
 * Insert recipe html to {@link recipesContainer}
 * 
 * @param {string} recipeHtml
 */

export const displayRecipe = (recipeHtml) => {
  recipesContainer.insertAdjacentHTML("beforeend", recipeHtml);
};

/**
 * Open or close targeted options input and list,
 * If opening, put focus to associated form input
 * 
 * @param {MouseEvent} currentTarget clicked drop down button
 */

export const toggleDisplayOptionsLists = ({ currentTarget }) => {
  const chosenOption = currentTarget.dataset.option;
  currentTarget.toggleAttribute("data-display");

  const targetOptionElement = currentTarget.closest(".option");
  targetOptionElement.toggleAttribute("data-display");


  const elementsWhereToToggleDisplay = document.querySelectorAll(`.bg-fixed, .${chosenOption} :is(ul, h2, input)`);
  elementsWhereToToggleDisplay.forEach(element => {
    element.classList.toggle("display-none");
  });

  toggleRotateOptionIconButton(chosenOption);
  handleOptionInput(chosenOption);
};

/**
 * Toggle "expand" classList on button related to {@link chosenOption}
 * - expand classList will make arrow icon rotate
 * 
 * @param {"ingredients" | "appliance" | "ustensils"}  chosenOption
 */

function toggleRotateOptionIconButton(chosenOption) {
  const optionButtonElement = document.querySelector(`.${chosenOption} .dropdown-btn`);
  optionButtonElement.classList.toggle("expand");
}

/**
 * - If input is displayed, put focus on it
 * - If not, reset it's value
 * 
 * @param {"ingredients" | "appliance" | "ustensils"}  chosenOption
 */

function handleOptionInput(chosenOption) {
  const optionInputElement = document.querySelector(`.${chosenOption} input`);
  if (optionInputElement.classList.contains("display-none")) {
    optionInputElement.value = "";
  } else {
    optionInputElement.focus();
  }
}

/**
 *  Gets called when clicking on the transparent background behind opened options
 * 
 * - Check wich option element currently have data-display attribute
 * - Get associated drop down button
 * - Dispatch a click event on it
 */

export const triggerClickOnDisplayedOptionButton = () => {
  const currentDisplayedOption = document.querySelector("[data-display]");
  const currentDisplayedOptionButton = currentDisplayedOption.querySelector(".dropdown-btn");
  const clickEvent = new Event("click");
  currentDisplayedOptionButton.dispatchEvent(clickEvent);
};