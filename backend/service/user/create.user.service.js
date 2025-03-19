import User from "../../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

// Create user service
export const createUser = async ({ fullName, email, phone, password, profilePictureUrl }) => {
  // Check if user with email already exists
  const existingUserByEmail = await User.findOne({ email })
  if (existingUserByEmail) {
    throw new Error("User with this email already exists")
  }

  // Check if user with phone already exists
  const existingUserByPhone = await User.findOne({ phone })
  if (existingUserByPhone) {
    throw new Error("User with this phone number already exists")
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create new user
  const newUser = new User({
    fullName,
    email,
    phone,
    password: hashedPassword,
    profilePictureUrl,
  })

  // Save user to database
  return await newUser.save()
}

// Login user service
export const loginUser = async ({ phone, password }) => {
  // Find user by phone
  const user = await User.findOne({ phone })
  if (!user) {
    throw new Error("Invalid phone number or password")
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid phone number or password")
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      phone: user.phone,
    },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" },
  )

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      profilePictureUrl: user.profilePictureUrl,
    },
    token,
  }
}

// Get all users service
export const getAllUsers = async () => {
  // Find all users and exclude password field
  const users = await User.find().select("-password")
  return users
}

// Get user by ID service
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password")
    if (!user) {
      throw new Error("User not found")
    }
    return user
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === "CastError" && error.kind === "ObjectId") {
      throw new Error("Invalid user ID format")
    }
    throw error
  }
}

// Update user profile service
export const updateUserProfile = async (userId, updateData) => {
  // If updating email, check if it's already taken
  if (updateData.email) {
    const existingUser = await User.findOne({
      email: updateData.email,
      _id: { $ne: userId },
    })

    if (existingUser) {
      throw new Error("Email is already in use")
    }
  }

  // If updating phone, check if it's already taken
  if (updateData.phone) {
    const existingUser = await User.findOne({
      phone: updateData.phone,
      _id: { $ne: userId },
    })

    if (existingUser) {
      throw new Error("Phone number is already in use")
    }
  }

  // If updating password, hash it
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10)
    updateData.password = await bcrypt.hash(updateData.password, salt)
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select("-password")

  if (!updatedUser) {
    throw new Error("User not found")
  }

  return updatedUser
}

// Delete user service
export const deleteUser = async (userId) => {
  try {
    // Get user to check for profile picture
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    // Delete profile picture if it exists
    if (user.profilePictureUrl && !user.profilePictureUrl.startsWith("http")) {
      try {
        const filePath = path.join(process.cwd(), user.profilePictureUrl)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      } catch (err) {
        console.error("Error deleting profile picture:", err)
        // Continue with user deletion even if file deletion fails
      }
    }

    // Delete the user
    const result = await User.findByIdAndDelete(userId)

    if (!result) {
      throw new Error("User not found")
    }

    return true
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === "CastError" && error.kind === "ObjectId") {
      throw new Error("Invalid user ID format")
    }
    throw error
  }
}

