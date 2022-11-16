const optionsElements = document.querySelectorAll(".option");

/**
 * Solution found to keep options menu as responsive as possible with displayed option list overlapping recipes container
 * - Observe every dom resizes happening to options elements Element
 * - Adapt option negative margin bottom to keep option list overlap
 */

const resizeObserver = new ResizeObserver((entries) => {

  entries.forEach(({ target }) => {

    if (target.dataset.display !== undefined) {
      const targetedListElement = target.querySelector(".list");
      const listHeight = targetedListElement.getBoundingClientRect().height;
      target.style.marginBottom = `-${listHeight}px`;
    } else {
      target.style.marginBottom = "0";
    }
  });
});

optionsElements.forEach(option => {
  resizeObserver.observe(option);
});