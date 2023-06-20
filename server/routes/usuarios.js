const {Router} = require('express');
const {createUser, getUser, updateUser, deleteUser} = require('../controllers/usuarios');
const router = Router();

//Crear usuario
router.post( '/', createUser )

//Obtener usuario
router.get( '/', getUser )

//Editar usuario
router.put( '/:id', updateUser )

//Eliminar usuario
router.delete( '/', deleteUser )

module.exports = router;