import fs from "fs";
import productModel from "../models/productModel.js";

// Add product
const addProduct = async (req, res) => {
  let image_filename = req.file ? req.file.filename : null;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// List products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    if (product?.image) {
      fs.unlink(`uploads/${product.image}`, () => {});
    }

    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//  Get product by ID (for update)
const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  Update product
const updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;
    const product = await productModel.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Remove old image if new one is uploaded
    if (req.file && product.image) {
      const oldPath = `uploads/${product.image}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save();
    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

export { addProduct, listProduct, removeProduct, getProductById, updateProduct };
