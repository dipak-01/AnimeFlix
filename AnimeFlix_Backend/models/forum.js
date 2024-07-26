import mongoose from "mongoose";
 
//   Category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});
const Category = mongoose.model("Category", categorySchema);

//   Thread schema
const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const Thread = mongoose.model("Thread", threadSchema);

//   Post schema
const postSchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);

//   Reply schema
const replySchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Reply = mongoose.model("Reply", replySchema);

//  Like schema
const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  type: { type: String, enum: ["like", "dislike"], required: true },
  createdAt: { type: Date, default: Date.now },
});
likeSchema.index({ userId: 1, postId: 1 }, { unique: true });
const Like = mongoose.model("Like", likeSchema);

export { Post, Thread, Category, Reply, Like };
