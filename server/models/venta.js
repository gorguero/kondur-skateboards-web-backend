import {Schema, model} from "mongoose";

const ventasSchema = Schema({
    idVenta:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    productos:{
        type: Array,
        required: true
    },
    total:{
        type: Number
    },
    direccion_envio:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    creado_en: {
        type: Date,
        default: Date.now()
    }
})

export default model('Venta', ventasSchema);