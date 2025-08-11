import React, { useContext, useState } from "react";
import { FaStar, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { LuMoveUpRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductMd = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, url } = useContext(ShopContext);
  const navigate = useNavigate();

  // 🟢 Add state for selected color and size
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return <div className="text-center p-10">Loading product...</div>;
  }

  return (
    <section className="w-full max-w-[1300px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 bg-primary rounded-xl shadow-sm">
      {/* Image Section */}
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:flex-1">
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
          {[...Array(4)].map((_, i) => (
            <img
              key={i}
              src={`${url}/images/${product.image}`}
              alt={`thumb-${i}`}
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
            />
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center bg-white rounded-xl p-4">
          <img
            src={`${url}/images/${product.image}`}
            alt="main"
            className="max-h-[400px] w-full object-contain"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1 bg-white p-6 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h2>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-semibold text-tertiary">${product.price}.00</span>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="ml-1 text-gray-600">(223)</span>
          </div>
        </div>

        {/* Color Options */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Select Color</h4>
          <div className="flex gap-3">
            {["bg-secondary", "bg-secondaryYellow", "bg-secondaryBlue", "bg-secondaryGreen"].map((bg, i) => (
              <div
                key={i}
                onClick={() => setSelectedColor(bg)}
                className={`h-10 w-10 rounded-full cursor-pointer border-2 ${bg} 
                ${selectedColor === bg ? "ring-2 ring-black" : "border-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Select Size</h4>
          <div className="flex gap-3">
            {["S", "M", "L", "XL"].map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border h-10 w-10 flex items-center justify-center rounded-sm cursor-pointer
                ${selectedSize === size ? "bg-black text-white" : "border-gray-300 hover:bg-gray-100"}`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <button className="btn-secondary rounded-md px-4 py-2 flex items-center justify-center">
            <FaHeart />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="btn-dark rounded-md px-6 py-2 flex items-center gap-2"
          >
            Go to Cart <LuMoveUpRight />
          </button>

          {/* Quantity Control */}
          <div className="flex items-center gap-2 bg-tertiary text-white px-3 py-2 rounded-md">
            <FaMinus
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer hover:text-secondary"
            />
            <span className="min-w-[20px] text-center">
              {cartItems?.[product._id] || 0}
            </span>
            <FaPlus
              onClick={() => addToCart(product._id)}
              className="cursor-pointer bg-secondary text-white p-1 rounded-sm"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong className="text-tertiary">Tags:</strong> Modern | New | Arrivals
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductMd;
