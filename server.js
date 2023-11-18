const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');
////RUTA A NUESTRAS APIS////
const usuarios= require('./api/usuarios/user')

///ola
const app = express()
const port = 3080

////MIDDLEWARE
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json());

///(peticion: localhost:3080/api/users --> MI URL , direccionamiento: invocar a las rutas de user.js)
app.use('/api/users', usuarios)
///////////////////////////////////////
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
    console.log(`Server escuchando en el port::${port}`);
});

