const express = require('express');
const port = 5000;
const app = express();

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Conectado a Kondur Backend'
    })
})

app.listen(port, () => {
    console.log(`Puerto ${port} en marcha`);
})