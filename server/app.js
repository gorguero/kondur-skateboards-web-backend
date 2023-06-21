import express  from 'express';
import "dotenv/config.js";

import dbCONN from "./database/db.js";
import usuarioRoutes from './routes/usuarios.js';
import productoRoutes from "./routes/productos.js";

const app = express();

dbCONN(); //Conexion a la bd

//Rutas
app.use( express.json() ); //Lectura del json

//Rutas de Usuarios
app.use('', usuarioRoutes);


//Rutas de producto
app.use('/api/productos',productoRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT} en marcha`);
})