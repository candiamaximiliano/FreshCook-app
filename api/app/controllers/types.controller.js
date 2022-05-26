const { Recipe, Diet } = require("../config/db.config");
const getTypesOfDiets = require("../services/getTypesOfDiets");

module.exports = async function typesOfDiets() {
  try {
    getTypesOfDiets();
    const allDiets = await Diet.findAll();
    return allDiets;
  } catch (error) {
    console.error(error);
    return error;
  }
};
