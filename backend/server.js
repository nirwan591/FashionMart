import 'dotenv/config.js'
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from './routes/cartRoute.js';
import messageRouter from './routes/messageRoute.js';
import orderRouter from "./routes/orderRoute.js"; 

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));


// connection
connectDB();

// API endpoints
app.use("/api/product", productRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/message", messageRouter);
app.use("/api/order", orderRouter);


// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
