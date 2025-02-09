const express = require('express');

const usersRouter = require('./usuario.router');
const vechiculosRouter = require('./vehiculo.router');
const reservasRouter = require('./reservas.router');
const router = express.Router();

function routerApi(app) {
  app.use('/', router);

  router.use('/users', usersRouter);
  router.use('/vehiculos',vechiculosRouter);
  router.use('/reservas', reservasRouter);
}

module.exports = routerApi;
