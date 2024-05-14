import Venta from '../models/venta.js';

//Crear Venta
const createVenta = async (productos,facturacionInfo,usuario, estado, res) => {
    try {
        const venta = new Venta({
            user_id: usuario,
            productos: productos,
            direccion_envio: {
                provincia: facturacionInfo.provincia,
                localidad: facturacionInfo.localidad,
                direccion: facturacionInfo.direccion,
                telefono: facturacionInfo.nro_contacto,
                codPostal: facturacionInfo.codPostal,
            },
            comprador:{
                nombre: facturacionInfo.nombre,
                apellido: facturacionInfo.apellido,
                nro_contacto: facturacionInfo.nro_contacto,
                tipo_documentacion: facturacionInfo.tipo_documentacion,
                numero_documentacion: facturacionInfo.numero_documentacion,
            },
            estado: estado,
        });

        // Guardar la venta en la base de datos
        await venta.save();

        // Enviar la venta creada como respuesta
        res.status(201).json(venta);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
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