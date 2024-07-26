import { Post, Thread, Category, Reply, Like } from "../models/forum.js";

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createThread = async (req, res) => {
  try {
    const { title, body, categoryId } = req.body;
    const userId = req.user.userId;
    if (!categoryId) {
      throw new Error("categoryId is required");
    }
    const thread = new Thread({ title, body, categoryId, userId });
    await thread.save();
    return res.status(201).json(thread);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find();
    return res.status(200).json(threads);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getSpecificThreads = async (req, res) => {
  try {
    const { threadId } = req.params;

    const thread = await Thread.findOne({ _id: threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    return res.status(200).json(thread);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { threadId, content } = req.body;
    const userId = req.user.userId;
    const post = new Post({ threadId, content, userId });
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { threadId } = req.params;

     
    const thread = await Thread.findById(threadId);
    if (!thread) {
      console.log('Thread not found');
      return res.status(404).json({ error: "Thread not found" });
    }

    const posts = await Post.find({ threadId }).populate('userId', 'username email avatarUrl');
 
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error in getPosts:', error);
    return res.status(400).json({ error: error.message });
  }
};

export const createReply = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.userId;
    const reply = new Reply({ postId, content, userId });
    await reply.save();
     
    return res.status(201).json(reply);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getReplies = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await Post.find({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: "Thread not found" });
    }
    const replies = await Reply.find({ postId: postId }).populate('userId', 'username email avatarUrl');
    console.log(replies);
    return res.status(200).json(replies);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const doLike = async (req, res) => {
  try {
    const { postId, type } = req.body;
    const userId = req.user.userId;

    const existingReaction = await Like.findOne({ userId, postId });

    if (existingReaction) {
      if (existingReaction.type === type) {
        await existingReaction.deleteOne();
        return res.status(200).send(`Post ${type} removed`);
      } else {
        existingReaction.type = type;
        await existingReaction.save();
        return res.status(200).send(`Post ${type} updated`);
      }
    }

    const like = new Like({ userId, postId, type });
    await like.save();
    return res.status(201).send(`Post ${type} added`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    return res.status(200).json(likes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const testPopulate = async () => {
  try {
    const posts = await Post.find();
    // console.log("Posts before populate:", posts);
    const populatedPosts = await Post.find().populate("userId");
    // console.log("Posts after populate:", populatedPosts);
  } catch (error) {
    console.error("Populate test failed:", error.message);
  }
};

testPopulate();
