import express from "express"
import { verifyToken } from "../middleware/auth.js"
import {
  createSheetOne,
  getAllSheetOnes,
  getSheetOne,
  updateSheetOne,
  deleteSheetOne,
} from "../controllers/sheet-one-controller.js"

const router = express.Router()

// Create a new sheet one entry
router.post("/", verifyToken, createSheetOne)

// Get all sheet one entries
router.get("/", verifyToken, getAllSheetOnes)

// Get a single sheet one entry
router.get("/:id", verifyToken, getSheetOne)

// Update a sheet one entry
router.put("/:id", verifyToken, updateSheetOne)

// Delete a sheet one entry
router.delete("/:id", verifyToken, deleteSheetOne)

export default router

