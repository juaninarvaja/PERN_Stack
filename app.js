// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Usuario, Vehiculo, Reserva } = require('./bbdd/models');
const sequelize = require('./bbdd/bd');

const app = express();

// Middleware
app.use(bodyParser.json());

// Rutas para manejar usuarios
app.post('/usuarios', async (req, res) => {
  try {
    const { name, password, rol, email } = req.body;
    const usuario = await Usuario.create({ name, password, rol, email });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rutas para manejar vehículos
app.post('/vehiculos', async (req, res) => {
  try {
    const { marca, modelo, tipo, kilometros, ano, estado } = req.body;
    const vehiculo = await Vehiculo.create({ marca, modelo, tipo, kilometros, ano, estado });
    res.status(201).json(vehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rutas para manejar reservas
app.post('/reservas', async (req, res) => {
  try {
    const { vehiculo_id, usuario_id } = req.body;
    const reserva = await Reserva.create({ vehiculo_id, usuario_id });
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
