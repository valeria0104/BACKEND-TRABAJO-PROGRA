const express = require('express');
const router = express.Router();
const db = require('../db/models/index');

router.get('/categoria', async (req, res) => {
  try {
    // Cambia 'TrabajoFinalProgra' por el nombre de tu base de datos
    const categorias = await db.libro.findAll({
      attributes: ['categoria'],
      group: ['categoria'],
    });

    if (categorias.length === 0) {
      return res.status(404).json({ error: 'No se encontraron categorías' });
    }

    // Utiliza un conjunto para almacenar categorías únicas
    const categoriasUnicas = new Set(categorias.map(c => c.categoria));

    res.json({ categorias: Array.from(categoriasUnicas) });
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/libros', async (req, res) => {
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


module.exports = router;

