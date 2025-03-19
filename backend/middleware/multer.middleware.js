import multer from "multer"
import path from "path"
import fs from "fs"
import { ApiError } from "../utils/ApiError.js"

// Create uploads directories if they don't exist
const documentsDir = "./uploads/documents"
const profilesDir = "./uploads/profiles"

if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir, { recursive: true })
}

if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir, { recursive: true })
}

// Configure storage for documents
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentsDir)
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + "-" + uniqueSuffix + ext)
  },
})

// Configure storage for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profilesDir)
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, "profile-" + uniqueSuffix + ext)
  },
})

// File filter for documents (PDFs only)
const documentFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true)
  } else {
    cb(new ApiError(400, "Only PDF files are allowed"), false)
  }
}

// File filter for profile images
const profileFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new ApiError(400, "Only JPG, PNG and WebP images are allowed"), false)
  }
}

// Configure upload limits
const documentLimits = {
  fileSize: 5 * 1024 * 1024, // 5MB max file size for documents
}

const profileLimits = {
  fileSize: 2 * 1024 * 1024, // 2MB max file size for profile pictures
}

// Create multer instances
export const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: documentFileFilter,
  limits: documentLimits,
})

export const uploadProfile = multer({
  storage: profileStorage,
  fileFilter: profileFileFilter,
  limits: profileLimits,
})

// Create a general upload instance that can be used for both documents and profiles
export const upload = multer({
  storage: documentStorage, // Default to document storage
  limits: documentLimits, // Default to document limits
})

// Middleware for handling file upload errors - renamed to match your import
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      const isProfileUpload = req.route.path.includes("/register") || req.route.path.includes("/profile")
      const sizeLimit = isProfileUpload ? "2MB" : "5MB"
      return res.status(400).json({
        success: false,
        message: `File size exceeds ${sizeLimit} limit`,
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

