const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validaciones');
const {createUser, getUser, updateUser, deleteUser} = require('../controllers/usuarios');
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

module.exports = router;