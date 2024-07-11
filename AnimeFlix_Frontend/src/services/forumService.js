import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`; // Adjust this to match your backend API URL

const getToken = () => {
  return localStorage.getItem("token"); // or however you store your token
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
  const token = getToken();
  if (!token) throw new Error("No token found");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/thread`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching threads:", error.response || error);
    throw error;
  }
};
export const fetchSpecificThreads = async (threadId) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      `${API_URL}/posts`,
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
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      `${API_URL}/replies`,
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
  const token = getToken();
  if (!token) throw new Error("No token found");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     
    };
    const body={
      postId: postId,
    }
    const response = await axios.post(`${API_URL}/getreply`,body, config);
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
  const token = getToken();
  if (!token) throw new Error("No token found");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/reaction`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching reactions:", error.response || error);
    throw error;
  }
};
