import express from "express";
import { check } from "express-validator";
import { createProducto, getProducto, getProductos,updateProducto,deleteProducto } from "../controllers/productos.js";
import { isProductNameExist } from "../helpers/db-validations.js";
import { validarCampos } from "../middlewares/validaciones.js";

const router = express.Router();

//Crear Producto
router.post('/',[
    check('nombreProducto').custom(isProductNameExist),
    validarCampos
],createProducto);

//Obtener Productos
router.get('/', getProductos);

//Actualizar Producto
router.put('/:id',[
    check('nombreProducto').custom(isProductNameExist)
],updateProducto);

//Buscar un Producto
router.get('/:id', getProducto);

//Borrado logico de un Producto
router.delete('/:id', deleteProducto);

export default router;