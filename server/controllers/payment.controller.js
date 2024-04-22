import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

// Anclaje de cuenta MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

// Objeto de preferencia
const preference = new Preference(client);

const createOrder = async (req, res) => {
  try {
    console.log("Preferencia antes de la solicitud a MercadoPago:", preference);
    const products = req.body.productos;
    const facturacion = req.body.facturacion;
    console.log(products);
    console.log(facturacion);

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
          success: "https://localhost:4200",
          failure: "http://www.failure.com",
          pending: "http://www.pending.com",
        },
        auto_return: "approved",
      },
    });
    
    console.log("Respuesta de MercadoPago:", result);
    res.status(200).json(result.init_point);
  } catch (error) {
    console.error("Error al crear la orden:", error.message);
    res.status(500).json(error.message);
  }
  // crear venta
};

// const receiveWebHook = (req, res) => {
//   console.log(req.query);
//   res.send("webHook");
// };

export { createOrder };
