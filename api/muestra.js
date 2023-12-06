const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index');
const { reserva, libro, usuario } = require('../db/models'); 
ruta.get('/libros', async (req, res) => {
    try {
      const libros = await db.libro.findAll({
        attributes: ['id', 'titulo', 'autor', 'descripcion', 'editorial', 'ISBN', 'categoria', 'imagenLibro', 'cantidadEjemplares'],
      });
  
      if (libros.length === 0) {
        return res.status(404).json({ error: 'No se encontraron libros' });
      }
  
      res.json({ libros });
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  ruta.post('/realizarReserva', async (req, res) => {
    const { idUsuario, idLibro, fechainicio, fechafinal } = req.body;
  
    try {
      const libroDisponible = await libro.findByPk(idLibro);
  
      if (!libroDisponible) {
        return res.status(400).json({ mensaje: 'El libro no existe o no está disponible para reserva.' });
      }
  
      const nuevaReserva = await reserva.create({
        idUsuario,
        idLibro,
        fechainicio,
        fechafinal,
      });
  
      res.status(200).json({ mensaje: 'Reserva realizada exitosamente.' });
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

 ruta.get('/reservasPorUsuario/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
  
    try {
      const reservas = await db.reserva.findAll({
        where: { idUsuario: idUsuario },
        include: [{ model: db.libro, as: 'libroreserva', attributes: ['titulo', 'imagenLibro'] }],
      });
  
      if (reservas.length === 0) {
        return res.status(404).json({ error: 'No se encontraron reservas para este usuario' });
      }
  
      const resultados = reservas.map((reserva) => ({
        libro: {
          titulo: reserva.libroreserva.titulo,
          imagenLibro: reserva.libroreserva.imagenLibro,
        },
        reserva: {
          fechaInicio: reserva.fechainicio,
          fechaFinal: reserva.fechafinal,
        },
      }));
  
      res.json(resultados);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

ruta.get('/librosMasPedidosPorUsuario/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
  
    try {
      const reservas = await db.reserva.findAll({
        where: { idUsuario: idUsuario },
        include: [
          {
            model: db.libro,
            as: 'libroreserva',
            attributes: ['id', 'titulo', 'imagenLibro'],
          },
        ],
      });
  
      const pedidosPorLibro = {};
      reservas.forEach((reserva) => {
        const libroId = reserva.libroreserva.id;
        if (!pedidosPorLibro[libroId]) {
          pedidosPorLibro[libroId] = {
            libro: reserva.libroreserva,
            cantidadPedidos: 0,
          };
        }
        pedidosPorLibro[libroId].cantidadPedidos += 1;
      });
  
      // Ordenar los libros por la cantidad de pedidos en orden descendente
      const librosMasPedidos = Object.values(pedidosPorLibro)
        .sort((a, b) => b.cantidadPedidos - a.cantidadPedidos)
        .slice(0, 10);
  
      res.json(librosMasPedidos);
    } catch (error) {
      console.error('Error al obtener los libros más pedidos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  function sumarDiasAFecha(fecha, dias) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha;
  }
  

 ruta.get('/librosProximosAVencer/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
  
    try {
      const reservas = await db.reserva.findAll({
        where: { idUsuario: idUsuario },
        include: [
          {
            model: db.libro,
            as: 'libroreserva',
            attributes: ['id', 'titulo', 'imagenLibro'],
          },
        ],
      });
  
      const hoy = new Date(); 
      const librosAMostrar2 = reservas.map((reserva) => {
        const fechaFinalReserva = new Date(reserva.fechafinal);
          const diasRestantes = Math.floor((fechaFinalReserva - hoy) / (1000 * 60 * 60 * 24));
  
        if (diasRestantes < 20) {
          return {
            titulo: reserva.libroreserva.titulo,
            imagenLibro: reserva.libroreserva.imagenLibro,
            fechaReserva: reserva.fechainicio,
            fechaFinal: reserva.fechafinal,
            imagenPortadaUrl: reserva.libroreserva.imagenLibro,
            diasRestantes: diasRestantes,
          };
        }
  
        return null;
      }).filter(Boolean);
  
      res.json(librosAMostrar2);
    } catch (error) {
      console.error('Error al obtener las reservas próximas a vencer:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
});
  
  module.exports = ruta;