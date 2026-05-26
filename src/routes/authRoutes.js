import express from "express";
import protect from "../middleware/authMiddleware.js";
import registerUser from "../controllers/auth/registerUser.js";
import loginUser from "../controllers/auth/loginUser.js";
import logoutUser from "../controllers/auth/logoutUser.js";
import forgotPassword from "../controllers/auth/forgotPassword.js";
import resetPassword from "../controllers/auth/resetPassword.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
