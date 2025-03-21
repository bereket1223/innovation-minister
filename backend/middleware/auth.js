import jwt from "jsonwebtoken"
import { getUserById } from "../service/user/create.user.service.js"
import { ApiError } from "../utils/ApiError.js"

export const verifyToken = (req, res, next) => {
  try {
    // Get token from cookie or authorization header
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

    // Add user data to request
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    })
  }
}
// Add this to your existing auth.js file

export const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user)
    if (!req.user) {
      return res.status(403).json(new ApiError(403, "Access denied. Admin privileges required."))
    }

    const { id  } = req.user
    const user = await getUserById(id)
    console.log(user)
    const isAdmin = user.role === "admin"

    if (!isAdmin) {
      return res.status(403).json(new ApiError(403, "Access denied. Admin privileges required."))
    }
    
    next()
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong while verifying admin privileges"))
  }
}
