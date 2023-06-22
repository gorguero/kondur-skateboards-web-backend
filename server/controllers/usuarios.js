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
const getUser = async(req, res) => {
    
    const usuarios = await Usuario.find();

    return res.json({
        ok: true,
        usuarios
    })
}

//Editar usuario
const updateUser = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, creadoEn, estado, ...resto } = req.body;

    if( password ){
        //Encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    return res.json({
        ok: true,
        usuario
    })
}

//Eliminar usuario
const deleteUser = async(req, res) => {

    const {id} = req.params;

    //Eliminado lógico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    return res.json({
        ok: true,
        usuario
    })
}

export {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}