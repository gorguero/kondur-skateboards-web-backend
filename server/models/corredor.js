import {Schema, model} from 'mongoose';

const CorredorSchema = Schema({
    nombre_rider: {
        type: String,
        required: [true, 'El nombre del corredor es requerido.']
    },
    biografia: {
        type: String,
        required: [true, 'La biografia es requerida.']
    },
    url_imagen: {
        type: String,
        required: [true, 'La url de la imagen es requerida.']
    },
    instagram:{
        type: String
    },
    facebook:{
        type: String
    },
    creadoEn: {
        type: Date,
        default: Date.now()
    },
    actualizadoEn: {
        type: Date,
        default: Date.now()
    },
    estado:{
        type: Boolean,
        default: true
    }
});



export default model('Corredores', CorredorSchema);