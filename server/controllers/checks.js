import response from 'express';
import Check from '../models/check.js';


//Crear Check
const createCheck = async(req, res = response) => {

    const { titulo, descripcion, ig_filmer, ig_rider, img_rider, url_video } = req.body;

    try {
        
        const check = new Check( {titulo, descripcion, ig_filmer, ig_rider, img_rider, url_video} );

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

//Obtener Checks paginados
const getChecks = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    try {     
        
        const [checks, totalChecks] = await Promise.all([
            Check.find({estado: true}).skip(desde).limit(5),
            Check.countDocuments()
        ]);

        res.status(200).json({
            checks,
            totalChecks
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un error al obtener un check'
        });
    }
}

//Actualizar Check
const updateCheck = async(req, res = response) => {

    try {
        
        const {id} = req.params;
        const { _id, ...resto } = req.body;
    
        const check = await Check.findByIdAndUpdate(id, resto, {new: true});
    
        res.status(200).json({
            msg: 'Check actualizado',
            check
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un error al actualizar un check'
        });
    }

}

//Delete Check
const deleteCheck = async(req, res) => {

    try {
        
        const {id} = req.params;

        const check = await Check.findByIdAndUpdate(id, {estado: false}, {new: true});

        res.status(200).json({
            msg: 'Check eliminado',
            check
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar un check'
        });
    }
}
//Buscar un Check 
const getCheck = async(req, res)=>{
    let check = await Check.findById(req.params.id);
    try {
        let check = await Check.findById(req.params.id);
        if(!check){
            res.status(404).json({msg:'No existe el video'})
        }
        res.json(check);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export {
    createCheck,
    getChecks,
    updateCheck,
    getCheck,
    deleteCheck
}