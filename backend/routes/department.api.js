import express from "express";
import multer from "multer";
import { createDepartment, getIndigenousDataController, updateDepartment, deleteDepartment } from "../controllers/department/index.js";

import { upload, handleMulterError } from "../middleware/multer.middleware.js"

const router = express.Router()

// Create department route with file upload middleware
router.post(
  "/createDepartment",
  upload.single("file"), // 'file' is the field name from the frontend
  handleMulterError,
  createDepartment,
)

router.get("/:department", getIndigenousDataController)
router.put("/:id", updateDepartment)
router.delete("/:id", deleteDepartment)

export default router





