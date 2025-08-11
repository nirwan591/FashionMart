import Stripe from 'stripe';
import OrderModel from '../models/orderModel.js';



export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET);

// Save order to DB
export const submitOrder = async (req, res) => {
  try {
    const { cartItems, addressInfo, amount } = req.body;
    const userId = req.userId; // Set by auth middleware

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

     console.log("Saving order:", { userId, cartItems, amount, addressInfo });

    const order = new OrderModel({
      userId,
      products: cartItems,
      amount,
      address: addressInfo,
     status: { type: String, default: "Processing" },

    });

    await order.save();
    res.status(201).json({ success: true, message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ success: false, message: "Server error saving order" });
  }
};

// Create Stripe Checkout session
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: "Order payment"
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};
