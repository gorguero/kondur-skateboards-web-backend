import express from "express";
import { createVenta,getVentas,getPaginatedVentas } from "../controllers/ventas.js";

const router = express.Router();

//Agregar Venta
// router.post('/', createVenta);

//Obtener Ventas
router.post('/', createVenta)

router.get('/all', getVentas);
router.get('/', getPaginatedVentas);

export default router;