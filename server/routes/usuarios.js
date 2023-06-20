import Router from 'express';
import {check} from 'express-validator';

import { validarCampos } from '../middlewares/validaciones.js';
import {createUser, getUser, updateUser, deleteUser} from '../controllers/usuarios.js';

const router = Router();

//Crear usuario
router.post( '/', [
    check('nombre', "El nombre es obligatorio.").not().isEmpty(),
    check('apellido', "El apellido es obligatorio.").not().isEmpty(),
    check('nickname', "El nombre de usuario es obligatorio.").not().isEmpty(),
    check('email', "El email es obligatorio.").isEmail(),
    check('password', "La contraseña es obligatorio.").not().isEmpty(),
    validarCampos
] , createUser )

//Obtener usuario
router.get( '/', getUser )

//Editar usuario
router.put( '/:id', updateUser )

//Eliminar usuario
router.delete( '/', deleteUser )

export default router;