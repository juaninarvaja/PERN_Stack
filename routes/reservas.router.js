const express = require('express');
router = express.Router();
const  { Reserva, Vehiculo} = require('../bbdd/models');

router.post('/create', async (req, res) => {
    try {
      const { fecha, vehiculoId, usuarioId, estado } = req.body;
  
      // Crear la reserva
      const nuevaReserva = await Reserva.create({
        fecha,
        vehiculoId,
        usuarioId,
        estado
      });
  
      // Actualizar el estado del vehículo
      const vehiculo = await Vehiculo.findByPk(vehiculoId);
      if (!vehiculo) {
        return res.status(404).send('Vehículo no encontrado');
      }
  
      // Suponiendo que el estado del vehículo puede ser "disponible", "reservado", etc.
      vehiculo.estado = 'reservado';  // Cambiar el estado del vehículo a "reservado"
      await vehiculo.save();  // Guardamos los cambios en el vehículo
  
      // Enviar la respuesta con la reserva y el vehículo actualizado
      res.status(201).json({
        reserva: nuevaReserva,
        vehiculo: vehiculo
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al crear la reserva y actualizar el vehículo');
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id);  // Encuentra la reserva por ID
      if (!reserva) {
        return res.status(404).send('Reserva no encontrada');
      }
      res.status(200).json(reserva);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener la reserva');
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { fecha, vehiculoId, usuarioId, estado } = req.body;
  
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).send('Reserva no encontrada');
      }
  
      // Actualizamos los campos de la reserva
      reserva.fecha = fecha || reserva.fecha;
      reserva.vehiculoId = vehiculoId || reserva.vehiculoId;
      reserva.usuarioId = usuarioId || reserva.usuarioId;
      reserva.estado = estado || reserva.estado;
  
      await reserva.save();  // Guardamos los cambios
      res.status(200).json(reserva);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al actualizar la reserva');
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).send('Reserva no encontrada');
      }
  
      await reserva.destroy();  // Elimina la reserva
      res.status(200).send('Reserva eliminada');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al eliminar la reserva');
    }
  });
  

  module.exports = router;  // Exportar las rutas para usarlas en app.js