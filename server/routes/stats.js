import express from "express";
import { getTotalProductosPorCategoria, getTotalVentas, getVentasPorMes, getIngresosTotales, getProductosMasVendidos, getIngresosPorMes } from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/productos-por-categoria', getTotalProductosPorCategoria);//funciona
router.get('/total-ventas', getTotalVentas); //funciona
router.get('/ventas-por-mes', getVentasPorMes); //funiona
router.get('/ingresos-totales', getIngresosTotales); //funciona
router.get('/productos-mas-vendidos', getProductosMasVendidos); //funciona
router.get('/ingresos-por-mes', getIngresosPorMes);

export default router;