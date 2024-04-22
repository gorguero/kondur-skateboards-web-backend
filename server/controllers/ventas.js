import Venta from '../models/venta.js';

//Crear Venta
const createVenta = async (req, res)=>{
    try {
        let venta;

        venta = new Venta(req.body);

        await venta.save();
        res.send(venta);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtener Ventas
const getVentas = async (req, res)=>{
    try {
        const ventas = await Venta.find();
        res.json(ventas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export{
    createVenta,
    getVentas
}