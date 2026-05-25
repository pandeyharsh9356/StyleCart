import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        process.exit(1);
    }
    
}
export default connectDb