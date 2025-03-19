import jwt from "jsonwebtoken"

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
    // Check if user exists and has admin role
    // This assumes your User model has an isAdmin or role field
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json(new ApiError(403, "Access denied. Admin privileges required."))
    }
    
    next()
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong while verifying admin privileges"))
  }
}
