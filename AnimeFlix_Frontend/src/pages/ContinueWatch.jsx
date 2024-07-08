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

  return (
    <>
      <main className="mx-auto my-4  h-auto w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0  ">
        <div className="my-4 text-start text-3xl text-lavender-web-500">
          Continue Watching
        </div>
        <div className="    grid w-full grid-cols-2 gap-8 py-8 text-slate-50 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {watchHistoryData &&
            watchHistoryData.map((data) => (
              <CardsType4 animeId={data.animeId} />
            ))}
        </div>
      </main>
    </>
  );
}
