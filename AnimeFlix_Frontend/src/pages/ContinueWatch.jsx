import { useState, useEffect } from "react";
import CardsType4 from "../components/CardsType4";
import { fetchWatchHistory } from "../services/userService";
export default function () {
  const [watchHistoryData, setWatchHistoryData] = useState(null);
  useEffect(() => {
    fetchWatchHistory().then((data) => {
      setWatchHistoryData(data);
      console.log(watchHistoryData);
    });
  }, []);
const identifier="watchhistory"
  return (
    <>
      <main className="lg:px-6 px-2  text-slate-50 w-full h-auto max-w-[1420px] my-4 mx-auto xl:px-0 sm:px-4  ">
        <div className="text-3xl text-start my-4 text-lavender-web-500">
          Continue Watching
        </div>
        <div className="    w-full text-slate-50 py-8 gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {watchHistoryData &&
            watchHistoryData.map((data) => (
              <CardsType4 animeId={data.animeId} epiId={data.episodeId}  identifier={identifier} />
            ))}
        </div>
      </main>
    </>
  );
}
