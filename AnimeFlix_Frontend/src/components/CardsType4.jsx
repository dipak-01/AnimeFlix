import { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "./Loading";

export default function CardsType4({ animeId }) {
  const [data, setData] = useState(null); // Initialize data as null for clarity
  const [loading, setLoading] = useState(true); // Start with loading true
  const [isLoading, setIsLoading] = useState(true);

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
        <div
          onClick={() => handleClick(animeInfo.id)}
          className=" h-68 min-w-32 max-w-56 sm:h-96  "
        >
          <div className="h-4/5 w-full   ">
            {isLoading && (
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-t-md bg-gray-900 ">
                <span className="  ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-orange-500 ease-linear"></span>
              </div>
            )}
            <div className="relative h-full overflow-hidden rounded-md">
              <img
                className="    h-full w-full rounded-md transition-transform  duration-300  ease-in-out hover:scale-110 hover:blur-[1px]"
                src={animeInfo.poster}
                alt=""
                onLoad={() => setIsLoading(false)}
                style={{ display: isLoading ? "none" : "block" }}
              />
              <i className=" fas  fa-play  absolute top-1/2 align-middle text-4xl text-orange-500 transition-transform   hover:top-2"></i>
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
