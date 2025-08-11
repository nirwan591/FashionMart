import express from "express"
import { addToCart,removeFromeCart,getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromeCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;