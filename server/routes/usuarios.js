import Router from 'express';
import {check} from 'express-validator';

import { isRoleValid, isEmailExist, isNicknameExist, isUserExist, isNroContactExist } from '../helpers/db-validations.js';
import { validarCampos } from '../middlewares/validaciones.js';
import {createUser, getUsers, updateUser, getUserById} from '../controllers/usuarios.js';
import validarJWT from '../middlewares/validar-jwt.js';
import { isAdminRole, tieneRol } from '../middlewares/validar-roles.js';

const router = Router();

//Crear usuario
router.post( '/', [
    check('nombre', "El nombre es obligatorio.").not().isEmpty(),
    check('apellido', "El apellido es obligatorio.").not().isEmpty(),
    check('nickname', "El nombre de usuario es obligatorio.").not().isEmpty(),
    check('nickname').custom( isNicknameExist ),
    check('password', "La contraseña debe ser mayor a 6 caracteres.").isLength({min:6}),
    check('email', "El email es obligatorio.").not().isEmpty(),
    check('email', "Ingrese un email válido.").isEmail(),
    check('email').custom( isEmailExist ),
    check('nro_contacto', "El número de contacto es requerido.").not().isEmpty(),
    check('nro_contacto').custom( isNroContactExist ),
    validarCampos
] , createUser )

//Obtener usuario
router.get( '/', validarJWT, getUsers )

//Obtener usuario por id
router.get( '/byid', getUserById )

//Editar usuario
router.put( '/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isUserExist ),
    check('nombre', "El nombre es obligatorio.").not().isEmpty(),
    check('apellido', "El apellido es obligatorio.").not().isEmpty(),
    check('nickname', "El nombre de usuario es obligatorio.").not().isEmpty(),
    check('nickname').custom( isNicknameExist ),
    // check('password', "La contraseña debe ser mayor a 6 caracteres.").isLength({min:6}),
    check('email', "El email es obligatorio.").isEmail(),
    check('email').custom( isEmailExist ),
    // check('rol').custom( isRoleValid ),
    validarCampos
],updateUser )


export default router;