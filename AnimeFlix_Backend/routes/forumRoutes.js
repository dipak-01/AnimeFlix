import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createThread,
  createCategory,
  getCategories,
  getThreads,
  createPost,
  getPosts,
  createReply,
  getReplies,
  doLike,
  getLikes,
  getSpecificThreads,
} from "../controllers/forumController.js";

const router = express.Router();
router.post("/category", authMiddleware, createCategory);
router.get("/category", authMiddleware, getCategories);
router.post("/thread", authMiddleware, createThread);
router.get("/thread", authMiddleware, getThreads);
router.get("/specificthread/:threadId", authMiddleware, getSpecificThreads);
router.post("/post", authMiddleware, createPost);
router.get("/post/:threadId", authMiddleware, getPosts);
router.post("/reply", authMiddleware, createReply);
router.post("/getreply", authMiddleware, getReplies);
router.post("/like", authMiddleware, doLike);
router.get("/like", authMiddleware, getLikes);

export default router;
