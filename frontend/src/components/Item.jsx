import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";

const Item = ({ product }) => {
  const { cartItems = {}, addToCart, removeFromCart, url } = useContext(ShopContext);

  const quantity = cartItems?.[product._id] || 0;

  return (
    <div>
      <Link
        to={`/product/${product._id}`}
        className="relative top-28 group bg-white flexCenter m-4 rounded-2xl ring-slate-200/20 hover:shadow-sm"
      >
        <img
          src={`${url}/images/${product.image}`}
          alt={product.name}
          className="object-cover h-40 w-40"
        />
      </Link>

      <div className="p-3 pt-28 bg-primary rounded-xl">
        <h4 className="text-lg font-medium line-clamp-1">{product.name}</h4>
        <h5 className="text-[16px] font-bold text-gray-900/50 mb-1">{product.category}</h5>
        <p className="line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-3">
          <div className="text-secondary font-bold text-lg">${product.price}</div>
          <div>
            {quantity === 0 ? (
              <FaPlus
                onClick={() => addToCart(product._id)}
                className="bg-white h-8 w-8 rounded-full shadow-inner cursor-pointer p-2"
              />
            ) : (
              <div className="bg-white rounded-full flex items-center gap-2 h-8 px-2">
                <FaMinus
                  onClick={() => removeFromCart(product._id)}
                  className="bg-primary h-6 w-6 p-1 cursor-pointer rounded-full"
                />
                <p>{quantity}</p>
                <FaPlus
                  onClick={() => addToCart(product._id)}
                  className="bg-secondary h-6 w-6 p-1 cursor-pointer rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
