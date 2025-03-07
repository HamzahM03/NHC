import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import kidRoutes from "./routes/kidRoutes.js"; // Import routes

dotenv.config(); // Load environment variables

const app = express();

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
