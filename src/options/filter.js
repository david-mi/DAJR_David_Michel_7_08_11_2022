export const filterOption = (userInput, options) => {
  return [...options].filter((option) => {
    return option.toLowerCase().indexOf(userInput) !== -1;
  });
};