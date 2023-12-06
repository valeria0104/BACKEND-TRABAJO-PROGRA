const express = require('express');
const router = express.Router();
const { reserva, libro } = require('../db/models'); // Cambiado desde '../db/models/index'

router.get('/raw', async (req, res) => {
  try {
    const reservas = await reserva.findAndCountAll();
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/libros-reserva', async (req, res) => {
  try {
    const reservas = await reserva.findAll({
      include: [
        { model: libro, as: 'libroreserva' } // Utiliza el alias 'libroreserva'
      ],
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.delete('/cancelarReserva', async (req, res) => {
  const { idLibro } = req.query;

  try {
    const resultado = await reserva.destroy({
      where: { idLibro: idLibro }
    });

    if (resultado) {
      res.status(200).json({ mensaje: 'Reserva eliminada exitosamente.' });
    } else {
      res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const verificarAutenticacion = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Si el usuario está autenticado, continúa con la solicitud
    return next();
  } else {
    // Si el usuario no está autenticado, responde con un código de estado 401 (No autorizado)
    res.status(401).send('No autorizado');
  }
};

router.post('/reservarAhora', verificarAutenticacion, async (req, res) => {
  const { idLibro, fechainicio, fechafinal } = req.body;

  try {
    // La información del usuario autenticado está disponible en req.user (suponiendo Passport.js)
    const idUsuario = req.user.id; // Ajusta esto según la estructura de tu modelo de usuario

    // Crea la reserva en la base de datos
    const nuevaReserva = await reserva.create({
      idLibro,
      idUsuario,
      fechainicio,
      fechafinal,
    });

    // Devuelve la nueva reserva como respuesta
    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error('Error al realizar la reserva:', error);
    res.status(500).send('Error interno del servidor');
  }
});


module.exports = router;