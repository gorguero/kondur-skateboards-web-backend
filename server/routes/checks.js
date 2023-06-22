import { Router } from "express";
import {check} from 'express-validator';

import { validarCampos } from "../middlewares/validaciones.js";
import { createCheck, deleteCheck, getCheck, updateCheck } from "../controllers/checks.js";
import { isTitleExist, isDescriptionExist, isUrlVideoExist, isCheckExist } from '../helpers/db-validations.js';

const router = Router();

//Crear check
router.post('/', [
    check('titulo', "El titulo es obligatorio.").not().isEmpty(),
    check('titulo').custom( isTitleExist ),
    check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
    check('descripcion', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('descripcion').custom( isDescriptionExist ),
    check('filmer_name', 'El nombre del filmer es requerido.').not().isEmpty(),
    check('filmer_name', 'Solo puede contener hasta 54 caracteres.').isLength({max: 54}),
    check('contacto', 'El contacto es obligatorio.').not().isEmpty(),
    check('contacto', 'Solo puede contener hasta 40 caracteres.').isLength({max: 40}),
    check('img_filmer', 'La url de la imagen es obligatoria.').not().isEmpty(),
    check('url_video', 'La url del video  es obligatoria.').not().isEmpty(),
    check('url_video').custom( isUrlVideoExist ),
    validarCampos
],createCheck);

//Obtener check
router.get('/', getCheck);

//Actualizar check
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isCheckExist ),
    check('titulo', "El titulo es obligatorio.").not().isEmpty(),
    check('titulo').custom( isTitleExist ),
    check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
    check('descripcion', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('descripcion').custom( isDescriptionExist ),
    check('filmer_name', 'El nombre del filmer es requerido.').not().isEmpty(),
    check('filmer_name', 'Solo puede contener hasta 54 caracteres.').isLength({max: 54}),
    check('contacto', 'El contacto es obligatorio.').not().isEmpty(),
    check('contacto', 'Solo puede contener hasta 40 caracteres.').isLength({max: 40}),
    check('img_filmer', 'La url de la imagen es obligatoria.').not().isEmpty(),
    check('url_video', 'La url del video  es obligatoria.').not().isEmpty(),
    check('url_video').custom( isUrlVideoExist ),
    validarCampos
],updateCheck);

//Eliminar check
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isCheckExist ),
    validarCampos
], deleteCheck);


export default router;