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
        })

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

    const checks = await Check.find();

    res.status(201).json({
        ok: true,
        checks
    })
}

//Actualizar Check
const updateCheck = async(req, res) => {
    res.status(201).json({
        ok: true,
        msg: 'Check actualizado'
    })
}

//Delete Check
const deleteCheck = async(req, res) => {
    res.status(201).json({
        ok: true,
        msg: 'Check eliminado'
    })
}

export {
    createCheck,
    getCheck,
    updateCheck,
    deleteCheck
}