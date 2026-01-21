// server/src/routes/auth.routes.js
import express from "express";
import { login, register, forgotPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔹 Forgot Password
router.post("/forgot-password", forgotPassword);

export default router;
