import { response } from "express";
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.js';
import generarJWT from '../helpers/generarjwt.js';
import getMenu from "../helpers/menu.js";

const login = async(req, res=response) => {

    const { nickname, password } = req.body;

    //Validar si el nickname existe
    const usuario = await Usuario.findOne({nickname});
    if( !usuario ){
        return res.status(400).json({
            msg: 'Username inválido'
        });
    }

    //Validamos si el usuario está activo
    if( !usuario.estado ){
        return res.status(400).json({
            msg: 'No se encuentra habilitado'
        });
    }

    //Verificamos la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if( !validPassword ){
        return res.status(400).json({
            msg: 'Contraseña inválida'
        });
    }

    //Generamos un JWT
    const token = await generarJWT( usuario );

    const menu = getMenu(usuario.rol);
    res.status(200).json({
        usuario,
        token,
        menu
    });
}

const renovarToken = async(req, res=response) => {

    const uid = req.uid;

    const usuario = await Usuario.findById(uid);

    const token = await generarJWT( usuario );


    res.json({
        token,
        usuario,
        menu: getMenu( usuario.rol )
    })

}

const existeUsuario = async(req, res=response) => {

    try {
        
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            res.status(400).json({
                msg: 'Usuario inexistente',
                usuario
            })
        }

        res.status(200).json({
            msg: 'Usuario existente',
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

export {
    login,
    renovarToken,
    existeUsuario
}