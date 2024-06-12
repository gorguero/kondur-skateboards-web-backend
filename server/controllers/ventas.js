import Venta from '../models/venta.js';
import PDFDocument from 'pdfkit-table';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

//Obtener ventas paginadas
const getPaginatedVentas = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    try {

        const [ ventas, totalVentas ] = await Promise.all([
            Venta.find({estado: 'approved'}).skip(desde).limit(5),
            Venta.countDocuments()
        ]);
        
        res.status(200).json({
            ventas,
            totalVentas
        });
    }catch(error){
        console.log(error)
        res.status(500).json({error});
    }

}

// Obtener venta segun el id del usuario
const getVentasByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        console.log(`Buscando ventas para el usuario con ID: ${userId}`);

        // Verificar si userId es un ID válido
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                ok: false,
                msg: 'ID de usuario no válido'
            });
        }

        const ventas = await Venta.find({ user_id: userId });
        console.log(`Ventas encontradas: ${ventas.length}`);

        res.status(200).json({
            ventas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener ventas.'
        });
    }
};

const getVentaById = async (req, res)=>{
    try{
        let venta = await Venta.findById(req.params.id);
        if(!venta){
            console.log(venta);
            res.status(404).json({msg:'No existe la compra'})
        }
        res.json(venta);
    }catch(error){
        console.log(error);;
        res.status(500).send('Hubo un error');
    }
}

// Crear PDF de facturación
const createPDF = (orderNumber, orderItems, shippingDetails) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const fileName = `detalle-compra-${orderNumber}.pdf`; // Nombre del archivo con el ID de la venta
        const filePath = path.join(__dirname, '..', fileName);
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(20).text(`DETALLE DE COMPRA #${orderNumber}`, { align: 'center' });

        const tableData = {
            headers: ['Productos', 'Precio', 'Cantidad', 'Total'],
            rows: orderItems.map(item => [
                `${item.name}`, 
                `$${item.price}`, 
                item.quantity, 
                `$${item.total}`
            ])
        };

        tableData.rows.push(['', '', 'SubTotal:', `$${orderItems.reduce((sum, item) => sum + item.total, 0)}`]);

        doc.moveDown().table(tableData, {
            prepareHeader: () => doc.fontSize(12).font('Helvetica-Bold'),
            prepareRow: (row, i) => doc.fontSize(12).font('Helvetica')
        });

        doc.moveDown().fontSize(16).text('Detalle de envío:', { underline: true });
        doc.fontSize(12).text(`Provincia: ${shippingDetails.province}`);
        doc.text(`Localidad: ${shippingDetails.city}`);
        doc.text(`Dirección: ${shippingDetails.address}`);
        doc.text(`Código Postal: ${shippingDetails.postalCode}`);
        doc.text(`Teléfono: ${shippingDetails.phone}`);

        doc.end();

        stream.on('finish', () => resolve(fileName)); // Resolvemos con el nombre del archivo
        stream.on('error', (err) => reject(err));
    });
};

// Controlador para generar el PDF basado en el ID de la venta
const generatePDFById = async (req, res) => {
    try {
        const ventaId = req.params.id;

        // Buscar la venta en la base de datos
        const venta = await Venta.findById(ventaId);
        if (!venta) {
            return res.status(404).send('Venta no encontrada');
        }

        // Extraer la información necesaria de la venta
        const orderItems = venta.productos.map(producto => ({
            name: producto.nombreProducto,
            price: producto.precio,
            quantity: producto.cantidad,
            total: producto.precio * producto.cantidad
        }));

        const shippingDetails = {
            province: venta.direccion_envio.provincia,
            city: venta.direccion_envio.localidad,
            address: venta.direccion_envio.direccion,
            postalCode: venta.direccion_envio.codPostal,
            phone: venta.direccion_envio.telefono
        };

        // Generar el PDF
        const fileName = await createPDF(venta._id, orderItems, shippingDetails);

        // Enviar el archivo PDF generado al cliente
        res.download(path.join(__dirname, '..', fileName), fileName);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el PDF');
    }
};

export{
    createVenta,
    getVentas,
    getPaginatedVentas,
    getVentasByUserId,
    getVentaById,
    generatePDFById
}