import multer from "multer"
import path from "path"
import fs from "fs"
import { ApiError } from "../utils/ApiError.js"

// Create uploads directory if it doesn't exist
const uploadDir = "./uploads/documents"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + "-" + uniqueSuffix + ext)
  },
})

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true)
  } else {
    cb(new ApiError(400, "Only PDF files are allowed"), false)
  }
}

// Configure upload limits
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB max file size
}

// Create multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits,
})

// Middleware for handling file upload errors
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit",
      })
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  } else if (err) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    })
  }
  next()
}

