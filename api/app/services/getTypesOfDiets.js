const { Recipe, Diet } = require("../config/db.config");

const typesOfDiets = [
      'vegetarian',
      'lacto vegetarian',
      'ovo vegetarian',
      'vegan',
      'pescetarian',
      'paleolithic',
      'dairy free',
      'primal',
      'whole30',
      'lacto ovo vegetarian',
      'ketogenic',
      'low fodmap',
      'gluten free',
    ]
    
module.exports= async function getTypesOfDiets() {
  try {
    typesOfDiets.forEach(diet => {
        Diet.findOrCreate({
          where: { name: diet }
        });
    });
    
  } catch (error) {
    console.error(error);
  };
}