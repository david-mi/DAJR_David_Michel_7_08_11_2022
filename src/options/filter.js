export const filterAndSortOptions = (userInput, options) => {
  return [...options].filter((option) => {
    return option.toLowerCase().indexOf(userInput) !== -1;
  }).sort((a, b) => a.localeCompare(b));
};