import express from "express";
import { check } from "express-validator";
import { createProducto, getProducto, getProductos,updateProducto,deleteProducto } from "../controllers/productos.js";
import { isProductNameExist, isDescriptionProductExist, isValueMin, isProductExistById } from "../helpers/db-validations.js";
import { validarCampos } from "../middlewares/validaciones.js";

const router = express.Router();

//Crear Producto
router.post('/',[
    check('nombreProducto', 'El nombre del producto es obligatorio.').not().isEmpty(),
    check('nombreProducto').custom(isProductNameExist),
    check('descripcion', 'La descripción del producto es requerida.').not().isEmpty(),
    check('descripcion').custom(isDescriptionProductExist),
    check('descripcion', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('imagen', 'La url de la imagen es requerida.').not().isEmpty(),
    check('precio', 'El valor del precio es requerido.').not().isEmpty(),
    check('precio').custom(isValueMin),
    check("tallas", "Debe proporcionar al menos una talla").custom(isValueMin),
    check("medidas", "Debe proporcionar al menos una medida").custom(isValueMin),
    check('categoria', 'La categoria es requerida.').not().isEmpty(),
    validarCampos
],createProducto);

//Obtener Productos
router.get('/', getProductos);

//Actualizar Producto
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isProductExistById ),
    check('nombreProducto', 'El nombre del producto es obligatorio.').not().isEmpty(),
    check('descripcion', 'La descripción del producto es requerida.').not().isEmpty(),
    check('descripcion', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('imagen', 'La url de la imagen es requerida.').not().isEmpty(),
    check('precio', 'El valor del precio es requerido.').not().isEmpty(),
    check('precio').custom(isValueMin),
    check("tallas", "Debe proporcionar al menos una talla").isArray().notEmpty(),
    check("medidas", "Debe proporcionar al menos una medida").isArray().notEmpty(),
    check('categoria', 'La categoria es requerida.').not().isEmpty(),
    validarCampos
],updateProducto);

//Buscar un Producto
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isProductExistById ),
    validarCampos
], getProducto);

//Borrado logico de un Producto
router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isProductExistById ),
    validarCampos
], deleteProducto);

export default router;