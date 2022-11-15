import { filterAndSortOptions } from "./filter";
import { recipesData } from "../data/recipesData";
import { createOptionElement } from "./create";
import { displayOptionListElements, toggleDisplayOptionsLists } from "./display.js";

const backgroundHideOptions = document.querySelector(".bg-fixed");
backgroundHideOptions.addEventListener("click", triggerClickOnActiveDropdownButton);

const optionsDropdownButtons = document.querySelectorAll(".dropdown-btn");
optionsDropdownButtons.forEach(button => {
  button.addEventListener("click", toggleDisplayOptionsLists);
});

const optionsForms = document.querySelectorAll(".option form");
optionsForms.forEach(optionsForm => {
  optionsForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

const optionsInputs = document.querySelectorAll(".option input");

optionsInputs.forEach(optionInput => {
  optionInput.addEventListener("input", handleSearchOptionInput);
});

/**
 *  Gets called when clicking on the transparent background behind opened options
 * 
 * - Check wich option element currently have data-display attribute
 * - Get associated drop down button
 * - Dispatch a click event on it
 */

function triggerClickOnActiveDropdownButton() {
  const currentDisplayedOption = document.querySelector("[data-display]");
  const currentDisplayedOptionButton = currentDisplayedOption.querySelector(".dropdown-btn");
  const clickEvent = new Event("click");
  currentDisplayedOptionButton.dispatchEvent(clickEvent);
}

export function handleSearchOptionInput({ target }) {
  const targetOption = target.dataset.option;

  const optionListContainer = document.querySelector(`ul[data-option="${targetOption}"]`);
  optionListContainer.innerHTML = "";

  const userInput = target.value.toLowerCase().trim();
  const filteredOptions = filterAndSortOptions(userInput, recipesData[targetOption]);

  if (filteredOptions.length !== 0) {
    filteredOptions.forEach(filteredOption => {
      const optionElement = createOptionElement(filteredOption);
      displayOptionListElements(optionElement, optionListContainer);
    });
  } else {
    const emptyMessageWarning = optionListContainer.dataset.empty;
    const emptyListHtml = `<p>${emptyMessageWarning}</p>`;
    optionListContainer.insertAdjacentHTML("beforeend", emptyListHtml);
  }

}