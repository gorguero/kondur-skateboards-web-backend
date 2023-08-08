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
        required: true,
        default: 0
    },
    creado_en: {
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: String,
        required: true
    },
    talle:{
        type: String,
        default: "-"
    },
    medida:{
        type: String,
        default: "-"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

export default model('Producto', productoSchema);