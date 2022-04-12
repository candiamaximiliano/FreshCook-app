const express = require('express');
const { Router } = require('express');
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const createRecipe = require("../services/createRecipe");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.post('/', async (req, res) => {
  let { 
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
    diets,
  } = req.body;
  console.log(diets)

//  const numberParser = (str) => {
//    let score = Number(str);
//    return score;
//  }
 const booleanParser = (str) => {
   let boolean = str === 'true'
   return boolean;
 }

  try {
    createRecipe({ 
      name, 
      image, 
      summary,  
      score: Number(score), 
      healthScore: Number(healthScore), 
      stepByStep: [stepByStep],
      vegan: booleanParser(vegan), 
      vegetarian: booleanParser(vegetarian),
      glutenFree: booleanParser(glutenFree), 
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