const express = require('express');
const { Router } = require('express');
const getAllRecipes = require("../services/getAllRecipes");
const getDetailedRecipe = require("../services/getDetailedRecipe");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());


router.get('/', async (req, res) => {
  const { name } = req.query;
  const totalRecipes = await getAllRecipes();
  try {
    if (name) {
      const recipeByName = await totalRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
      recipeByName.length?
      res.status(200).send(recipeByName):
      res.status(404).send('No results found for your search');
    } else {
      res.status(200).send(totalRecipes);
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json(error)
  }
});

router.get('/:idReceta', async (req, res) => {
   const { idReceta } = req.params;
   try {
    const detailRecipe = await getDetailedRecipe(idReceta);
    res.status(200).send(detailRecipe);
    
  } catch (error) {
    console.error(error)
    res.status(404).send('Recipe not found')
  }
});


module.exports = router;