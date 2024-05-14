import { Router } from "express";
import {createOrder, receiveWebHook} from '../controllers/payment.controller.js';
import { createVenta } from "../controllers/ventas.js";
const  router = Router();

router.post('/createOrder', createOrder);


router.post('/webhook', receiveWebHook)

// router.get('/succes',(req, res)=>{
//     res.send('succes')
// })
// router.get('/failure',(req, res)=>{
//     res.send('failure')
// })

// router.get('/pending',(req, res)=>{
//     res.send('pending')
// })




export default router