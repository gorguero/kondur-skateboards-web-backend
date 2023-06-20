const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    repeatPassowrd: {
        type: String
    },
    direcciones: [
        { calle1: String, calle2: String, altura: String, cod_postal: String }
    ],
    creadoEn: {
        type: String
    },
    actualizadoEn: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    }
});

//Renombra el _id
UsuarioSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuarios', UsuarioSchema);