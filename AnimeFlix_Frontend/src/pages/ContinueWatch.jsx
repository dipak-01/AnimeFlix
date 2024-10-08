import { useState, useEffect } from "react";
import CardsType4 from "../components/CardsType4";
import { fetchWatchHistory } from "../services/userService";
import { Loader } from "../components/Loading";

export function ContinueWatch() {
  return (
    <>
      <main className="mx-auto my-4  min-h-screen h-auto w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0  ">
        <div className="  ">
          <WatchData />
        </div>
      </main>
    </>
  );
}

export function WatchData() {
  const [watchHistoryData, setWatchHistoryData] = useState(null);
  useEffect(() => {
    fetchWatchHistory().then((data) => {
      setWatchHistoryData(data);
     });
  }, []);
  const identifier = "watchhistory";
  return (
    <>
      <div className=" ">
        {watchHistoryData && watchHistoryData.length > 0  ? (
          <>
            <div className="my-4 w-full whitespace-nowrap pb-4 text-start  text-xl lg:text-3xl text-lavender-web-500 ">
              Continue Watching
            </div>
            <div className=" grid w-full grid-cols-2 gap-8 py-8 text-slate-50 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
              {watchHistoryData.map((data) => (
                <CardsType4
                  animeId={data.animeId}
                  epiId={data.episodeId}
                  identifier={identifier}
                />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
