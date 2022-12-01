const letterEnum = {
  "é": "e",
  "è": "e",
  "ê": "e",
  "à": "a",
  "a": "a",
  "â": "a",
  "ù": "u",
  "û": "u",
  "î": "i",
  "ô": "o",
  "ç": "c"
};

/**
 * @param {string} str string to format
 * @return {string} new formated string to lowerCase with accents replaced
 */

export const formatString = (str) => {
  return str
    .toLowerCase()
    .replace(/[éàèùâêîôûç]/g, (letter) => letterEnum[letter]);
};
