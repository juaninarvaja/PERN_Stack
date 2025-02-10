const express = require('express');
router = express.Router();
const  { Vehiculo } = require('../bbdd/models');

router.post('/create', async (req, res) => {
    try {
      const { marca, modelo, ano, precio, tipo, kilometros, estado, picture } = req.body;
      const pictureSaved = picture ? picture : 'https://media.istockphoto.com/id/1214396728/es/vector/icono-rojo-del-coche-aislado-en-el-fondo-blanco-clip-art-coche-rojo-lindo-ilustraci%C3%B3n-del.jpg?s=612x612&w=0&k=20&c=G6QrM0Mt0lGSAqmuPaHqtxTR-TvrQYN0jw0hkj5Vb0M=';
      const nuevoVehiculo = await Vehiculo.create({
        marca,
        modelo,
        ano,
        precio,
        tipo,
        kilometros,
        estado,
        picture: pictureSaved
      });
      res.status(201).json(nuevoVehiculo);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al crear el vehículo');
    }
  });

  router.get('/', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.findAll();  // Obtiene todos los vehículos
      res.status(200).json(vehiculos);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener los vehículos');
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const vehiculo = await Vehiculo.findByPk(id);  // Encuentra el vehículo por ID
      if (!vehiculo) {
        return res.status(404).send('Vehículo no encontrado');
      }
      res.status(200).json(vehiculo);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener el vehículo');
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { marca, modelo, anio, color, precio } = req.body;
  
      const vehiculo = await Vehiculo.findByPk(id);
      if (!vehiculo) {
        return res.status(404).send('Vehículo no encontrado');
      }
  
      // Actualizamos los campos del vehículo
      vehiculo.marca = marca || vehiculo.marca;
      vehiculo.modelo = modelo || vehiculo.modelo;
      vehiculo.anio = anio || vehiculo.anio;
      vehiculo.color = color || vehiculo.color;
      vehiculo.precio = precio || vehiculo.precio;
  
      await vehiculo.save();  // Guardamos los cambios
      res.status(200).json(vehiculo);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al actualizar el vehículo');
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const vehiculo = await Vehiculo.findByPk(id);
      if (!vehiculo) {
        return res.status(404).send('Vehículo no encontrado');
      }
  
      await vehiculo.destroy();  // Elimina el vehículo
      res.status(200).send('Vehículo eliminado');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el vehículo');
    }
  });
  
  
  
  

  
  module.exports = router;  // Exportar las rutas para usarlas en app.js