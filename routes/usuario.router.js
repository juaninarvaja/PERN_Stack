const express = require('express');
router = express.Router();
const Usuario = require('../bbdd/models');

router.post('/usuarios', async (req, res) => {
    try {
      // Extraer los parámetros del cuerpo de la solicitud
      const { name, password, rol, email } = req.body;
  
      // Crear un nuevo usuario con los parámetros proporcionados
      const nuevoUsuario = await Usuario.create({
        name,
        password,
        rol,
        email
      });
  
      // Responder con el usuario creado
      res.status(201).json(nuevoUsuario);  // Código 201 indica que se creó un nuevo recurso
    } catch (error) {
      res.status(500).send('Error al crear el usuario');
    }
  });
  
  module.exports = router;  // Exportar las rutas para usarlas en app.js