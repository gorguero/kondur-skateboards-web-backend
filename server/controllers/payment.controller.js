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
        notification_url:"https://2360-2803-9800-9484-a3ab-b8c9-7252-477c-9628.ngrok-free.app/api/payment/webhook",
        auto_return: "approved",
      },
    });
    
    // console.log("MERCADOPAGO API: ", result);
    res.status(200).json(result.init_point);
  } catch (error) {
    console.error("Error al crear la orden:", error.message);
    res.status(500).json(error.message);
  }
};

const receiveWebHook = async (req, res) => {

  try{

    const idPago = req.query['data.id'];

    if( idPago !== undefined ){

      const productos = products;
      const facturacionInfo = facturacion;
      const usuario = userId;

      const data = await payment.get({ id: idPago });
      console.log("ESTO ES DATA", data);
      const estado = data.status;

      await createVenta(productos, facturacionInfo, usuario, estado, res);
    }
    
  }catch (error) {
    console.error("Error en el webhook:", error.message);
    res.status(500).json(error.message);
  }
};

export { createOrder, receiveWebHook };
