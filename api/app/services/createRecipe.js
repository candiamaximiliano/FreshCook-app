const { Recipe, Diet } = require("../config/db.config");

module.exports= async function createRecipe({ name, image, summary,
score, healthScore, stepByStep, vegan, vegetarian, glutenFree, createdInDb, diets}){

 const recipeCreated = await Recipe.create({
    name, 
    image, 
    summary,  
    score, 
    healthScore, 
    stepByStep,
    vegan, 
    vegetarian,
    glutenFree, 
    createdInDb,
  });

  console.log(diets);

 const dietsDb = await Diet.findAll({
   where: { name: diets }
 });

 recipeCreated.addDiets(dietsDb);
}

 