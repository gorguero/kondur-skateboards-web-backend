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
const getCorredor = async(req, res=response) => {
    
    const corredores = await Corredor.find({estado: true});

    res.status(200).json({
        ok: true,
        corredores
    });
}

//Actualizar un corredor
const updateCorredor = async(req, res=response) => {
    
    const {id} = req.params;
    const { _id, ...resto } = req.body;

    const corredor = await Corredor.findByIdAndUpdate(id, resto, {new: true});

    res.status(200).json({
        msg: 'Corredor actualizado',
        corredor
    });

}

//Eliminar un corredor
const deleteCorredor = async(req, res) => {
    
    const {id} = req.params;

    const corredor = await Corredor.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(200).json({
        msg: 'Corredor eliminado',
        corredor
    });

}


export {
    createCorredor,
    getCorredor,
    updateCorredor,
    deleteCorredor
}