import express from "express";
import protect from "../middleware/authMiddleware.js";
import createPost from "../controllers/post/createPost.js";
import getPosts from "../controllers/post/getPosts.js";
import deletePost from "../controllers/post/deletePost.js";
import likePost from "../controllers/post/likePost.js";
import savePost from "../controllers/post/savePost.js";
import getTrendingPosts from "../controllers/post/getTrendingPosts.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.get("/trending", protect, getTrendingPosts);
router.patch("/:postId/like", protect, likePost);
router.patch("/:postId/save", protect, savePost);
router.delete("/:postId", protect, deletePost);

export default router;