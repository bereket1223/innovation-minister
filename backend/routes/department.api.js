import express from "express"
import {
  createDepartmentController,
  getDepartmentByIdController,
  getAllDepartmentsController,
  getDepartmentsByTypeController,
  deleteDepartmentController,
  approveDepartmentController,
} from "../controllers/department/create.department.controller.js"
import { upload, handleMulterError } from "../middleware/multer.middleware.js"

const router = express.Router()

// Create department route with file upload middleware
router.post("/", upload.single("file"), handleMulterError, createDepartmentController)

// Get departments by type (indigenous-innovation, indigenous-research, indigenous-technology)
// IMPORTANT: Place this route BEFORE the /:id route to avoid conflicts
router.get("/type/:type", getDepartmentsByTypeController)

// Get all departments
router.get("/", getAllDepartmentsController)

// Get department by ID
router.get("/:id", getDepartmentByIdController)

// Delete department - updated to match frontend path
router.delete("/:id", deleteDepartmentController)

// Approve department - updated to match frontend path
router.put("/:id/approve", approveDepartmentController)

export default router

