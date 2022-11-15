export const createOptionElement = (option) => {
  const liElement = document.createElement("li");
  liElement.innerText = option;

  liElement.addEventListener("click", () => {
    console.log("handle tag selection");
  });

  return liElement;
};