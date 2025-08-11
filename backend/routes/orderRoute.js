import express from 'express';
import { submitOrder, createPaymentIntent,getAllOrders } from '../controllers/orderController.js';
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.post("/submit", authMiddleware, submitOrder);
router.post("/create-payment-intent", createPaymentIntent);

router.get("/all", getAllOrders);


export default router;
