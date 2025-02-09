const express = require('express');
router = express.Router();
const  { Usuario } = require('../bbdd/models');


router.post('/create', async (req, res) => {
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
      res.status(201).json(nuevoUsuario);  // Código 201 indica que se creó un nuevo recurso
    } catch (error) {
        console.log(error);
      res.status(500).send('Error al crear el usuario');
    }
  });

  router.get('/', async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();  // Obtiene todos los usuarios
      res.status(200).json(usuarios);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener los usuarios');
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);  // Encuentra el usuario por ID
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener el usuario');
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, password, rol, email } = req.body;
      
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Actualizamos los campos del usuario
      usuario.name = name || usuario.name;
      usuario.password = password || usuario.password;
      usuario.rol = rol || usuario.rol;
      usuario.email = email || usuario.email;
  
      await usuario.save();  // Guardamos los cambios
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al actualizar el usuario');
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      await usuario.destroy();  // Elimina el usuario
      res.status(200).send('Usuario eliminado');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el usuario');
    }
  });
  
  
  
  
  module.exports = router;  // Exportar las rutas para usarlas en app.js