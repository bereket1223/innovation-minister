import express from "express"
import {
  createDepartmentController,
  getDepartmentByIdController,
  getAllDepartmentsController,
  getDepartmentsByTypeController,
  deleteDepartmentController,
  approveDepartmentController,
  rejectDepartmentController,
} from "../controllers/department/create.department.controller.js"
import { upload, handleMulterError } from "../middleware/multer.middleware.js"

const router = express.Router()

router.post("/createDepartmentController", upload.single("file"), handleMulterError, createDepartmentController)

router.get("/type/:type", getDepartmentsByTypeController)

router.delete("/delete/:id", deleteDepartmentController)

router.put("/approve/:id", approveDepartmentController)

router.put("/reject/:id", rejectDepartmentController)

router.get("/:id", getDepartmentByIdController)

router.get("/", getAllDepartmentsController)

export default router

