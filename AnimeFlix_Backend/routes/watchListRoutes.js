import express from "express";
import {
  addToWatchList,
  getWatchList,
  deleteWatchList,
} from "../controllers/watchListController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/watchlist", authMiddleware, addToWatchList);
router.get("/watchlist", authMiddleware, getWatchList);
router.delete("/watchlist", authMiddleware, deleteWatchList);

export default router;
