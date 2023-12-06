const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index');
const { reserva, libro, usuario } = require('../db/models'); 
// Ruta para obtener libros con búsqueda
ruta.get('/libros', async (req, res) => {
    try {
      // Cambia 'TrabajoFinalProgra' por el nombre de tu base de datos
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
      // Verificar si el libro existe
      const libroDisponible = await libro.findByPk(idLibro);
  
      if (!libroDisponible) {
        return res.status(400).json({ mensaje: 'El libro no existe o no está disponible para reserva.' });
      }
  
      // Crear la reserva
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
  

  ruta.get('/ultimas', async (req, res) => {
    try {
        // Cambia 'TrabajoFinalProgra' por el nombre de tu base de datos
        const reservas = await db.reserva.findAll({
          attributes: ["id","fechainicio","fechafinal","idUsuario","idLibro"],
        });

        const libroDisponible = await libro.findAll(idLibro);
        
    
        if (reservas.length === 0) {
          return res.status(404).json({ error: 'No se encontraron libros' });
        }
    
        res.json({ reservas });
      } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
  
  
  module.exports = ruta;