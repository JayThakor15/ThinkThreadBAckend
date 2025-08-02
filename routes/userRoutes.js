import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const profileRouter = express.Router();

profileRouter.get("/profile", authMiddleware, getProfile);

profileRouter.put(
  "/profile",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "coverImg", maxCount: 1 },
  ]),
  authMiddleware,
  updateProfile
);

export default profileRouter;
