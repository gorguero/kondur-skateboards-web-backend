import {Schema, model} from "mongoose";

const productoSchema = Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    creado_en: {
        type: Date,
        default: Date.now()
    },
    id_categoria: {
        type: Number,
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    }
});

export default model('Producto', productoSchema);