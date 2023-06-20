const {response} = require('express');


//Crear usuario
const createUser = (req, res=response) => {
    return res.json({
        ok: true,
        msg: 'Creando usuario desde el controller'
    })
    // const { email, password } = req.body;

    // try{

    // }catch(error){
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hubo un error al crear el usuario.'
    //     })
    // }

}

//Obtener usuarios
const getUser = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Obteniendo usuario desde controller'
    })
}

//Editar usuario
const updateUser = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Editando usuario desde el controller'
    })
}

//Eliminar usuario
const deleteUser = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Eliminando usuario desde controller'
    })
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}