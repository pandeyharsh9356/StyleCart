import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function checkTypes() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const db = mongoose.connection.db;
        const collection = db.collection('orders');
        
        const order = await collection.findOne({});
        if (order) {
            console.log('Order found.');
            console.log('userId value:', order.userId);
            console.log('userId type:', typeof order.userId);
            console.log('userId constructor:', order.userId.constructor.name);
        } else {
            console.log('No orders found in collection.');
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkTypes();
