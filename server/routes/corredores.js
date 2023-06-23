import { Router } from "express";
import {check} from "express-validator"

import { createCorredor, deleteCorredor, getCorredor, updateCorredor } from "../controllers/corredores.js";
import { validarCampos } from "../middlewares/validaciones.js";
import { isBiografiaExist, isCorredorExist, isCorredorByIdExist } from "../helpers/db-validations.js";

const router = Router();

//Crear un nuevo corredor
router.post('/', [
    check('nombre_rider', "El nombre del corredor es obligatorio.").not().isEmpty(),
    check('nombre_rider').custom( isCorredorExist ),
    check('biografia', 'La biografia es obligatoria.').not().isEmpty(),
    check('biografia', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('biografia').custom( isBiografiaExist ),
    check('url_imagen', 'La url del video  es obligatoria.').not().isEmpty(),
    validarCampos
], createCorredor);

//Obtener corredores
router.get('/', getCorredor);

//Editar un corredor
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isCorredorByIdExist ),
    check('nombre_rider', 'El nombre del corredor es obligatorio.').not().isEmpty(),
    check('nombre_rider').custom( isCorredorExist ),
    check('biografia', 'La biografia es obligatoria.').not().isEmpty(),
    check('biografia', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('biografia').custom( isBiografiaExist ),
    check('url_imagen', 'La url del video es obligatoria.').not().isEmpty(),
    validarCampos
], updateCorredor);

//Eliminar un corredor
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isCorredorByIdExist ),
    validarCampos
], deleteCorredor);

export default router;