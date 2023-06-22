import express from "express";
import { createProducto, getProducto, getProductos,updateProducto,deleteProducto } from "../controllers/productos.js";

const router = express.Router();

//Crear Producto
router.post('/',createProducto);
router.get('/', getProductos);
router.put('/:id', updateProducto);
router.get('/:id', getProducto);
router.delete('/:id', deleteProducto);



export default router;