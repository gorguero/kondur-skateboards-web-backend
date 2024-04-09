import { MercadoPagoConfig, Preference  } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();

// Anclaje de cuenta MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

// Objeto de preferencia
const preference = new Preference(client);
 
const createOrder = async (req, res) => {
  try {
    console.log('Preferencia antes de la solicitud a MercadoPago:', preference);
    const product = req.body;
    
    const result = await  preference.create(
      {body: {
        items: [
          {
            title: product.nombreProducto,
            currency_id: 'ARS',
            description: product.descripcion,
            picture_url: product.imagen,
            unit_price: Number(product.precio),
            quantity: Number(product.cantidad),
          }
        ],
        back_urls: {
          success: 'https://localhost:4200',
          failure: 'http://www.failure.com',
          pending: 'http://www.pending.com'
        },
        auto_return: "approved",
        
      }}
    );
    console.log('Respuesta de MercadoPago:', result);
    res.status(200).json(result.init_point);
  } catch (error) {
    console.error('Error al crear la orden:', error.message);
    res.status(500).json(error.message);
  }
};

const receiveWebHook = (req,res)=>{
  console.log(req.query);
  res.send('webHook');
}

export { createOrder,receiveWebHook };
