const {Router} = require('express');

const router = Router();

//Crear usuario
router.post( '/', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Creando usuario'
    })
} )

//Obtener usuario
router.get( '/', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Obteniendo usuario'
    })
} )

//Editar usuario
router.put( '/:id', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Editando usuario'
    })
} )

//Eliminar usuario
router.delete( '/', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Eliminando usuario'
    })
} )

module.exports = router;