import { filterOption } from "./filter";
import { recipesData } from "../data/recipesData";
import { createOptionHtml } from "./create";
import { toggleDisplayOptionsLists } from "./display.js";

const backgroundHideOptions = document.querySelector(".bg-fixed");
backgroundHideOptions.addEventListener("click", triggerClickOnDisplayedOptionButton);

const optionsDropdownButtons = document.querySelectorAll(".dropdown-btn");
optionsDropdownButtons.forEach(button => {
  button.addEventListener("click", toggleDisplayOptionsLists);
});

/**
 *  Gets called when clicking on the transparent background behind opened options
 * 
 * - Check wich option element currently have data-display attribute
 * - Get associated drop down button
 * - Dispatch a click event on it
 */

function triggerClickOnDisplayedOptionButton() {
  const currentDisplayedOption = document.querySelector("[data-display]");
  const currentDisplayedOptionButton = currentDisplayedOption.querySelector(".dropdown-btn");
  const clickEvent = new Event("click");
  currentDisplayedOptionButton.dispatchEvent(clickEvent);
}

