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


  const elementsWhereToToggleDisplay = document.querySelectorAll(`.bg-fixed, [data-option="${chosenOption}"] :is(ul, h2, input)`);
  elementsWhereToToggleDisplay.forEach(element => {
    element.classList.toggle("display-none");
  });

  toggleRotateOptionIconButton(chosenOption);
  handleOptionDisplayInput(chosenOption);
};

/**
 * Toggle "expand" classList on button related to {@link chosenOption}
 * - expand classList will make arrow icon rotate
 * 
 * @param {"ingredients" | "appliances" | "ustensils"}  chosenOption
 */

function toggleRotateOptionIconButton(chosenOption) {
  const optionButtonElement = document.querySelector(`[data-option="${chosenOption}"] .dropdown-btn`);
  optionButtonElement.classList.toggle("expand");
}

/**
 * - If input is displayed, put focus on it
 * - If not, reset it's value
 * 
 * @param {"ingredients" | "appliances" | "ustensils"}  chosenOption
 */

function handleOptionDisplayInput(chosenOption) {
  const optionInputElement = document.querySelector(`[data-option="${chosenOption}"] input`);
  if (optionInputElement.classList.contains("display-none")) {
    optionInputElement.value = "";
  } else {
    optionInputElement.focus();
  }
}

export const displayOptionsListsContent = (element, container) => {
  container.insertAdjacentHTML("beforeend", element);
};