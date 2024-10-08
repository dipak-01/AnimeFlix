import { useState, useEffect } from "react";
import axios from "axios";
import {
  deleteWatchHistory,
  deleteWatchList,
} from "../services/userService";
import { Loader } from "./Loading";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function CardsType4({ animeId, epiId, identifier }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${animeId}`, { state: { epiId } });
  };

  const handleDelete = async (animeId) => {
    try {
      if (identifier === "watchhistory") {
        await deleteWatchHistory(animeId);
        toast.success("Deleted from your Watch History", { position: "bottom-left" });
      } else if (identifier === "watchlist") {
        await deleteWatchList(animeId);
        toast.success("Deleted from your WatchList", { position: "bottom-left" });
      }
      setIsVisible(false);
    } catch (error) {
      toast.error("Error deleting item", { position: "bottom-left" });
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/${animeId}`
        );
        setData(res.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch data", { position: "bottom-left" });
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      }
    };
    if (animeId) getData();
  }, [animeId]);

  if (!isVisible) return null;

  if (isLoading)
    return (
      <div className="absolute left-1/2 top-1/2">
        <Loader />
      </div>
    );

  const animeInfo = data?.anime?.info;

  return (
    <div className="h-64 min-w-28 max-w-48 sm:h-96">
      <Toaster />
      <div className="h-4/5 w-full">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-t-md bg-gray-900">
            <span className="ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-orange-500 ease-linear"></span>
          </div>
        )}
        <div className="relative h-full overflow-hidden rounded-md">
          <button
            onClick={() => handleDelete(animeInfo?.id)}
            className="absolute right-0 top-0 z-10 rounded-bl-lg bg-red-500 p-2 hover:scale-105 hover:bg-slate-300 hover:text-red-500"
          >
            <i className="fas fa-trash"></i>
          </button>
          <img
            className="absolute h-full w-full rounded-md transition-transform duration-300 ease-in-out hover:scale-110 hover:blur-[2px]"
            src={animeInfo?.poster}
            alt=""
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? "none" : "block" }}
          />
          <div className="group relative h-full overflow-hidden rounded-md">
            <img
              onClick={() => handleClick(animeInfo?.id)}
              className="absolute h-full w-full cursor-pointer rounded-md transition-transform duration-300 ease-in-out hover:scale-110 hover:blur-[2px] hover:brightness-50"
              src={animeInfo?.poster}
              alt=""
              onLoad={() => setIsLoading(false)}
              style={{ display: isLoading ? "none" : "block" }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <i className="far fa-play-circle text-5xl text-orange-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="text-left">
        <p className="text-md line-clamp-1 w-3/4 text-clip py-1">
          {animeInfo?.name}
        </p>
        <span>{animeInfo?.stats?.type}</span>
        <span className="px-4">
          <i className="fas fa-clock"></i> {animeInfo?.stats?.duration}
        </span>
      </div>
    </div>
  );
}