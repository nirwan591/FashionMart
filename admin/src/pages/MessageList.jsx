// pages/MessageList.jsx
import React, { useEffect, useState } from "react";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/message")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="p-4 border rounded shadow">
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
