import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  avatarUrl: {
    type: String,
    default:
      "https://cdn.discordapp.com/attachments/754904606923948115/1260259458362376263/tumblr_f85905ebe1fe84a84804aa859db2a35a_8e6ca623_100.png?ex=668f5455&is=668e02d5&hm=d2ac88426b58a02789197cc3b79981c372654d899c149d2fed0c3922bca9fc8f&",
  },
  bio: String,
});

const User = mongoose.model("User", userSchema);
export default User;
