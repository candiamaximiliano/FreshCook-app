const express = require('express');
const { Router } = require('express');

const createRecipe = require("../services/createRecipe");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.post('/', (req, res) => {
  const { 
    name, 
    image, 
    summary, 
    dishType, 
    score, 
    healthScore, 
    stepByStep, 
    vegan, 
    vegetarian, 
    glutenFree, 
    createdInDb, 
    diets,
  } = req.body;

  try {
    createRecipe({ 
      name, 
      image, 
      summary, 
      dishType, 
      score, 
      healthScore, 
      stepByStep, 
      vegan, 
      vegetarian, 
      glutenFree, 
      createdInDb, 
      diets,
    })
    res.send('Recipe created correctly');
  }   catch (error) {
        console.error(error);
        return res.status(404).json(error)
      }
});

module.exports = router;