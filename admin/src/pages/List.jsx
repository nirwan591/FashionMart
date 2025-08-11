// same imports...
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TbTrash, TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (err) {
      toast.error("Server error.");
    }
    setLoading(false);
  };

  const removeProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post(`${url}/api/product/remove`, {
        id: productId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Failed to remove product.");
      }
    } catch (err) {
      toast.error("Error deleting product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="p-4 sm:p-10 w-full bg-primary/20 min-h-[400px]">
      <h4 className="text-xl font-bold pb-4 uppercase">Products List</h4>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
          Loading...
        </div>
      ) : list.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No products found.</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-medium text-gray-700">Image</th>
                <th className="p-3 font-medium text-gray-700">Title</th>
                <th className="p-3 font-medium text-gray-700">Price</th>
                <th className="p-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={`${url}/images/${product.image}`}
                      onError={(e) => (e.target.src = "/no-image.png")}
                      alt="product"
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3 font-medium text-green-600">${product.price}</td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition"
                    >
                      <TbTrash size={18} className="text-red-600" />
                    </button>
                    <Link
                      to={`/update/${product._id}`}
                      className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                    >
                      <TbEdit size={18} className="text-blue-600" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default List;
