import Check from '../models/check.js';
import Role from '../models/role.js';
import Usuario from '../models/usuario.js';
import Producto from '../models/producto.js';
import Corredor from '../models/corredor.js';

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
const isNroContactExist = async(nro_contacto = '') => {
    const existNroContact = await Usuario.findOne({nro_contacto});
    if( existNroContact ) throw new Error(`El número de contacto ingresado (${nro_contacto}) ya está registrado.`);
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

//Validaciones Productos
const isProductNameExist = async(nombreProducto = '') => {
    const isProductNameExist = await Producto.findOne({nombreProducto});
    if( isProductNameExist ) throw new Error(`El producto: ${nombreProducto} ya está registrado.`);
}
const isDescriptionProductExist = async(descripcion = '') => {
    const isDescriptionProductExist = await Producto.findOne({descripcion});
    if( isDescriptionProductExist ) throw new Error(`La descripción ya está registrada.`);
}
const isValueMin = async(precio) => {
    if( precio < 0 ) throw new Error(`No puede ingresar valores negativos`);
}
const isProductExistById = async(id) => {
    const existProduct = await Producto.findById(id);
    if( !existProduct ) throw new Error(`No existe un producto con el id ${id}`);
}

// Validations for Corredores
const isCorredorExist = async(nombre_rider = '') => {
    const existCorredor = await Corredor.findOne({nombre_rider});
    if( existCorredor ) throw new Error(`${nombre_rider} ya está registrado.`);
}
const isBiografiaExist = async(biografia = '') => {
    const existBio = await Corredor.findOne({biografia});
    if( existBio ) throw new Error(`La biografía ya está registrada.`);
}
const isCorredorByIdExist = async(id) => {
    const existCorredor = await Corredor.findById(id);
    if( !existCorredor ) throw new Error(`No existe un corredor con el id ${id}`);
}



export {
    isRoleValid,
    isEmailExist,
    isNicknameExist,
    isUserExist,
    isNroContactExist,
    isTitleExist,
    isDescriptionExist,
    isUrlVideoExist,
    isCheckExist,
    isProductNameExist,
    isCorredorExist,
    isBiografiaExist,
    isCorredorByIdExist,
    isDescriptionProductExist,
    isValueMin,
    isProductExistById
    // isCorredorDeleteByIdExist
}