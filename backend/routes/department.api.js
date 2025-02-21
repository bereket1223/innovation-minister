import express from "express";
import multer from "multer";
import { createDepartment, getIndigenousDataController, updateDepartment, deleteDepartment } from "../controllers/department/index.js";

const upload = multer({ dest: "uploads/" })
const router = express.Router()

router.post("/createDepartment", upload.single("file"), createDepartment)
router.get("/:department", getIndigenousDataController)
router.put("/:id", updateDepartment)
router.delete("/:id", deleteDepartment)

export default router





