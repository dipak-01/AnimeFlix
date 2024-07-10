import { useState, useEffect } from "react";
import axios from "axios";
import {
  deleteWatchHistory,
  deleteWatchList,
  fetchWatchHistory,
} from "../services/userService";
import { Loader } from "./Loading";
import { useNavigate } from "react-router-dom";
export default function CardsType4({ animeId, epiId, identifier }) {
  const [data, setData] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);  

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${animeId}`, { state: { epiId } });
  };
  const handleDelete = async (animeId) => {
    if (identifier === "watchhistory") {
      try {
        const response = await deleteWatchHistory(animeId);
        console.log(response.message);
        setIsVisible(false);
      } catch (error) {
        console.error("Error deleting watch history:", error);
      }
    }
    if (identifier === "watchlist") {
      try {
        const response = await deleteWatchList(animeId);
        console.log(response.message);
        setIsVisible(false);
      } catch (error) {
        console.error("Error deleting watch history:", error);
      }
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/info?id=${animeId}`,
        );

        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    if (animeId) getData();
  }, [animeId]);
  if (!isVisible) return null;
  if (loading)
    return (
      <>
        <div className="absolute left-1/2 top-1/2"> </div>
      </>
    );
  const animeInfo = data.anime.info;

  return (
    <>
      {!loading && (
        <div className=" h-64 min-w-28   max-w-48 sm:h-96 ">
          <div className=" h-4/5 w-full   ">
            {isLoading && (
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-t-md bg-gray-900 ">
                <span className="  ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-orange-500 ease-linear"></span>
              </div>
            )}
            <div className="relative h-full overflow-hidden rounded-md ">
              <img
                className="absolute h-full w-full rounded-md transition-transform duration-300 ease-in-out hover:scale-110 hover:blur-[2px] "
                src={animeInfo.poster}
                alt=""
                onLoad={() => setIsLoading(false)}
                style={{ display: isLoading ? "none" : "block" }}
              />
              <div className="group relative h-full overflow-hidden rounded-md">
                <img
                  onClick={() => handleClick(animeInfo.id)}
                  className="absolute h-full w-full cursor-pointer  rounded-md transition-transform duration-300 ease-in-out hover:scale-110 hover:blur-[2px] hover:brightness-50"
                  src={animeInfo.poster}
                  alt=""
                  onLoad={() => setIsLoading(false)}
                  style={{ display: isLoading ? "none" : "block" }}
                />
                <button
                  onClick={() => handleDelete(animeInfo.id)}
                  className="absolute right-0 top-0 z-10 rounded-bl-lg bg-red-500 p-2 hover:scale-105 hover:bg-slate-300 hover:text-red-500"
                >
                  <i className="fas fa-trash"></i>
                </button>
                <div className="pointer-events-none absolute inset-0 flex  items-center justify-center">
                  <i className="far fa-play-circle text-5xl text-orange-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></i>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" 
          text-left  "
          >
            <p className="  text-md line-clamp-1 w-3/4 text-clip py-1">
              {animeInfo.name}
            </p>
            <span className="   ">{animeInfo.stats.type}</span>
            <span className="px-4  ">
              <i className="fas fa-clock"></i> {animeInfo.stats.duration}
            </span>
          </div>
        </div>
      )}
    </>
  ); // Your JSX here
}
