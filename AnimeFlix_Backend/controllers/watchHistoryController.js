import WatchHistory from "../models/watchHistory.js";
import  jwt  from "jsonwebtoken";
export const addWatchData = async (req, res) => {
  try {
    const { animeId, episodeId } = req.body;
    const userId = req.user.userId;
    if (!animeId || !episodeId) {
      return res.status(400).send("Missing animeId or episodeId");
    }
    const existingEntry = await WatchHistory.findOne({ userId, animeId });
    if (existingEntry) {
      existingEntry.episodeId = episodeId;
      await existingEntry.save();
      return res.status(200).send("Watch data updated");
    }
    const watchHistory = new WatchHistory({ userId, animeId, episodeId });
    await watchHistory.save();
    return res.status(201).send("Watch data recorded");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error recording watch data");
  }
};

export const getWatchHistory = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "jwt_secret");
    const userId = decoded.userId;
    const watchHistory = await WatchHistory.find({ userId });
    if (!watchHistory) return res.status(404).send("WatchHistory not found");
    return res.json(watchHistory);
  } catch (error) {
    console.error(error);
    return res.status(401).send("Invalid or expired token");
  }
};

export const deleteWatchHistory = async (req, res) => {
  try {
    const { animeId } = req.body;
    const userId = req.user.userId;
    const result = await WatchHistory.deleteOne({ userId, animeId });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Watch history not found." });
    }
    res.send({ message: "Watch history deleted successfully." });
    return null;
  } catch (error) {
    console.error("Error deleting watch history:", error);
    res.status(500).send({ message: "Failed to delete watch history." });
    return null;
  }
};
