import express from "express"
import {
  createUserController,
  loginUserController,
  logoutUserController,
  updateUserProfileController,
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
  updateUserRoleController,
} from "../controllers/user/create.user.controller.js"
import { verifyToken, isAdmin } from "../middleware/auth.js"
import { uploadProfile, handleMulterError } from "../middleware/multer.middleware.js"

const router = express.Router()

// Public routes
router.post("/register", uploadProfile.single("profilePicture"), handleMulterError, createUserController)
router.post("/login", loginUserController)
router.post("/logout", logoutUserController)

// Protected routes
router.put(
  "/profile",
  verifyToken,
  uploadProfile.single("profilePicture"),
  handleMulterError,
  updateUserProfileController,
)

// User retrieval routes
router.get("/", verifyToken, getAllUsersController)
router.get("/:id", verifyToken, getUserByIdController)

// Admin only routes
router.put("/role", verifyToken, isAdmin, updateUserRoleController)

// User deletion route (admin only)
router.delete("/:id", verifyToken, isAdmin, deleteUserController)

export default router

