import express from "express";
import {
  addWatchData,
  getWatchHistory,
  deleteWatchHistory,
} from "../controllers/watchHistoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/watchdata", authMiddleware, addWatchData);
router.get("/watchhistory", authMiddleware, getWatchHistory);
router.delete("/watchhistory", authMiddleware, deleteWatchHistory);

export default router;
