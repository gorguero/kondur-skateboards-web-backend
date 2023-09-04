import { Schema, model } from "mongoose";

const direcciones = Schema({
    calle1: {
        type: String,
        default: ''
    }, 
    calle2: {
        type: String,
        default: ''
    },
    altura: {
        type: String,
        default: ''
    },
    codpostal: {
        type: String,
        default: ''
    }
});

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
        required: [true, 'El nickname es obligatorio'],
        unique: true
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
    direcciones: [direcciones],
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
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
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