import express from "express";
import multer from "multer";
import {
  addProduct,
  listProduct,
  removeProduct,
  getProductById,
  updateProduct
} from "../controllers/productController.js";
import productModel from "../models/productModel.js"; // required for search

const productRouter = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Existing routes
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct);

// ✅ Move /search above /:id to avoid CastError
productRouter.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const regex = new RegExp(q, "i"); // case-insensitive regex search
    const products = await productModel.find({ name: regex });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error during search" });
  }
});

// Get product by ID
productRouter.get("/:id", getProductById);

// Update product
productRouter.post("/update", upload.single("image"), updateProduct);

export default productRouter;
