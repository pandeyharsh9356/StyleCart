import multer from 'multer'
import { v4 as generateUuid } from 'uuid'
import path from 'path'
import fs from 'fs'

const uploadDir = './public/uploads/products'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = generateUuid() + '-' + Date.now()
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'), false)
    }
}

const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
})

export default upload
