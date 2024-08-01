import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

const getToken = () => {
  return localStorage.getItem("token");
};

// Thread functions
export const createThread = async (title, body, categoryId) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.post(
      `${API_URL}/threads`,
      { title, body, categoryId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating thread:", error.response || error);
    throw error;
  }
};

export const fetchThreads = async () => {
  try {
    const response = await axios.get(`${API_URL}/thread`);
    return response.data;
  } catch (error) {
    console.error("Error fetching threads:", error.response || error);
    throw error;
  }
};
export const fetchSpecificThreads = async (threadId) => {
  // const token = getToken();
  // if (!token) throw new Error("No token found");
  try {
    const config = {
      params: {
        threadId,
      },
    };
    const response = await axios.get(
      `${API_URL}/specificthread/${threadId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching threads:", error.response || error);
    throw error;
  }
};

// Post functions
export const createPost = async (threadId, content) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.post(
      `${API_URL}/post`,
      { threadId, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response || error);
    throw error;
  }
};

export const fetchPosts = async (threadId) => {
  try {
    const config = {
      params: {
        threadId,
      },
    };
    const response = await axios.get(`${API_URL}/post/${threadId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.response || error);
    throw error;
  }
};

// Reply functions
export const createReply = async (postId, content) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.post(
      `${API_URL}/reply`,
      { postId, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reply:", error.response || error);
    throw error;
  }
};

export const fetchReplies = async (postId) => {
  try {
    const body = {
      postId: postId,
    };
    const response = await axios.post(`${API_URL}/getreply`, body);
    return response.data;
  } catch (error) {
    console.error("Error fetching replies:", error.response || error);
    throw error;
  }
};

// Like/Dislike functions
export const addReaction = async (postId, type) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.post(
      `${API_URL}/reaction`,
      { postId, type },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error adding reaction:", error.response || error);
    throw error;
  }
};

export const fetchReactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/reaction`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reactions:", error.response || error);
    throw error;
  }
};
