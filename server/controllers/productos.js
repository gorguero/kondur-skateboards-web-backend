import Producto from "../models/producto.js";

const createProducto = async (req, res)=>{
    try {
        let producto;

        //Crear Producto
        producto = new Producto(req.body);

        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export{
    createProducto
}