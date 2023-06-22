import { Router } from "express";
import {check} from "express-validator"

import { createCorredor, deleteCorredor, getCorredor, updateCorredor } from "../controllers/corredores.js";
import { validarCampos } from "../middlewares/validaciones.js";
import { isBiografiaExist, isCorredorExist } from "../helpers/db-validations.js";

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
router.get('/:id', updateCorredor);

//Eliminar un corredor
router.delete('/:id', deleteCorredor);

export default router;