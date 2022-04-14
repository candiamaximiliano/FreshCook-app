const config = require('../config');
const axios = require('axios');

module.exports = async function getApiRecipes() {

  try{
      const apiRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${config.keyFoodApi.thirdKey}&addRecipeInformation=true&number=100`);
      const resultApiRecipes = await apiRecipes.data.results.map(recipe => {
        return {
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          score: recipe.spoonacularScore,
          vegetarian: recipe.vegetarian,
          vegan: recipe.vegan,
          glutenFree: recipe.glutenFree,
          diets: recipe.diets,
        }
      })
    
       return resultApiRecipes;


  }catch(error){
      console.log(error)
  };
};