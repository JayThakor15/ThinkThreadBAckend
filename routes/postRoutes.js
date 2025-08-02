import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost,
  likePost,
  addComment,
  getComments,
} from "../controllers/postController.js";

const router = express.Router();

// Create a new post
router.post("/", authMiddleware, upload.single("postImage"), createPost);

// Get all posts
router.get("/", authMiddleware, getAllPosts);

// Get user's posts
router.get("/user", authMiddleware, getUserPosts);

// Delete a post
router.delete("/:postId", authMiddleware, deletePost);

// Like/unlike a post
router.post("/:postId/like", authMiddleware, likePost);

// Add comment to post
router.post("/:postId/comment", authMiddleware, addComment);

// Get comments for a post
router.get("/:postId/comments", authMiddleware, getComments);

export default router;
