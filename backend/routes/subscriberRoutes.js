import express from 'express';
import { subscribeNewsletter } from '../controller/subscriberController.js';

const subscriberRouter = express.Router();

subscriberRouter.post('/subscribe', subscribeNewsletter);

export default subscriberRouter;
