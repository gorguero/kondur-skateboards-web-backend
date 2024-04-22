import { Router } from "express";
import {createOrder} from '../controllers/payment.controller.js';
import { createVenta } from "../controllers/ventas.js";
const  router = Router();

router.post('/createOrder', [createOrder, createVenta]);

// router.get('/succes',(req, res)=>{
//     res.send('succes')
// })
// router.get('/failure',(req, res)=>{
//     res.send('failure')
// })

// router.get('/pending',(req, res)=>{
//     res.send('pending')
// })


// router.post('/webhook', receiveWebHook)

export default router