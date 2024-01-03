import Carrito from "../models/carrito.js";
import {json} from "express";

const agregar_carrito = async function(req, res){
    let data = req.body;

    let reg = await Carrito.create(data);
    res.status(200).send({data:reg});
};

export{
    agregar_carrito
}