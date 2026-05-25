import express from 'express'
import { addProduct, listProduct, removeProduct, singleProduct, updateProduct } from '../controller/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from "../middleware/adminAuth.js"


let productRoutes = express.Router()

productRoutes.post("/add-product", adminAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }]), addProduct)

productRoutes.get("/list", listProduct)
productRoutes.post("/remove/:id", adminAuth, removeProduct)
productRoutes.get("/single/:id", singleProduct)
productRoutes.post("/update/:id", adminAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }]), updateProduct)



export default productRoutes