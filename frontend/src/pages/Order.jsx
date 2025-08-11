import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCity, FaGlobe
} from "react-icons/fa";

const stripePromise = loadStripe("pk_test_51RXDDyRiR0sQkvQyqyDxcBwClJBIyV4tQoi9HQ4vUxSpEnrhm1jss8gFXu4CndtKefJ5FpfOqzLJsVlOYqCziSmS00RkIjBdwS");

const Order = () => {
  const { getTotalCartAmount, cartItems, token, url } = useContext(ShopContext);

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "",
    state: "", zip: "", country: "", phone: ""
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const stripe = await stripePromise;

    const addressInfo = {
      ...data,
      name: `${data.firstName} ${data.lastName}`
    };

    try {
      // 1. Save order to DB
      const res = await axios.post(`${url}/api/order/submit`, {
 
        cartItems,
        addressInfo,
        amount: Math.round((getTotalCartAmount() + 2) * 100) // amount in cents
      }, { headers: { token } });

      if (res.data.success) {
        // 2. Create Stripe checkout session
        const payment =await axios.post(`${url}/api/order/create-payment-intent`, {
          amount: Math.round((getTotalCartAmount() + 2) * 100)
        });

        // 3. Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: payment.data.id });
        if (result.error) {
          alert(result.error.message);
        }
      } else {
        alert("Failed to save order.");
      }
    } catch (err) {
      console.error(err);
      alert("Order or payment failed.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 pt-28 pb-16">
      <form className="flex flex-col xl:flex-row gap-16" onSubmit={handlePayment}>

        {/* Delivery Form */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-10">
          <h3 className="text-3xl font-semibold mb-8 text-gray-800">Delivery Information</h3>

          {/* Name */}
          <div className="flex gap-6 mb-6">
            <div className="relative flex-1">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={onchangeHandler}
                placeholder="First Name"
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative flex-1">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={onchangeHandler}
                placeholder="Last Name"
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onchangeHandler}
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="relative mb-6">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={onchangeHandler}
              placeholder="Phone Number"
              required
              className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Street */}
          <div className="relative mb-6">
            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="street"
              value={data.street}
              onChange={onchangeHandler}
              placeholder="Street Address"
              required
              className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City & State */}
          <div className="flex gap-6 mb-6">
            <div className="relative flex-1">
              <FaCity className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={onchangeHandler}
                placeholder="City"
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative flex-1">
              <FaCity className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="state"
                value={data.state}
                onChange={onchangeHandler}
                placeholder="State"
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Zip & Country */}
          <div className="flex gap-6 mb-6">
            <div className="relative flex-1">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="zip"
                value={data.zip}
                onChange={onchangeHandler}
                placeholder="Zip Code"
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative flex-1">
              <FaGlobe className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="country"
                value={data.country}
                onChange={onchangeHandler}
                placeholder="Country"
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-10 flex flex-col">
          <h4 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h4>

          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium text-gray-700">Subtotal</span>
            <span className="text-lg font-semibold text-gray-900">${getTotalCartAmount().toFixed(2)}</span>
          </div>
          <hr className="mb-4 border-gray-300" />

          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium text-gray-700">Shipping Fee</span>
            <span className="text-lg font-semibold text-gray-900">${getTotalCartAmount() === 0 ? "0.00" : "2.00"}</span>
          </div>
          <hr className="mb-6 border-gray-300" />

          <div className="flex justify-between mb-8">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              ${getTotalCartAmount() === 0 ? "0.00" : (getTotalCartAmount() + 2).toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            className="mt-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
};

export default Order;
