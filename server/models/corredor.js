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

CorredorSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

export default model('Corredores', CorredorSchema);