import Router from 'express';
import { existeUsuario, login, renovarToken } from '../controllers/auth.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validaciones.js';
import validarJWT from '../middlewares/validar-jwt.js';


const router = Router();

router.post('/login', [
    check('nickname', 'El username es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get('/renovartoken', validarJWT, renovarToken);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], existeUsuario);

export default router;