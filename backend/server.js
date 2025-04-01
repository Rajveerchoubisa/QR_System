import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import vendorRoutes from "./routes/vendorRoutes.js";

dotenv.config();
const app = express();
app.use(express.json()); // Enable JSON parsing
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

connectDB();

app.use("/api/vendors", vendorRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
