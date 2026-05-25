import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { getAnalytics } from '../controller/adminController.js'

const adminRoutes = express.Router()

adminRoutes.get('/analytics', adminAuth, getAnalytics)

export default adminRoutes
