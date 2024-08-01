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
router.get("/category", getCategories);
router.post("/thread", authMiddleware, createThread);
router.get("/thread", getThreads);
router.get("/specificthread/:threadId", getSpecificThreads);
router.post("/post", authMiddleware, createPost);
router.get("/post/:threadId", getPosts);
router.post("/reply", authMiddleware, createReply);
router.post("/getreply", getReplies);
router.post("/like", authMiddleware, doLike);
router.get("/like", getLikes);

export default router;
