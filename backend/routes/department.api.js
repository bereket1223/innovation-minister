import express from "express";
import multer from 'multer';
import {createDepartment , readdepartment, updatedepartment, deletedepartment } from "../controllers/department/index.js";
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/createDepartment ', upload.single('file'),createDepartment );
router.get("/:id", readdepartment);
router.put("/:id", updatedepartment);
router.delete("/:id", deletedepartment);

export default router;





