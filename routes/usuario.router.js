const express = require('express');
router = express.Router();
const  { Usuario } = require('../bbdd/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/create', async (req, res) => {
    try {
      // Extraer los parámetros del cuerpo de la solicitud
      const { name, password, rol, email } = req.body;
      const salt = await bcrypt.genSalt(10); // 10 es la complejidad del salt
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Crear un nuevo usuario con los parámetros proporcionados
      const nuevoUsuario = await Usuario.create({
        name,
        password: hashedPassword,
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


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, 'tu_clave_secreta', { expiresIn: '1h' });

    // Enviar el token al frontend
    res.json({ token });

  } catch (error) {
    console.error('Error al hacer login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});



  
  
  
  module.exports = router;  // Exportar las rutas para usarlas en app.js