import { MercadoPagoConfig, Preference  } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();

// Configurar MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

// Cria um objeto de preferência
const preference = new Preference(client);
 
const createOrder = async (req, res) => {
  try {
    console.log('Preferencia antes de la solicitud a MercadoPago:', preference);
    
    const result = await  preference.create(
      {body: {
        items: [
          {
            title: 'Tabla kondur',
            currency_id: 'ARS',
            description:'es una remerita linda',
            unit_price: 70,
            quantity: 1,
          }
        ],
        back_urls: {
          success: 'https://www.success.com',
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
