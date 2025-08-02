import express from "express";
import { signup, login } from "../controllers/authController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";

const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Dashboard Route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the dashboard!",
    user: req.user,
  });
});

export default router;
