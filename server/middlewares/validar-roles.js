import {response} from 'express';

const isAdminRole = (req, res=response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
}


const tieneRol = (...roles) => {

    return (req, res=response, next) => {

        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(500).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    }

}

export {
    isAdminRole,
    tieneRol
}