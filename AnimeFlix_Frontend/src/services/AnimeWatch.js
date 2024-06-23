import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchData(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Attempting to fetch data for ID: ${id}`);
        const res = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/info?id=${id}`
        );
        console.log("After axios call", res.data);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, loading, error };
}
export function useFetchStreamData(episodeid) {
  const [streamData, setStreamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStreamData = async () => {
      try {
        console.log(`Attempting to fetch data for ID: ${episodeid}`);
        const res = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/episode-srcs?id=${episodeid}`
        );
        console.log("After axios call", res.data);
        setStreamData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (episodeid) {
      getStreamData();
    }
  }, [episodeid]);

  return { streamData, loading, error };
}
export function useAnimeEpisodeData(animeId) {
  const [episodeData, setEpisodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnimeEpisodeData = async () => {
      try {
        console.log(`Attempting to fetch data for ID: ${animeId}`);
        const res = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/episodes/${animeId}`
        );
        console.log("After axios call", res.data);
        setEpisodeData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (animeId) {
      getAnimeEpisodeData();
    }
  }, [animeId]);

  return { episodeData, loading, error };
}
export function useAnimeEpisodeServerData(episodeid) {
  const [episodeServerData, setEpisodeServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnimeEpisodeServerData = async () => {
      try {
        console.log(`Attempting to fetch server data for ID: ${episodeid}`);
        const res = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/servers?episodeId=${episodeid}`
        );
        console.log("After axios call", res.data);
        setEpisodeServerData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (episodeid) {
      getAnimeEpisodeServerData();
    }
  }, [episodeid]);

  return { episodeServerData, loading, error };
}
