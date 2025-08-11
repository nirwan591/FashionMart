import userModel from '../models/userModel.js'; // Import the user model

//  Add item to user's cart
const addToCart = async (req, res) => {
    try {
        // Find the user by ID (set in authMiddleware)
        let userData = await userModel.findOne({ _id: req.body.userID });

        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Get the existing cart data
        let cartData = userData.cartData || {};

        // If the item is not already in the cart, add it with quantity 1
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            // If item exists, increase its quantity
            cartData[req.body.itemId] += 1;
        }

        // Save the updated cart back to the user document
        await userModel.findByIdAndUpdate(req.body.userID, { cartData });

        // Send success response
        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        // Handle errors
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//  Remove item from user's cart
const removeFromeCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findOne({ _id: req.body.userID });

        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Get the current cart data
        let cartData = userData.cartData || {};

        // If the item exists in the cart
        if (cartData[req.body.itemId]) {
            // Decrease the quantity
            cartData[req.body.itemId] -= 1;

            // If quantity becomes zero or less, remove the item from cart
            if (cartData[req.body.itemId] <= 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Save the updated cart
        await userModel.findByIdAndUpdate(req.body.userID, { cartData });

        // Send success response
        res.json({ success: true, message: "Item removed from Cart" });

    } catch (error) {
        // Handle errors
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//  Fetch user's current cart data
const getCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findOne({ _id: req.body.userID });

        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Return the cart data
        res.json({ success: true, cartData: userData.cartData || {} });

    } catch (error) {
        // Handle errors
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromeCart, getCart };
