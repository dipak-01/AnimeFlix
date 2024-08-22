import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", authMiddleware, { getUser });
router.post("/user", authMiddleware, { updateUser });

export default router;
