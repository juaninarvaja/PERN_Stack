// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Usuario, Vehiculo, Reserva, sequelize } = require('./bbdd/models');
// const sequelize = require('./bbdd/bd');
const routerApi = require('./routes');

const app = express();

// Middleware
app.use(bodyParser.json());

routerApi(app);


// Iniciar el servidor y sincronizar la base de datos
const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: false }); // No eliminará datos existentes
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
});
