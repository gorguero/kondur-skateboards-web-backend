import response from 'express';
import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';


//Crear usuario
const createUser = async(req, res=response) => {

    const { nombre, apellido, nickname, email, password, rol } = req.body;

    try{

        const usuario = new Usuario( {nombre, apellido, nickname, email, password, rol} );

        //Encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Aqui lo guarda en la base de datos
        await usuario.save();

        res.status(201).json({
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

export {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}