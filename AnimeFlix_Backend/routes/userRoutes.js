import express from "express";
import { getUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", authMiddleware, getUser);

export default router;
