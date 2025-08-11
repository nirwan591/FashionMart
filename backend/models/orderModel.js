import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
