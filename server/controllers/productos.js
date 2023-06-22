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
//Traer productos
const getProductos = async (req, res)=>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//Actializar productos
const updateProducto = async(req, res)=>{
    try {
        const {nombreProducto, descripcion, imagen, precio, stock, id_categoria} = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404),json({msj:"No exite el producto"})
        }

        producto.nombreProducto = nombreProducto;
        producto.descripcion = descripcion;
        producto.imagen = imagen;
        producto.precio = precio;
        producto.stock = stock;
        producto.id_categoria = id_categoria;

        producto = await Producto.findOneAndUpdate({_id: req.params.id}, producto, {new: true})
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//Obtener un producto en especifico 
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
        let producto = await Producto.findById(req.params.id);

        producto = await Producto.findOneAndUpdate({_id: req.params.id}, {estado: false}, {new: true})
        res.json({msj:'Porducto eliminado con exito!'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export{
    createProducto,
    getProductos,
    updateProducto,
    getProducto,
    deleteProducto
}