import express from "express"
import {
  createUserController,
  loginUserController,
  logoutUserController,
  updateUserProfileController,
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
} from "../controllers/user/create.user.controller.js"
import { verifyToken } from "../middleware/auth.js"
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

// User deletion route
router.delete("/:id", verifyToken, deleteUserController)

export default router

