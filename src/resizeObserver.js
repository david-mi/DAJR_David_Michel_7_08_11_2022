const optionsElements = document.querySelectorAll(".option");

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => {

    if (target.dataset.display !== undefined) {
      const targetedListElement = target.querySelector(".list");
      const listHeight = targetedListElement.getBoundingClientRect().height;
      target.style.marginBottom = `-${listHeight}px`;

      if (innerWidth < 1150) {
        target.style.order = 1;
      }

    } else {
      target.style.order = "unset";
      target.style.marginBottom = "0";
    }
  });
});

optionsElements.forEach(option => {
  resizeObserver.observe(option);
});