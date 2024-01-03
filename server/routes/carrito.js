import express from "express";
import {agregar_carrito} from "../controllers/carrito.js"

const router = express.Router();

router.post('/agregar_carrito',agregar_carrito )

export default router;