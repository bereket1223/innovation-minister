import express from "express";
import { createUser, login, logout, readUser, updateUser, deleteUser } from "../controllers/user/index.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" })
const router = express.Router();

router.post("/createUser", upload.single("profilePicture"), createUser)
router.post("/login", login)
router.post("/logout", logout)
router.get("/:id", readUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;