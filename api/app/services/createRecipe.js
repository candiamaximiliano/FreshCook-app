const { Recipe, Diet } = require("../config/db.config");

module.exports= async function createRecipe(obj){

 const recipeCreated = await Recipe.create(obj);

 const dietsDb = await Diet.findAll({
   where: { name: obj.diets }
 });

 recipeCreated.addDiet(dietsDb);
}

 