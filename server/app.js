import express  from 'express';
import "dotenv/config.js";
import cors from 'cors';

import dbCONN from "./database/db.js";
import usuarioRoutes from './routes/usuarios.js';
import checksRoutes from './routes/checks.js';
import productoRoutes from "./routes/productos.js";

const app = express();

dbCONN(); //Conexion a la bd

app.use( cors() );

//Rutas
app.use( express.json() ); //Lectura del json

//Rutas de Usuarios
app.use('/api/usuarios', usuarioRoutes);

//Rutas de Checks
app.use('/api/checks', checksRoutes);

//Rutas de producto
app.use('/api/productos',productoRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT} en marcha`);
})