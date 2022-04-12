 const getApiRecipes= require('./getApiRecipes');
 const getDbRecipes = require('./getDbRecipes');

 module.exports= async function getAllRecipes(){
     let infoApi= await getApiRecipes();
     let infoDb = await getDbRecipes();
     const allRecipes = infoDb?.concat(infoApi)
   return allRecipes
 }