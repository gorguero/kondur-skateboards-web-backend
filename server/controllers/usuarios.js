import response from 'express';
import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import generarJWT from '../helpers/generarjwt.js';


//Crear usuario
const createUser = async(req, res=response) => {

    const { nombre, apellido, nickname, email, password, direcciones } = req.body;

    try{

        const usuario = new Usuario( {nombre, apellido, nickname, email, password, direcciones} );

        //Encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Aqui lo guarda en la base de datos
        await usuario.save();

        const token = await generarJWT( usuario.uid );

        res.status(201).json({
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el usuario.'
        });
    }

}

//Obtener usuarios
const getUser = async(req, res) => {
    
    try {
        
        const usuarios = await Usuario.find();

        return res.json({
            ok: true,
            usuarios
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener un usuario.'
        });
    }
}

//Editar usuario
const updateUser = async(req, res = response) => {

    try {
        
        const {id} = req.params;
        const { _id, password, creadoEn, estado, ...resto } = req.body;

        if( password ){
            //Encripta la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

        const token = await generarJWT( usuario.uid );

        return res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar un usuario.'
        });
    }
}


export {
    createUser,
    getUser,
    updateUser,
}