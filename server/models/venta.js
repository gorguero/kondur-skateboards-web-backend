import {Schema, model} from "mongoose";

const direccion = Schema({
    provincia: {
        type: String,
        required: true},
    localidad:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    codPostal:{
        type: Number,
        required: true
    },
})

const comprador = Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    nro_contacto:{
        type: Number,
        required: true
    },
    tipo_documentacion:{
        type: String,
        required: true
    },
    numero_documentacion:{
        type: Number,
        required: true
    },

})

const ventasSchema = Schema({

    user_id:{
        type: String
    },
    productos:{
        type: Array,
        required: true
    },
    total:{
        type: Number
    },
    direccion_envio: direccion,
    comprador: comprador,
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