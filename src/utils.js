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
  "ï": "i",
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
    .replace(/[éàèùâêîïôûç]/g, (letter) => letterEnum[letter]);
};
