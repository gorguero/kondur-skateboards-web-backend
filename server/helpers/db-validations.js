import Check from '../models/check.js';
import Role from '../models/role.js';
import Usuario from '../models/usuario.js';

// Validations for Users
const isRoleValid = async(rol = '') => {
    const existRole = await Role.findOne({rol});
    if( !existRole ) throw new Error(`El rol ${rol} no está registrado en la BD.`);
}

const isEmailExist = async(email = '') => {
    const existEmail = await Usuario.findOne({ email });
    if( existEmail) throw new Error(`El email: ${email} ya está registrado.`);
}

const isNicknameExist = async(nickname = '') => {
    const existNickname = await Usuario.findOne({nickname});
    if( existNickname ) throw new Error(`El nickname: ${nickname} ya está registrado.`);
}

const isUserExist = async(id) => {
    const existUser = await Usuario.findById(id);
    if( !existUser ) throw new Error(`No existe un usuario con el id ${id}`);
}


// Validations for Checks
const isTitleExist = async(titulo = '') => {
    const existTitle = await Check.findOne({titulo});
    if( existTitle ) throw new Error(`El titulo: ${titulo} ya está registrado.`);
}

const isDescriptionExist = async(descripcion = '') => {
    const existTitle = await Check.findOne({descripcion});
    if( existTitle ) throw new Error(`La descripción ya está registrada.`);
}

const isUrlVideoExist = async(url_video = '') => {
    const existUrl = await Check.findOne({url_video});
    if( existUrl ) throw new Error('La url del video ya se encuentra registrada.');
}

const isCheckExist = async(id) => {
    const existCheck = await Check.findById(id);
    if( !existCheck ) throw new Error(`No existe un check con el id ${id}`);
}






export {
    isRoleValid,
    isEmailExist,
    isNicknameExist,
    isUserExist,
    isTitleExist,
    isDescriptionExist,
    isUrlVideoExist,
    isCheckExist
}