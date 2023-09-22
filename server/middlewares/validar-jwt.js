import {response} from 'express';
import jwt from 'jsonwebtoken';

import Usuario from '../models/usuario.js';

const validarJWT = async(req, res=response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No existe un token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        //Verificamos si no existe
        if( !usuario ){
            return res.status(401).json({
                msg: 'Usuario inexistente'
            })
        }

        //Validamos si el uid no tiene un estado false
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido / Usuario no disponible'
            })
        }

        req.uid = uid;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }
}


export default validarJWT;