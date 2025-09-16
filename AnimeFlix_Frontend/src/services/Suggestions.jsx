import { useState, useEffect, useMemo, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Simple in-memory cache for suggestions (per session)
const suggestionsCache = new Map(); // key: query, value: suggestions array

const Suggestions = ({
  query,
  minLength = 2,
  debounceMs = 350,
  maxCache = 100,
}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const abortRef = useRef(null);
  const timeoutRef = useRef(null);

  // Maintain a tiny LRU by trimming when size exceeds maxCache
  const setCache = (key, value) => {
    if (suggestionsCache.has(key)) suggestionsCache.delete(key);
    suggestionsCache.set(key, value);
    if (suggestionsCache.size > maxCache) {
      const firstKey = suggestionsCache.keys().next().value;
      suggestionsCache.delete(firstKey);
    }
  };
  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  useEffect(() => {
    // Clear existing debounce timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Cancel previous in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    const q = (query || "").trim();
    if (!q || q.length < minLength) {
      setData([]);
      return;
    }

    // Serve from cache if available
    if (suggestionsCache.has(q)) {
      setData(suggestionsCache.get(q));
      return;
    }

    // Debounce fetch
    timeoutRef.current = setTimeout(async () => {
      try {
        const controller = new AbortController();
        abortRef.current = controller;
        let response;
        try {
          response = await axios.get(
            `${import.meta.env.VITE_ANIME_URL_SECONDARY}/search/suggestion`,
            { params: { q }, crossdomain: true, signal: controller.signal },
          );
        } catch (err) {
          // If aborted, just exit
          if (err?.name === "CanceledError" || err?.name === "AbortError")
            return;
          // Fallback to primary
          response = await axios.get(
            `${import.meta.env.VITE_ANIME_URL}/search/suggestion`,
            { params: { q }, crossdomain: true, signal: controller.signal },
          );
        }
        const filteredData = response?.data?.data?.suggestions ?? [];
        setData(filteredData);
        setCache(q, filteredData);
      } catch (error) {
        if (error?.name === "CanceledError" || error?.name === "AbortError")
          return;
        console.error("Error in fetching suggestions:", error);
      } finally {
        abortRef.current = null;
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query, minLength, debounceMs]);

  return (
    <div className="mt-1 max-h-72 overflow-auto rounded-xl border border-blue-300 bg-slate-900 p-2">
      {data?.length > 0 ? (
        data?.map((suggestion) => (
          <div
            onClick={() => handleClick(suggestion.id)}
            className="mb-1 cursor-pointer border-b-2 border-slate-700 bg-slate-900 p-1 text-slate-400 hover:text-slate-50"
            key={suggestion.id}
          >
            {suggestion.name ? suggestion.name : "don't search"}
          </div>
        ))
      ) : (
        <div className="mb-1 border-slate-700 bg-slate-900 p-1 text-slate-400">
          {"Baka Desu... No Suggestions Found!"}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
