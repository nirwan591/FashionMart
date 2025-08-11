import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:4000/api/order/all");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Customer Orders</h2>
      {orders.map((order, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 bg-white shadow-md">
          <p><strong>Customer:</strong> {order.address.firstName} {order.address.lastName}</p>
          <p><strong>Email:</strong> {order.address.email}</p>
          <p><strong>Total:</strong> ${order.amount}</p>
          <p><strong>Products:</strong> {JSON.stringify(order.products)}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
