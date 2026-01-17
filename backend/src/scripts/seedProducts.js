require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User'); // Need User model to satisfy relation
const Product = require('../models/Product');

console.log("🚀 Starting seed script (Single Product)...");

if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not found!");
    process.exit(1);
}

const seed = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected.");

        // 1. Find an Admin User (Required by Schema)
        const adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
            console.error("❌ No admin user found! Please run 'makeAdmin.js' or register a user first.");
            // Fallback: Try to find ANY user
            const anyUser = await User.findOne({});
            if (!anyUser) {
                console.error("❌ No users found in DB. Cannot seed products without a user (Schema constraint).");
                process.exit(1);
            }
            console.log("⚠️ Using non-admin user for product ownership.");
        }

        const userId = adminUser ? adminUser._id : (await User.findOne({}))._id;

        // 2. Clear existing products
        console.log("Clearing products...");
        const deleteResult = await Product.deleteMany({});
        console.log(`🗑️ Deleted ${deleteResult.deletedCount} old products.`);

        // 3. Define the Single Product
        // Schema requires: user, name, description, price, countInStock, imageUrl, category
        const products = [
            {
                user: userId,
                name: "Camiseta Retro",
                description: "Edición especial retro. Diseño clásico con colores vibrantes.",
                price: 110, // Euros
                imageUrl: "/products/camiseta-retro.jpg",
                countInStock: 50,
                category: "Camisetas"
            },
            {
                user: userId,
                name: "Adidas Tango",
                description: "Balón oficial. Historia pura del fútbol mundial.",
                price: 45, // Euros
                imageUrl: "/products/adidas-tango.jpg",
                countInStock: 100,
                category: "Pelotas"
            },

            {
                user: userId,
                name: "Rompevientos Boca",
                description: "Rompevientos oficial de Boca Juniors. Ideal para la lluvia y el viento.",
                price: 85, // Euros
                imageUrl: "/products/rompevientos-boca.jpg",
                countInStock: 20,
                category: "Camperas"
            },
            {
                user: userId,
                name: "Camiseta Boca 120 Aniversario",
                description: "Edición especial 120 años. Una joya para coleccionistas.",
                price: 120, // Euros
                imageUrl: "/products/camiseta-boca-120.jpg",
                countInStock: 30,
                category: "Camisetas"
            }
        ];

        console.log(`Inserting ${products.length} new product...`);
        const insertResult = await Product.insertMany(products);
        console.log(`✅ Inserted successfully! Product ID: ${insertResult[0]._id}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

seed();
