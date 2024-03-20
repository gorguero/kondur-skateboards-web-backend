import Producto from "../models/producto.js";
import { json } from "express";

//Crear Producto
const createProducto = async (req, res)=>{
    
    try {
        let producto;
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtener Productos
const getProductos = async (req, res)=>{

    const desde = Number(req.query.desde) || 0;

    try {

        const [ productos, totalProductos ] = await Promise.all([
            Producto.find({estado: true}).skip(desde).limit(5),
            Producto.countDocuments()
        ]);
        
        res.status(200).json({
            productos,
            totalProductos
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const updateProducto = async (req, res) => {
    try {
        const { nombreProducto, descripcion, imagen, precio, categoria, estado, tallas, medidas } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msj: "No existe el producto" });
        }

        producto.nombreProducto = nombreProducto;
        producto.descripcion = descripcion;
        producto.imagen = imagen;
        producto.precio = precio;
        producto.categoria = categoria;
        producto.estado = estado;
        producto.tallas = tallas;
        producto.medidas = medidas;

        producto = await producto.save(); // Guarda los cambios
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

//     try{
//         const {id} = req.params;
//         const {_id,nombreProducto, descripcion, precio, estado, ...resto} = req.body;
        
//         const producto = await Producto.findOneAndUpdate({ _id: id }, resto, {new: true});
//         console.log(producto);
//         return res.json({
            
//             producto
//         });
//     } catch(error){
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg:'Hubo un error al actulizar un producto.'
//         });
//     }
}

//Buscar un Producto 
const getProducto = async(req, res)=>{
    
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({msg:'No existe el producto'})
        }
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Eliminar producto
const deleteProducto = async(req, res)=>{
    try {
        let producto = await Producto.findOne({
            "_id": req.params.id,
            "estado": false
        });

        producto = await Producto.findOneAndUpdate({_id: req.params.id}, {estado: false}, {new: true})
        res.json({msj:'Porducto eliminado con exito!'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('NO SE ENCONTRO EL ID');
    }
}

export{
    createProducto,
    getProductos,
    updateProducto,
    getProducto,
    deleteProducto
}