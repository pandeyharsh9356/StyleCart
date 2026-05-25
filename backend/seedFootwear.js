import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './model/productModel.js';

dotenv.config();

const seedFootwear = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing footwear to avoid duplicates and ensure Accessories category
        const deleteRes = await Product.deleteMany({ subCategory: "Footwear" });
        console.log(`Cleared ${deleteRes.deletedCount} existing footwear products.`);

        const footwearProducts = [
            {
                name: "Urban Stealth Sneakers",
                description: "Premium black sneakers with high-performance cushioning and sleek design.",
                exchange_rate: 4999,
                market_baseline: 6999,
                category: "Accessories",
                subCategory: "Footwear",
                sizes: [
                    { size: "7", quantity: 15 },
                    { size: "8", quantity: 20 },
                    { size: "9", quantity: 12 },
                    { size: "10", quantity: 10 }
                ],
                image1: "/uploads/products/c22540bb-1c53-4c3f-9c29-b09443f9626f-1774007609832.jpg",
                image2: "/uploads/products/c22540bb-1c53-4c3f-9c29-b09443f9626f-1774007609832.jpg",
                bestseller: true,
                date: Date.now(),
                stock: 57
            },
            {
                name: "Swift Runner Pro",
                description: "Lightweight running shoes designed for maximum speed and endurance.",
                exchange_rate: 3499,
                market_baseline: 4499,
                category: "Accessories",
                subCategory: "Footwear",
                sizes: [
                    { size: "6", quantity: 8 },
                    { size: "7", quantity: 12 },
                    { size: "8", quantity: 10 }
                ],
                image1: "/uploads/products/8ec93656-a933-4c90-b0a4-343c0f41d518-1774239250802.jpg",
                image2: "/uploads/products/8ec93656-a933-4c90-b0a4-343c0f41d518-1774239250802.jpg",
                bestseller: false,
                date: Date.now(),
                stock: 30
            },
            {
                name: "Cloud Step Comfort",
                description: "Ultra-comfortable daily wear shoes with breathable mesh and soft soles.",
                exchange_rate: 2999,
                market_baseline: 3999,
                category: "Accessories",
                subCategory: "Footwear",
                sizes: [
                    { size: "8", quantity: 25 },
                    { size: "9", quantity: 30 },
                    { size: "10", quantity: 5 }
                ],
                image1: "/uploads/products/009a9653-9176-4aaa-88d4-5a7e832f0f81-1774258057826.jpg",
                image2: "/uploads/products/009a9653-9176-4aaa-88d4-5a7e832f0f81-1774258057826.jpg",
                bestseller: true,
                date: Date.now(),
                stock: 60
            },
            {
                name: "Nitro Glide Trail",
                description: "Rugged trail running shoes with enhanced grip for any terrain.",
                exchange_rate: 1999,
                market_baseline: 2499,
                category: "Accessories",
                subCategory: "Footwear",
                sizes: [
                    { size: "7", quantity: 5 },
                    { size: "8", quantity: 10 },
                    { size: "9", quantity: 8 }
                ],
                image1: "/uploads/products/14f99dec-5f8a-4dcc-916a-b3114d57addb-1774006667831.jpg",
                image2: "/uploads/products/14f99dec-5f8a-4dcc-916a-b3114d57addb-1774006667831.jpg",
                bestseller: false,
                date: Date.now(),
                stock: 23
            },
            {
                name: "Eclipse High-Tops",
                description: "Stylish high-top sneakers perfect for urban fashion.",
                exchange_rate: 5999,
                market_baseline: 7999,
                category: "Accessories",
                subCategory: "Footwear",
                sizes: [
                    { size: "8", quantity: 15 },
                    { size: "9", quantity: 15 },
                    { size: "10", quantity: 7 }
                ],
                image1: "/uploads/products/427adb5c-39a6-43f9-8fce-b38ad32df728-1774007072019.jpg",
                image2: "/uploads/products/427adb5c-39a6-43f9-8fce-b38ad32df728-1774007072019.jpg",
                bestseller: true,
                date: Date.now(),
                stock: 37
            },
            {
                name: "Tempo Pace Trainers",
                description: "High-intensity training shoes for gym and sports.",
                exchange_rate: 3999,
                market_baseline: 4999,
                category: "Accessories",
                subCategory: "Footwear",
                sizes: [
                    { size: "7", quantity: 10 },
                    { size: "8", quantity: 15 },
                    { size: "9", quantity: 15 }
                ],
                image1: "/uploads/products/c22540bb-1c53-4c3f-9c29-b09443f9626f-1774007609832.jpg",
                image2: "/uploads/products/c22540bb-1c53-4c3f-9c29-b09443f9626f-1774007609832.jpg",
                bestseller: false,
                date: Date.now(),
                stock: 40
            }
        ];

        await Product.insertMany(footwearProducts);
        console.log("Seeded 6 Footwear products under Accessories category.");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedFootwear();
