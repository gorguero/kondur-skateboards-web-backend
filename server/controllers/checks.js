import response from 'express';
import Check from '../models/check.js';


//Crear Check
const createCheck = async(req, res = response) => {

    const { titulo, descripcion, filmer_name, contacto, img_filmer, url_video } = req.body;

    try {
        
        const check = new Check( {titulo, descripcion, filmer_name, contacto, img_filmer, url_video} );

        await check.save();

        res.status(201).json({
            msg: 'Creado con éxitosamente.',
            check
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear un nuevo articulo de check.'
        });
    }
}

//Obtener Check
const getCheck = async(req, res) => {

    const checks = await Check.find({estado: true});

    res.status(201).json({
        ok: true,
        checks
    });
}

//Actualizar Check
const updateCheck = async(req, res = response) => {

    const {id} = req.params;
    const { _id, ...resto } = req.body;

    const check = await Check.findByIdAndUpdate(id, resto, {new: true});

    res.status(200).json({
        msg: 'Check actualizado',
        check
    });
}

//Delete Check
const deleteCheck = async(req, res) => {

    const {id} = req.params;

    const check = await Check.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(200).json({
        msg: 'Check eliminado',
        check
    });
}

export {
    createCheck,
    getCheck,
    updateCheck,
    deleteCheck
}