import { response } from "express"
import Corredor from "../models/corredor.js";

//Crear un nuevo corredor
const createCorredor = async(req, res=response) => {

    const { nombre_rider, biografia, url_imagen, instagram, facebook } = req.body;

    try {
        
        const corredor = new Corredor({nombre_rider, biografia, url_imagen, instagram, facebook});

        await corredor.save();

        res.status(201).json({
            msg: 'Creado exitosamente',
            corredor
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Hubo un error al crear un corredor'
        });
    }

}

//Obtener corredores
const getCorredor = (req, res) => {
    
}

//Editar un corredor
const updateCorredor = (req, res) => {
    
}

//Eliminar un corredor
const deleteCorredor = (req, res) => {
    
}


export {
    createCorredor,
    getCorredor,
    updateCorredor,
    deleteCorredor
}