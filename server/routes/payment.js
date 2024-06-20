import { Router } from "express";
import {createOrder, receiveWebHook} from '../controllers/payment.controller.js';
import { createVenta } from "../controllers/ventas.js";
const  router = Router();

router.post('/createOrder', createOrder);

router.post('/webhook', receiveWebHook)

export default router