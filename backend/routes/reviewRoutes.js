import express from 'express';
import { addReview, getProductReviews } from '../controller/reviewController.js';
import isAuth from '../middleware/isAuth.js';

const reviewRoutes = express.Router();

// Public route to get reviews for a product
reviewRoutes.get('/:productId', getProductReviews);

// Protected route to add a review
reviewRoutes.post('/add', isAuth, addReview);

export default reviewRoutes;
