const express = require('express');
const {dbCONN} = require('./database/db');
require('dotenv').config();
const app = express();

dbCONN();

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Conectado a Kondur Backend'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT} en marcha`);
})