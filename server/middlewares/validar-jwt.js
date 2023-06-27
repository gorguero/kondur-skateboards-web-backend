import {response} from 'express';
import jwt from 'jsonwebtoken';

const validarJWT = (req, res=response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No existe un token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        req.uid = uid;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

    next();
}


export default validarJWT;