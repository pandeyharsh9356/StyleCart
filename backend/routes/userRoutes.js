import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getAdmin, getAllUsers, getCurrentUser } from "../controller/userController.js"
import adminAuth from "../middleware/adminAuth.js"

let userRoutes = express.Router()

userRoutes.get("/get-current-user",isAuth,getCurrentUser)
userRoutes.get("/get-admin",adminAuth,getAdmin)
userRoutes.get("/list", adminAuth, getAllUsers)



export default userRoutes