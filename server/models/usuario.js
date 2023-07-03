import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    nickname: {
        type: String,
        required: [true, 'El nickname es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    repeatPassowrd: {
        type: String
    },
    direcciones: [
        { calle1: String, calle2: String, altura: String, cod_postal: String }
    ],
    creadoEn: {
        type: Date,
        default: Date.now()
    },
    actualizadoEn: {
        type: Date,
        default: Date.now()
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    }
});

//Renombra el _id
UsuarioSchema.method('toJSON', function() {
    const { __v, password, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

export default model('Usuarios', UsuarioSchema);