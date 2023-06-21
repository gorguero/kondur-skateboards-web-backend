import express from "express";
import { createProducto } from "../controllers/productos.js";

const router = express.Router();

//Crear Producto

router.post('/',createProducto)

export default router;