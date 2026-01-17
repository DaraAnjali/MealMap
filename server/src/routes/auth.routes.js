// server/src/routes/auth.routes.js
import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { forgotPassword, resetPassword } from "../controllers/forgotPassword.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔹 Forgot / Reset Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
