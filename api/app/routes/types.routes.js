const express = require('express');
const { Router } = require('express');
const typesOfDiets = require('../controllers/types.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.get('/', async (req, res) => {
  const allDiets = await typesOfDiets();
  res.send(allDiets);
});

module.exports = router;