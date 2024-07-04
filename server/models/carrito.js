import {Schema, model} from "mongoose";

const carritoSchema = Schema({
    producto:{
        type: Schema.ObjectId,
        ref: 'producto',
        required: true
    },
    usuario:{
        type: Schema.ObjectId,
        ref: 'usuario',
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    variedad:{
        type: String,
        required: true
    },
    creado_en: {
        type: Date,
        default: Date.now
    }

})
export default model('Carrito', carritoSchema);