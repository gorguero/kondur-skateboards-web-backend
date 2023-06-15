const express = require('express');
require('dotenv').config();
const app = express();

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