import express from "express";
import { createVenta,getPaginatedVentas, getVentasByUserId, getVentaById, generatePDFById } from "../controllers/ventas.js";

const router = express.Router();

//Obtener Ventas
router.post('/', createVenta)

router.get('/', getPaginatedVentas);
router.get('/usuario/:id',getVentasByUserId);
router.get('/detalle/:id', getVentaById);

// Generar PDF
router.get('/generate-pdf/:id', generatePDFById);

export default router;