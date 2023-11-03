import jwt from 'jsonwebtoken';

const generarJWT = ( user ) => {

    return new Promise( (resolve, reject) => {

        const payload = {
            id: user._id.toString(),
            nombres: user.nombre,
            apellidos: user.apellido,
            username: user.nickname,
            email: user.email,
            rol: user.rol
        };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }
        });

    });

}


export default generarJWT;