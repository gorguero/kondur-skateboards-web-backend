import express  from 'express';
import "dotenv/config.js";
import cors from 'cors';

import dbCONN from "./database/db.js";
import usuarioRoutes from './routes/usuarios.js';

const app = express();

dbCONN(); //Conexion a la bd

app.use( cors() );

//Rutas
app.use( express.json() ); //Lectura del json

//Rutas de Usuarios
app.use('/api/usuarios', usuarioRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT} en marcha`);
})