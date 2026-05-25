import Review from "../model/reviewModel.js";
import User from "../model/userModel.js";

// Add a review for a product
const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.userId; // Provided by isAuth middleware

        if (!productId || !rating || !comment) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const review = new Review({
            productId,
            userId,
            userName: user.name,
            rating,
            comment,
            date: new Date()
        });

        await review.save();

        res.status(201).json({ success: true, message: "Review added", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all reviews for a specific product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addReview, getProductReviews };
