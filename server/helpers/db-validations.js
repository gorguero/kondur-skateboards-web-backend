import Role from '../models/role.js';
import Usuario from '../models/usuario.js';


const isRoleValid = async(rol = '') => {
    const existRole = await Role.findOne({rol});
    if( !existRole ) throw new Error(`El rol ${rol} no está registrado en la BD.`);
}

const isEmailExist = async(email = '') => {
    const existEmail = await Usuario.findOne({ email });
    if( existEmail) throw new Error(`El email: ${email} ya está registrado en la BD.`);
}

export {
    isRoleValid,
    isEmailExist
}