import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
dotenv.config()
import cors from "cors"
import helmet from "helmet"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import subscriberRoutes from './routes/subscriberRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import multer from 'multer'

let port = process.env.PORT || 6000

let app = express()

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: false })) // Allow serving images cross-origin
app.use(express.json())
app.use(cookieParser())

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://localhost:8000"],
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/subscriber", subscriberRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/admin", adminRoutes)

app.get("/", (req, res) => {
    res.send("API Working")
})

// Global Error Handler
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File is too large. Max size is 2MB.' })
        }
        return res.status(400).json({ message: err.message })
    } else if (err) {
        return res.status(400).json({ message: err.message })
    }
    next()
})

app.listen(port, () => {
    console.log("Hello From Server")
    connectDb()
})
