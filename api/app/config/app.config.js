const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const auth = require('../routes/auth.routes');
const user = require('../routes/user.routes');
const recipes = require('../routes/recipes.routes');
const recipe = require('../routes/recipe.routes');
const types = require('../routes/types.routes');

require('./db.config');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//simple route
server.get("/", (req, res) => {
  res.json({ message: "Welcome to Fresh Cook App API." });
});

// routes
server.use('/auth', auth);
server.use('/user', user);
server.use('/recipes', recipes);
server.use('/recipe', recipe);
server.use('/types', types);


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;