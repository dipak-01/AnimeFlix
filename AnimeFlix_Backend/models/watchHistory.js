import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  animeId: String,
  episodeId: String,
  watchedOn: { type: Date, default: Date.now },
});

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);
export default WatchHistory;
