import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const orderSchema = new mongoose.Schema({
    userId: String,
});
const Order = mongoose.model('Order', orderSchema);

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const testIdStr = '6791ef648af0febe671ce495';
        const testIdObj = new mongoose.Types.ObjectId(testIdStr);

        console.log('Searching with ObjectId...');
        const resObj = await Order.find({ userId: testIdObj });
        console.log(`Found with ObjectId: ${resObj.length}`);

        console.log('Searching with String...');
        const resStr = await Order.find({ userId: testIdStr });
        console.log(`Found with String: ${resStr.length}`);

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

verify();
