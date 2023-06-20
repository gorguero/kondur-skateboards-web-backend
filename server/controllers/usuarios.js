const {response} = require('express');
const Usuario = require('../models/usuario');


//Crear usuario
const createUser = async(req, res=response) => {
    
    const { email, password } = req.body;

    try{

        const usuario = new Usuario( req.body )

        //Aqui lo guarda en la base de datos
        await usuario.save();

        res.json({
            ok: true,
            usuario
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el usuario.'
        })
    }

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