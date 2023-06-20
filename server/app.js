const express = require('express');
const {dbCONN} = require('./database/db');
require('dotenv').config();
const app = express();

// dbCONN(); //Conexion a la bd

//Rutas

//Rutas de Usuarios
app.use('', require('./routes/usuarios'));

app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT} en marcha`);
})