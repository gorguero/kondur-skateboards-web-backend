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
const getCorredores = async(req, res=response) => {
    try {
        const corredores = await Corredor.find({estado: true});
        // res.status(200).json({
        //     ok: true,
        //     corredores
        // });
        res.json(corredores);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener un corredor'
        });
    }
}

//Buscar un Corredor 
const getCorredor = async(req, res)=>{
    let corredor = await Corredor.findById(req.params.id);
    try {
        let corredor = await Corredor.findById(req.params.id);
        if(!corredor){
            res.status(404).json({msg:'No existe el rider'})
        }
        res.json(corredor);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar un corredor
const updateCorredor = async(req, res=response) => {
    
    try {
        
        const {id} = req.params;
        const { _id, ...resto } = req.body;

        const corredor = await Corredor.findByIdAndUpdate(id, resto, {new: true});

        res.status(200).json({
            msg: 'Corredor actualizado',
            corredor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al editar un corredor'
        });
    }

}

//Eliminar un corredor
const deleteCorredor = async(req, res) => {
    
    try {
        
        const {id} = req.params;

        const corredor = await Corredor.findByIdAndUpdate(id, {estado: false}, {new: true});

        res.status(200).json({
            msg: 'Corredor eliminado',
            corredor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar un corredor'
        });
    }

}


export {
    createCorredor,
    getCorredores,
    getCorredor,
    updateCorredor,
    deleteCorredor
}