import {Schema, model} from "mongoose";

const tallas = Schema({
    s: {
        type: Number,
        default: 0
    },
    m: {
        type: Number,
        default: 0
    },
    l: {
        type: Number,
        default: 0
    },
    xl: {
        type: Number,
        default: 0
    }
});
 const medidas = Schema({
    chico: {
        type: Number,
        default: 0
    },
    mediano: {
        type: Number,
        default: 0
    },
    grande: {
        type: Number,
        default: 0
    }
 })

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
    creado_en: {
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: String,
        required: true
    },
    tallas: tallas,
    medidas:
        medidas
    , 
    estado:{
        type: Boolean,
        default: true
    }
});

export default model('Producto', productoSchema);