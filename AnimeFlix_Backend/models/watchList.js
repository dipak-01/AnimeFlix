import mongoose from "mongoose";

const watchListSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  animeId: String,
  addedOn: { type: Date, default: Date.now },
});

const WatchList = mongoose.model("WatchList", watchListSchema);
export default WatchList;
