/**
 * @returns {Promise<Recipe[]>}
 */

export const getApiData = async () => {
  const response = await fetch("./recipes.json");
  const data = await response.json();
  return data;
};