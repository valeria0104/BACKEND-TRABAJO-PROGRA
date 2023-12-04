/* api para usuarios */

const express= require('express')
const ruta = express.Router()

const db = require('../db/models/index')


/////EJEMPLO DEL PROFE////////
const users = ['JOhn','Pepe'];
 //// http://localhost:3080/api/users/lee
ruta.get('/lee', (req, res) => {
    console.log('api/users invocada !')
    res.json(users);
  });

ruta.post('/inserta', (req, res) => {
    const user = req.body.user;
    console.log('Agregando user:::::', user);
    users.push(user);
    res.json("user agregado");
  });
///////////////////////////////


ruta.get('/datos', async (req, res) => {
  console.log("Entrando a los datos");
  try {
    let usuarios = await db.usuario.findAll({
      attributes: ['id', 'nombres', 'apellidos', 'tipodoc', 'numdoc', 'correo', 'contrasena', 'tipo' , 'imagenPerfil', 'idioma','prefijo','color' ]
    });

    usuarios.forEach(u => {
      console.log("USUARIO: ", u.get('id'), u.get('nombres'), u.get('apellidos'), u.get('tipodoc'), u.get('numdoc'), u.get('correo'), u.get('contrasena'), u.get('tipo') ,u.get('imagenPerfil'), u.get('idioma'), u.get('prefijo'), u.get('color'));
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

ruta.put('/editarUsuario', async (req, res) => {
  console.log("Entrando a los datos");
  const id = req.params.id;
  const { nombres, tipodoc, apellidos, numdoc, imagenPerfil } = req.body; // Datos del formulario recibidos desde el frontend
  try {
    const usuario = await db.usuario.findByPk(id);

    if (usuario) {
      console.log('Usuario encontrado');
      usuario.nombres = nombres || usuario.nombres;
      usuario.apellidos = apellidos || usuario.apellidos;
      usuario.tipodoc = tipodoc || usuario.tipodoc;
      usuario.numdoc = numdoc || usuario.numdoc;
      usuario.imagenPerfil = imagenPerfil || usuario.imagenPerfil;

      // Guarda los cambios en la base de datos
      await persona.update({nombres, tipodoc, apellidos, numdoc, imagenPerfil});


      return res.status(200).json({ message: 'Datos de usuario actualizados correctamente' });
    } else {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    return res.status(500).json({ error: 'Error en el servidor al actualizar datos' });
  }
});




  module.exports = ruta