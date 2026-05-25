import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";
import { sendEmail } from "../config/emailConfig.js";


export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exist" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid Email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter Strong Password" })
        }
        let hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashPassword })

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        let token = await genToken(user._id)
        res.cookie("userToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Send Welcome Email
        try {
            await sendEmail(
                email,
                "Welcome to StyleCart!",
                `Hello ${name}, thank you for registering at StyleCart!`,
                `<h1>Welcome to StyleCart, ${name}!</h1><p>We are glad to have you with us. Explore our latest collection and enjoy shopping!</p>`
            );
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            // We don't return error here because the user is already registered
        }

        return res.status(201).json(userResponse)
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal Server Error during registration" })
    }

}


export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User is not Found" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        let token = await genToken(user._id)
        res.cookie("userToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(userResponse)

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error during login" })
    }

}
export const logOut = async (req, res) => {
    try {
        res.clearCookie("userToken")
        res.clearCookie("adminToken")
        return res.status(200).json({ message: "logOut successful" })
    } catch (error) {
        console.log("logOut error")
        return res.status(500).json({ message: `LogOut error ${error}` })
    }

}


export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name, email
            })
        }

        let token = await genToken(user._id)
        res.cookie("userToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Remove password if it exists (though usually not for google users)
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json(userResponse)

    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({ message: "Internal Server Error during Google login" })
    }

}


export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        console.log("Admin login starting...", { 
            hasEmail: !!email, 
            hasPassword: !!password,
            body: req.body // CAUTION: logs password, but needed for debug
        });

        if (email && password) {
            const isEmailMatch = email.trim().toLowerCase() === adminEmail?.toLowerCase();
            const isPasswordMatch = password.trim() === adminPassword;
            
            console.log("Credential check results:", {
                receivedEmail: email.trim().toLowerCase(),
                expectedEmail: adminEmail?.toLowerCase(),
                emailMatched: isEmailMatch,
                passwordMatched: isPasswordMatch
            });

            if (isEmailMatch && isPasswordMatch) {
                let token = await genToken1(email.trim().toLowerCase())
            res.cookie("adminToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            // Do not return token in body for security
            return res.status(200).json({ message: "Admin authenticated successfully" })
            }
        }
        return res.status(401).json({ message: "Invalid credentials" })

    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ message: "Internal Server Error during Admin login" })
    }
}
