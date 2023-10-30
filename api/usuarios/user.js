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



  module.exports = ruta