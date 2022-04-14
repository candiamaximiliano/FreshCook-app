const { default: axios } = require('axios');
const config = require('../config');
const { Recipe, Diet } = require("../config/db.config");

module.exports = async function getDetailedRecipe(id) {
  try {
    const id2 = `${id}`
    if (id2.length > 8) {
      return await Recipe.findByPk(id, {
        include: {
        model: Diet,
        attributes: ['id', 'name'],
        through: { //comprobacion (mediante)
          attributes: [],
        },
      },
    })
    } else {
      const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${config.keyFoodApi.thirdKey}`);
    const recipe = apiUrl.data;
    const info = {
        name: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        dishTypes: recipe.dishTypes,
        score: recipe.spoonacularScore,
        healthScore: recipe.healthScore,
        stepByStep: recipe.analyzedInstructions.map(instruction => instruction.steps.map(step => step.step.split('\n'))).flat(2),
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree:recipe.glutenFree,
        diets: recipe.diets,
      };
    return info;
    }
  } catch (error) {
    console.error(error)
  }
}