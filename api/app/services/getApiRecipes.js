const axios = require("axios");
const verifyApiKey = require("../middlewares/verifyApiKey");

module.exports = async function getApiRecipes() {
  try {
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${verifyApiKey()}&addRecipeInformation=true&number=100`
    );
    verifyApiKey(apiRecipes);
    const resultApiRecipes = await apiRecipes.data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        healthScore: recipe.healthScore,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        diets: recipe.diets,
      };
    });

    return resultApiRecipes;
  } catch (error) {
    console.log(error);
  }
};
