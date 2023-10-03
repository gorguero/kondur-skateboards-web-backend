import {Schema, model} from "mongoose";

const tallaMedidaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        default: 0
    }
});

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
    tallas: [
        tallaMedidaSchema // Un array de tallas o medidas
    ], 
    estado:{
        type: Boolean,
        default: true
    }
});

export default model('Producto', productoSchema);