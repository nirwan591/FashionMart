import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { all_products, cartItems, removeFromCart, getTotalCartAmount, url } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <section className="max-padd-container pt-20">
      <div className="py-10 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-slate-300">
            <tr>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {all_products.map((product) => {
              // <-- Here is the fix: use optional chaining and default 0
              if ((cartItems?.[product._id] || 0) > 0) {
                return (
                  <tr key={product._id} className="hover:bg-gray-200 transition-all">
                    <td className="px-4 py-3">
                      <img
                        src={url + "/images/" + product.image}
                        alt=""
                        height={43}
                        width={43}
                        className="rounded-md shadow-sm ring-1 ring-slate-400"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{product.name}</div>
                    </td>
                    <td className="px-4 py-3 text-green-600 font-semibold">${product.price}</td>
                    <td className="px-4 py-3">{cartItems[product._id]}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      ${product.price * cartItems[product._id]}
                    </td>
                    <td className="px-4 py-3">
                      <TbTrash
                        onClick={() => removeFromCart(product._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer transition"
                        size={20}
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>

        {/* cart details */}
        <div className='flex flex-col xl:flex-row gap-28 mt-20'>
          <div className='flex flex-1 flex-col gap-2'>
            <h4 className='bold-22'>Summary</h4>
            <div>
              <div className='flexBetween py-3'>
                <h4 className='medium-16'>Subtotal</h4>
                <h4 className='text-gray-30 font-semibold'>${getTotalCartAmount()}</h4>
              </div>
              <hr className='h-[2px] bg-slate-900/15'/>
              <div className='flexBetween py-3'>
                <h4 className='medium-16'>Shipping Fee</h4>
                <h4 className='text-gray-30 font-semibold'> ${getTotalCartAmount() === 0 ? 0 : 2}</h4>
               
              </div>
              <hr className='h-[2px] bg-slate-900/15'/>
              <div className='flexBetween py-3'>
                <h4 className='medium-18'>Total</h4>
                <h4 className='bold-18'>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </h4>
              </div>
            </div>
            <button onClick={() => navigate("/order")} className='btn-secondary w-52 rounded'>
              Proceed to checkout
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Cart;
