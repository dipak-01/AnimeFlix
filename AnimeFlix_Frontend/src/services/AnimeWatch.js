import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchData(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL_SECONDARY}/${id}`,
          )) ||
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL}/${id}`,
          ));
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
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
        const res =
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL_SECONDARY}/episode/sources?animeEpisodeId=${episodeid}`,
          )) ||
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL}/episode/sources?animeEpisodeId=${episodeid}`,
          ));
        setStreamData(res.data.data);
        setLoading(false);
      } catch (error) {
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
        const res =
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL_SECONDARY}/anime/${animeId}/episodes`,
          )) ||
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL}/anime/${animeId}/episodes`,
          ));
        setEpisodeData(res.data.data);
        setLoading(false);
      } catch (error) {
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
// for server data
export function useAnimeEpisodeServerData(episodeid) {
  const [episodeServerData, setEpisodeServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnimeEpisodeServerData = async () => {
      try {
        const res =
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL_SECONDARY}/episode/servers?animeEpisodeId=${episodeid}`,
          )) ||
          (await axios.get(
            `${import.meta.env.VITE_ANIME_URL}/episode/servers?animeEpisodeId=${episodeid}`,
          ));
        setEpisodeServerData(res.data.data);
        setLoading(false);
      } catch (error) {
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
