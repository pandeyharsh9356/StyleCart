import Subscriber from "../model/subscriberModel.js";
import validator from "validator";
import { sendEmail } from "../config/emailConfig.js";

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "This email is already subscribed" });
        }

        const newSubscriber = await Subscriber.create({ email });

        // Send confirmation email with discount code
        try {
            await sendEmail(
                email,
                "Welcome to StyleCart Newsletter!",
                "Thank you for subscribing! Use code WELCOME20 to get 20% off your next order.",
                "<h1>Welcome to StyleCart!</h1><p>Thank you for subscribing to our newsletter. As a token of our appreciation, here is your discount code:</p><h2>WELCOME20</h2><p>Use this code at checkout to get <b>20% OFF</b> your next order!</p><p>Stay tuned for more updates and exclusive deals.</p>"
            );
        } catch (emailError) {
            console.error("Failed to send subscription email:", emailError);
        }

        return res.status(201).json({ message: "Subscribed successfully! Check your email for a special discount." });
    } catch (error) {
        console.error("Subscription error:", error);
        return res.status(500).json({ message: `Subscription error: ${error.message}` });
    }
};
