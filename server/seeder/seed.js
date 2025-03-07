import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Kid from '../models/kidModel.js';  // Adjust path based on your setup

dotenv.config(); // Load environment variables

const seedData = async () => {
    try {
        await connectDB(); // Connect to MongoDB

        // Clear existing data
        await Kid.deleteMany();

        // Sample data
        const kids = [
            { name: "John Doe", parentName: "Jane Doe", sessionsRemaining: 4, paymentType: "cash" },
            { name: "Emily Smith", parentName: "Robert Smith", sessionsRemaining: 8, paymentType: "zelle" },
        ];

        // Insert into database
        await Kid.insertMany(kids);

        console.log('✅ Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

// Run the seeder script
seedData();
