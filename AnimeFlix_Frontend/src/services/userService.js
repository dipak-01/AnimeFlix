import axios from "axios";
const getToken = () => localStorage.getItem("token");

const API_URL = `${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

export const watchData = async (animeId, episodeId) => {
 
  const tokenn = getToken();

  if (!animeId || !episodeId || !tokenn) {
    console.error("Invalid parameters: ", { animeId, episodeId, tokenn });
    throw new Error("Invalid parameters");
  }
  try {
    const response = await axios.post(
      `${API_URL}/watchdata`,
      { animeId, episodeId }, // Assuming the API expects animeId and episodeId in the request body
      {
        headers: {
          Authorization: `Bearer ${tokenn}`, // Ensure token is correctly obtained and passed
        },
      },
    );
     return response.data; // It's usually more useful to return just the data part of the response
  } catch (error) {
    console.error("An error occurred:", error.response || error);
    throw error;
  }
};
export const addWatchListData = async (animeId) => {
   
  const tokenn = getToken();

  if (!animeId || !tokenn) {
    console.error("Invalid parameters: ", { animeId,tokenn });
    throw new Error("Invalid parameters");
  }
  try {
    const response = await axios.post(
      `${API_URL}/watchlist`,
      { animeId }, // Assuming the API expects animeId and episodeId in the request body
      {
        headers: {
          Authorization: `Bearer ${tokenn}`, // Ensure token is correctly obtained and passed
        },
      },
    );
  
    return response.data; // It's usually more useful to return just the data part of the response
  } catch (error) {
    console.error("An error occurred:", error.response || error);
    throw error;
  }
};

export const fetchWatchList = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/watchlist`, config);
  
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);

    return null;
  }
};
export const fetchWatchHistory = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/watchhistory`, config);
  
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);

    return null;
  }
};

export const deleteWatchHistory = async (animeId) => {
  const token = getToken();
  if (!token || !animeId) {
    console.error("No token found || No animeId found");
    return null;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { animeId },
    };
    const response = await axios.delete(
      `${API_URL}/watchhistory`,

      config,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);

    return null;
  }
};
export const deleteWatchList = async (animeId) => {
  const token = getToken();
  if (!token || !animeId) {
    console.error("No token found || No animeId found");
    return null;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { animeId },
    };
    const response = await axios.delete(
      `${API_URL}/watchlist`,

      config,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);

    return null;
  }
};
