import express from "express";
import { createdepartment, readdepartment, updatedepartment, deletedepartment } from "../controllers/department/index.js";
const router = express.Router();

router.post("/", createdepartment);
router.get("/:id", readdepartment);
router.put("/:id", updatedepartment);
router.delete("/:id", deletedepartment);

export default router;