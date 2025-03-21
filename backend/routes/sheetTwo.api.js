import express from "express"
import { verifyToken } from "../middleware/auth.js"
import {
  createSheetTwo,
  getAllSheetTwos,
  getSheetTwo,
  updateSheetTwo,
  deleteSheetTwo,
} from "../controllers/sheet-two-controller.js"

const router = express.Router()

// Create a new sheet two entry
router.post("/", verifyToken, createSheetTwo)

// Get all sheet two entries
router.get("/", verifyToken, getAllSheetTwos)

// Get a single sheet two entry
router.get("/:id", verifyToken, getSheetTwo)

// Update a sheet two entry
router.put("/:id", verifyToken, updateSheetTwo)

// Delete a sheet two entry
router.delete("/:id", verifyToken, deleteSheetTwo)

export default router

