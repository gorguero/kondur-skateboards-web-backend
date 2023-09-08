import { Router } from "express";
import {check} from 'express-validator';

import { validarCampos } from "../middlewares/validaciones.js";
import { createCheck, deleteCheck, getChecks, updateCheck, getCheck } from "../controllers/checks.js";
import { isTitleExist, isDescriptionExist, isUrlVideoExist, isCheckExist } from '../helpers/db-validations.js';

const router = Router();

//Crear check
router.post('/', [
    check('titulo', "El titulo es obligatorio.").not().isEmpty(),
    check('titulo').custom( isTitleExist ),
    check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
    check('descripcion', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('descripcion').custom( isDescriptionExist ),
    check('ig_filmer', 'El instagram del filmer es requerido.').not().isEmpty(),
    check('ig_rider', 'El instagram del rider es obligatoria.').not().isEmpty(),
    check('img_rider', 'la imagen del rider es obligatoria').not().isEmpty(),
    check('url_video', 'La url del video  es obligatoria.').not().isEmpty(),
    check('url_video').custom( isUrlVideoExist ),
    validarCampos
],createCheck);

//Obtener checks
router.get('/', getChecks);

//Actualizar check
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isCheckExist ),
    check('titulo', "El titulo es obligatorio.").not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
    check('descripcion', 'Debe contener solamente 250 caracteres.').isLength({max: 250}),
    check('ig_filmer', 'El instagram del filmer es requerido.').not().isEmpty(),
    check('ig_rider', 'El instagram del rider es obligatoria.').not().isEmpty(),
    check('img_rider', 'la imagen del rider es obligatoria').not().isEmpty(),
    check('url_video', 'La url del video  es obligatoria.').not().isEmpty(),
    validarCampos
],updateCheck);

//Buscar un check
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isCheckExist),
    validarCampos
], getCheck);

//Eliminar check
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isCheckExist ),
    validarCampos
], deleteCheck);


export default router;