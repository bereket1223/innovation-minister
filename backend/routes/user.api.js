import express from "express";
import { createUser, readUser, updateUser, deleteUser } from "../controllers/user/index.js";
const router = express.Router();

router.post("/", createUser);
router.get("/:id", readUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;