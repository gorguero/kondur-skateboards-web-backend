import response from 'express';
import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import generarJWT from '../helpers/generarjwt.js';


//Crear usuario
const createUser = async(req, res=response) => {

    const { nombre, apellido, nickname, email, password, direcciones, nro_contacto } = req.body;

    try{

        const usuario = new Usuario( { nombre, apellido, nickname, email, password, direcciones, nro_contacto} );

        //Encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Aqui lo guarda en la base de datos
        await usuario.save();

        const token = await generarJWT( usuario );

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
const getUsers = async(req, res) => {
    
    try {
        
        const usuarios = await Usuario.find({estado: true});

        return res.json({
            ok: true,
            usuarios,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener un usuario.'
        });
    }
}

//Obtener usuario por nickname
const getUserById = async(req, res) => {

    try {
        
        const {data} = req.query;

        let userById = await Usuario.findById(data);

        return res.json({
            userById
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
const updateUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, nro_contacto, email, nickname, ...resto } = req.body;

        // Obtener el usuario actual de la base de datos
        const usuarioActual = await Usuario.findById(id);

        if (!usuarioActual) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar si el nuevo email ya está en uso por otro usuario (excluyendo el usuario actual)
        if (email && email !== usuarioActual.email) {
            const emailExistente = await Usuario.findOne({ email });
            if (emailExistente && emailExistente._id.toString() !== id) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está en uso por otro usuario'
                });
            }
            // Actualizar el email si es diferente y no está en uso
            usuarioActual.email = email;
        }

        // Verificar si el nuevo nickname ya está en uso por otro usuario (excluyendo el usuario actual)
        if (nickname && nickname !== usuarioActual.nickname) {
            const nicknameExistente = await Usuario.findOne({ nickname });
            if (nicknameExistente && nicknameExistente._id.toString() !== id) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El nickname ya está en uso por otro usuario'
                });
            }
            // Actualizar el nickname si es diferente y no está en uso
            usuarioActual.nickname = nickname;
        }

        // Actualizar otros campos
        usuarioActual.nombre = nombre;
        usuarioActual.apellido = apellido;
        usuarioActual.nro_contacto = nro_contacto;

        // Actualizar los campos restantes que no requieren verificación
        Object.assign(usuarioActual, resto);

        // Guardar los cambios
        await usuarioActual.save({ validateBeforeSave: true });

        const token = await generarJWT(usuarioActual);

        return res.json({
            usuario: usuarioActual,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el usuario.'
        });
    }
}


export {
    createUser,
    getUsers,
    updateUser,
    getUserById
}