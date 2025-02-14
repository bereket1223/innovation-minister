import express from "express";
import { createUser, readUser, updateUser, deleteUser } from "../controllers/user/index.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/createUser", upload.single("profilePicture"), createUser);
router.get("/:id", readUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;