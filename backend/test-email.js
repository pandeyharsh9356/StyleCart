import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const testEmail = async () => {
    console.log("Starting email test...");
    console.log("Using Email:", process.env.EMAIL_USER);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Error: EMAIL_USER or EMAIL_PASS not found in .env");
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"StyleCart Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // sending to self for testing
            subject: "StyleCart Email Test",
            text: "If you are reading this, your email configuration is working!",
            html: "<b>If you are reading this, your email configuration is working!</b>",
        });

        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.code === 'EAUTH') {
            console.error("Authentication failed. Please verify your App Password.");
        }
    }
};

testEmail();
