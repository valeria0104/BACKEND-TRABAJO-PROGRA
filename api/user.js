/* api para usuarios */

const express= require('express')
const ruta = express.Router()




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

ruta.post('/lectura', (req, res) => {
  const formData = req.body; // Los datos enviados desde el frontend estarán en req.body
  console.log('Datos recibidos:', formData);

  // Aquí puedes realizar alguna lógica con los datos recibidos, como autenticación, guardar en la base de datos, etc.

  // Por ejemplo, puedes enviar una respuesta al frontend
  res.status(200).json({ message: 'Datos recibidos correctamente en el backend' });
});

  module.exports = ruta