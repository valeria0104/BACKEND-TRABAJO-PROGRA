const express = require('express');
const router = express.Router();
const { reserva } = require('../db/models'); // Cambiado desde '../db/models/index'

router.get('/ver', async (req, res) => {
  try {
    const reservas = await reserva.findAndCountAll();
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;