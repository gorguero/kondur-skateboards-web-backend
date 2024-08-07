import express  from 'express';
import "dotenv/config.js";
import cors from 'cors';

import dbCONN from "./database/db.js";
import usuarioRoutes from './routes/usuarios.js';
import checksRoutes from './routes/checks.js';
import productoRoutes from "./routes/productos.js";
import corredoresRoutes from './routes/corredores.js';
import ventasRoutes from './routes/ventas.js';
import authRoutes from './routes/auth.js';
import paymentRouters from './routes/payment.js';
import statsRoutes from './routes/stats.js';

const app = express();

dbCONN(); //Conexion a la bd

app.use( cors() );
app.use( express.json() ); //Lectura del json

//Rutas
app.use('/api/usuarios', usuarioRoutes); //Rutas de Usuarios
app.use('/api/checks', checksRoutes); //Rutas de Checks
app.use('/api/productos',productoRoutes); //Rutas de producto
app.use('/api/team', corredoresRoutes);//Rutas de Team
app.use('/api/auth', authRoutes) //Rutas de autenticación
app.use('/api/payment', paymentRouters); //Rutas de pago

//Rutas de Ventas
app.use('/api/ventas', ventasRoutes);

//Rutas de estadistica
app.use('/api/stats', statsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT} en marcha`);
})