/**
 * @typedef Recipe
 * @type {{
 *  id: number,
 *  name: string,
 *  servings: number,
 *  ingredients: Ingredient[],
 * time: number,
 * description: string,
 * appliance: string,
 * ustensils: Ustensils
 * }},
 */

/**
 * @typedef Ingredient
 * @type {{
 *  ingredient: string,
 *  quantity?: number,
 *  unit?: string
 * }}
 */

/**
 * @typedef Ustensils
 * @type {string[]}
 */
