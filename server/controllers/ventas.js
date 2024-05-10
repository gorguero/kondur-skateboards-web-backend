import Venta from '../models/venta.js';

//Crear Venta
const createVenta = async (productos,factuacion,usuario, res) => {
    try {
        let venta;
        const ventaData = req.body;

        // Si hay un user_id en los datos de la venta, asignarlo correctamente
        if (ventaData.user_id) {
            ventaData.user_id = req.body.user_id;
        }

        // Crear una nueva instancia de Venta con los datos recibidos
        venta = new Venta(ventaData);

        // Guardar la venta en la base de datos
        await venta.save();

        // Enviar la venta creada como respuesta
        res.status(201).json(venta);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
// const createVenta = async (req, res) => {
//     try {
//         let venta;
//         const ventaData = req.body;

//         // Si hay un user_id en los datos de la venta, asignarlo correctamente
//         if (ventaData.user_id) {
//             ventaData.user_id = req.body.user_id;
//         }

//         // Crear una nueva instancia de Venta con los datos recibidos
//         venta = new Venta(ventaData);

//         // Guardar la venta en la base de datos
//         await venta.save();

//         // Enviar la venta creada como respuesta
//         res.status(201).json(venta);
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error');
//     }
// };


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