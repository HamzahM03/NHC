import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import kidRoutes from "./routes/kidRoutes.js"; // Import routes

import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5174", // Allow frontend
    credentials: true
}));


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/kids", kidRoutes); // Route for kids management

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
