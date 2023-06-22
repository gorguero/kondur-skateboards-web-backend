import Router from 'express';
import {check} from 'express-validator';

import { isRoleValid, isEmailExist, isNicknameExist, isUserExist } from '../helpers/db-validations.js';
import { validarCampos } from '../middlewares/validaciones.js';
import {createUser, getUser, updateUser, deleteUser} from '../controllers/usuarios.js';

const router = Router();

//Crear usuario
router.post( '/', [
    check('nombre', "El nombre es obligatorio.").not().isEmpty(),
    check('apellido', "El apellido es obligatorio.").not().isEmpty(),
    check('nickname', "El nombre de usuario es obligatorio.").not().isEmpty(),
    check('nickname').custom( isNicknameExist ),
    check('password', "La contraseña debe ser mayor a 6 caracteres.").isLength({min:6}),
    check('email', "El email es obligatorio.").isEmail(),
    check('email').custom( isEmailExist ),
    check('rol').custom( isRoleValid ),
    validarCampos
] , createUser )

//Obtener usuario
router.get( '/', getUser )

//Editar usuario
router.put( '/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isUserExist ),
    check('nombre', "El nombre es obligatorio.").not().isEmpty(),
    check('apellido', "El apellido es obligatorio.").not().isEmpty(),
    check('nickname', "El nombre de usuario es obligatorio.").not().isEmpty(),
    check('nickname').custom( isNicknameExist ),
    check('password', "La contraseña debe ser mayor a 6 caracteres.").isLength({min:6}),
    check('email', "El email es obligatorio.").isEmail(),
    check('email').custom( isEmailExist ),
    check('rol').custom( isRoleValid ),
    validarCampos
],updateUser )

//Eliminar usuario
router.delete( '/', deleteUser )

export default router;