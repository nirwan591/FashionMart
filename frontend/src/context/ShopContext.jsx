import React, { createContext, useEffect, useState } from "react";
import { all_products } from "../assets/data"; // fallback product data (not used here)
import Item from "../components/Item"; // possibly unused here, safe to remove
import axios from "axios";

// Create a React Context for the Shop
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({}); // Local cart state (itemId: quantity)
    const url = "http://localhost:4000"; // Backend server URL
    const [token, setToken] = useState(""); // JWT token for authenticated user
    const [all_products, setAll_products] = useState([]); // List of all products from DB

    // Function to add an item to the cart
    const addToCart = async (ItemId) => {
        if (!cartItems || !cartItems[ItemId]) {
            setCartItems((prev) => ({ ...prev, [ItemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [ItemId]: (prev[ItemId] || 0) + 1 }));
        }

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId: ItemId }, { headers: { token } });
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (ItemId) => {
        setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId: ItemId }, { headers: { token } });
        }
    };

    // Debugging: Log cart changes
    useState(() => {
        console.log(cartItems);
    }, [cartItems]);

    // Calculate total price of all items in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const product = all_products.find((p) => p._id === itemId);
                if (product) {
                    totalAmount += product.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    // Count total number of items in the cart
    const getTotalcartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            totalItems += cartItems[item];
        }
        return totalItems;
    };

    // Fetch product list from backend
    const fetchProductList = async () => {
        const respones = await axios.get(url + "/api/product/list");
        setAll_products(respones.data.data);
    };

    // Fetch user cart data from backend
    const loadCartData = async (token) => {
        const respones = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(respones.data.cartData);
    };

    // Load data on first component mount
    useEffect(() => {
        async function loadData() {
            await fetchProductList();

            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    // Context value passed to all components using this context
    const contextValue = {
        all_products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalcartItems,
        url,
        token,
        setToken,
        fetchProductList // ✅ Added so you can call it from Add.jsx
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
