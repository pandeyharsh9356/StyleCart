import express from "express"
import { adminLogin, googleLogin, login, logOut, registration } from "../controller/authController.js"
import rateLimit from "express-rate-limit"

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests per windowMs
    message: { message: "Too many login attempts, please try again after a minute" }
})

const authRoutes = express.Router()

authRoutes.post("/registration",registration)
authRoutes.post("/login", authLimiter, login)
authRoutes.get("/logout",logOut)
authRoutes.post("/google-login", googleLogin)
authRoutes.post("/admin-login", authLimiter, adminLogin)

export default authRoutes