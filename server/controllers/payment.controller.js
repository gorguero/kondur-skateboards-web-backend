import { MercadoPagoConfig, Preference, Payment} from "mercadopago";
import dotenv from "dotenv";
// import { createVenta } from "./ventas";
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
        notification_url:"https://b293-181-10-133-19.ngrok-free.app/api/payment/webhook",
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
  const paymentInfo = req.query;
  const idPago = req.query['data.id'];
  console.log( paymentInfo );

  const paymentId = paymentInfo.id;

  const data = payment.get({id:idPago})
  .then(console.log)
  .catch(console.log)
  // try{
  //   const response = await fetch(`https://api.mercadopago.com/v1/payments/${idPago}`,{
  //     method: 'GET',
  //     headers:{
  //       'Authorizacion':`Bearer ${client}`
  //     }
  //   })
  //   if(response.ok){
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   res.sendStatus(500);
  // }catch(error){
  //   console.error('Error:',error);
  //   res.sendStatus(500);
  // }
};
// ANDA LA RESPUESTA DE NGROK

export { createOrder, receiveWebHook };
