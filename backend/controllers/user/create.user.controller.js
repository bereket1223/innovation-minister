import path from "path"
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
} from "../../service/user/create.user.service.js"

// Create user controller
export const createUserController = async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body
    let profilePictureUrl = ""

    // Handle profile picture upload
    if (req.file) {
      // Create a URL-friendly path to the uploaded file
      profilePictureUrl = `/uploads/profiles/${path.basename(req.file.path)}`
    }

    // Create user with role (default to "user" if not specified)
    const user = await createUser({
      fullName,
      email,
      phone,
      password,
      profilePictureUrl,
      role: role || "user",
    })

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profilePictureUrl: user.profilePictureUrl,
        role: user.role,
      },
    })
  } catch (error) {
    if (
      error.message === "User with this email already exists" ||
      error.message === "User with this phone number already exists"
    ) {
      res.status(409).json({ message: error.message })
    } else {
      console.error("User creation error:", error)
      res.status(400).json({ message: "An error occurred during sign up" })
    }
  }
}

// Login user controller
export const loginUserController = async (req, res) => {
  try {
    const { phone, password } = req.body

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" })
    }

    // Login user
    const { user, token } = await loginUser({ phone, password })

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    // Send response with token for client-side storage
    res.status(200).json({
      message: "Login successful",
      user: {
        ...user,
        role: user.role || "user", // Ensure role is included
      },
      token,
    })
  } catch (error) {
    if (error.message === "Invalid phone number or password") {
      res.status(401).json({ message: error.message })
    } else {
      console.error("Login error:", error)
      res.status(500).json({ message: "An error occurred during login" })
    }
  }
}

// Logout user controller
export const logoutUserController = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token")

    res.status(200).json({
      message: "Logout successful",
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({ message: "An error occurred during logout" })
  }
}

// Get all users controller
export const getAllUsersController = async (req, res) => {
  try {
    // Get all users
    const users = await getAllUsers()

    // Format the response
    const formattedUsers = users.map((user) => ({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      profilePictureUrl: user.profilePictureUrl,
      role: user.role,
      createdAt: user.createdAt,
    }))

    res.status(200).json({
      message: "Users retrieved successfully",
      users: formattedUsers,
    })
  } catch (error) {
    console.error("Get all users error:", error)
    res.status(500).json({ message: "An error occurred while retrieving users" })
  }
}

// Get user by ID controller
export const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id

    // Get user by ID
    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profilePictureUrl: user.profilePictureUrl,
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Get user by ID error:", error)
    res.status(404).json({ message: error.message || "User not found" })
  }
}

// Update user profile controller
export const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user.id
    const updateData = { ...req.body }

    // Handle profile picture upload
    if (req.file) {
      updateData.profilePictureUrl = `/uploads/profiles/${path.basename(req.file.path)}`
    }

    // Update user profile
    const updatedUser = await updateUserProfile(userId, updateData)

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        profilePictureUrl: updatedUser.profilePictureUrl,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
    })
  } catch (error) {
    if (error.message === "Email is already in use" || error.message === "Phone number is already in use") {
      res.status(409).json({ message: error.message })
    } else {
      console.error("Update profile error:", error)
      res.status(400).json({ message: "An error occurred while updating profile" })
    }
  }
}

// Delete user controller
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id

    // Check if the user exists
    const user = await getUserById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Delete the user
    await deleteUser(userId)

    res.status(200).json({
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ message: "An error occurred while deleting the user" })
  }
}

// Update user role controller (admin only)
export const updateUserRoleController = async (req, res) => {
  try {
    const { userId, role } = req.body

    if (!userId || !role) {
      return res.status(400).json({ message: "User ID and role are required" })
    }

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Role must be 'user' or 'admin'" })
    }

    // Check if the user exists
    const user = await getUserById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update user role
    const updatedUser = await updateUserProfile(userId, { role })

    res.status(200).json({
      message: "User role updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    })
  } catch (error) {
    console.error("Update user role error:", error)
    res.status(500).json({ message: "An error occurred while updating user role" })
  }
}

