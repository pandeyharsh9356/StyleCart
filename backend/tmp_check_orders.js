import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const MONGODB_URL = process.env.MONGODB_URL;

const orderSchema = new mongoose.Schema({
    userId: String,
    status: String,
    amount: Number,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

async function checkOrders() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(MONGODB_URL);
        console.log('Connected.');

        const orders = await Order.find({});
        console.log(`Total orders in DB: ${orders.length}`);

        if (orders.length > 0) {
            console.log('Sample order:');
            console.log(JSON.stringify(orders[0], null, 2));
            
            const uniqueUserIds = [...new Set(orders.map(o => o.userId))];
            console.log('Unique userIds in orders:', JSON.stringify(uniqueUserIds, null, 2));
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkOrders();
