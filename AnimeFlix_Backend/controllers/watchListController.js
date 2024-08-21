import WatchList from "../models/watchList.js";
import  jwt  from "jsonwebtoken";
export const addToWatchList = async (req, res) => {
  try {
    const { animeId } = req.body;
    const userId = req.user.userId;
    if (!animeId) {
      return res.status(400).send("Missing animeId");
    }
    const existingEntry = await WatchList.findOne({ userId, animeId });
    if (existingEntry) {
      await existingEntry.save();
      return res.status(200).send("Watch List updated");
    }
    const watchList = new WatchList({ userId, animeId });
    await watchList.save();
    return res.status(201).send("Watch list recorded");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error recording watch list");
  }
};

export const getWatchList = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwt_secret");
    const userId = decoded.userId;
    const watchList = await WatchList.find({ userId });
    if (!watchList) return res.status(404).send("WatchList not found");
    return res.json(watchList);
  } catch (error) {
    console.error(error);
    return res.status(401).send("Invalid or expired token");
  }
};

export const deleteWatchList = async (req, res) => {
  try {
    const { animeId } = req.body;
    const userId = req.user.userId;
    const result = await WatchList.deleteOne({ userId, animeId });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Watch list not found." });
    }
    res.send({ message: "Watch list deleted successfully." });
    return null;
  } catch (error) {
    console.error("Error deleting watch list:", error);
    res.status(500).send({ message: "Failed to delete watch list." });
    return null;
  }
};
