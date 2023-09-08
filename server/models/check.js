import { Schema, model } from "mongoose";

const CheckSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio.']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria.']
    },
    ig_filmer: {
        type: String,
        required: [true, 'El nombre del filmer es requerido.']
    },
    ig_rider: {
        type: String,
        required: [true, 'El contacto es obligatorio.']
    },
    img_rider: {
        type: String,
        required: [true, 'La url de la imagen de perfil es requerida.']
    },
    url_video: {
        type: String,
        required: [true, 'La url del video es requerida.']
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


export default model('Check', CheckSchema);