import { MercadoPagoConfig, Preference, Payment} from "mercadopago";
import dotenv from "dotenv";
import { createVenta } from "./ventas.js";
dotenv.config();

// Anclaje de cuenta MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

// Objeto de preferencia
const preference = new Preference(client);
let products = [];
let facturacion = {};
let userId = "";

const payment = new Payment(client);
const createOrder = async (req, res) => {
  try {
    // console.log("Preferencia antes de la solicitud a MercadoPago:", preference);
    products = req.body.productos;
    facturacion = req.body.facturacion;
    userId = req.body.user;

    // Crear un array de items para la preferencia de MercadoPago
    const items = products.map((producto) => ({
      title: producto.nombreProducto,
      currency_id: "ARS",
      description: producto.descripcion,
      picture_url: producto.imagen,
      unit_price: Number(producto.precio),
      quantity: Number(producto.cantidad),
    }));

    const envio = {
      phone: { number: Number(facturacion.nro_contacto) },
      address: {
        zip_code: Number(facturacion.codPostal),
        street_name: facturacion.direccion,
      },
      email: facturacion.email,
      identification: {
        number: Number(facturacion.numero_documentacion),
        type: facturacion.tipo_documentacion,
      },
      name: facturacion.nombre,
      surname: facturacion.apellido,
      date_created: new Date().toISOString(),
    };

    const result = await preference.create({
      body: {
        items: items,
        payer: envio,
        back_urls: {
          success: "http://localhost:4200/api/",
          failure: "http://www.failure.com",
          pending: "http://www.pending.com",
        },
        notification_url:"https://8b6c-2803-9800-9484-a332-d1e9-1edb-abdf-6de3.ngrok-free.app/api/payment/webhook",
        auto_return: "approved",
      },
    });
    
    // console.log("MERCADOPAGO API: ", result);
    res.status(200).json(result.init_point);
  } catch (error) {
    console.error("Error al crear la orden:", error.message);
    res.status(500).json(error.message);
  }
  // crear venta
};

const receiveWebHook = async (req, res) => {
  try{

    const paymentInfo = req.query;
    const idPago = req.query['data.id'];
    const productos = products;
    const facturacionInfo = facturacion;
    const usuario = userId;
    console.log("ESTOS SON LOS PRODUCROS QUE SE MANDAN: ", productos);
    console.log("ID DEL USUARIO SI HAY: ",usuario);
    console.log("DATOS DE FACTURACION: ", facturacionInfo);
    console.log("ESTE ES EL ID DEL PAGO: ", idPago);
    const data = payment.get({id:idPago})
    const estado = (await data).status;
    console.log("ESTE ES EL ESTADO DEL PAGO: ",estado);

    await createVenta(productos, facturacionInfo, usuario, estado, res);
  }catch (error) {
    console.error("Error en el webhook:", error.message);
    res.status(500).json(error.message);
  }
};

export { createOrder, receiveWebHook };
