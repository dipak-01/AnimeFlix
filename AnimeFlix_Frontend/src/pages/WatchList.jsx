 
import { useState, useEffect } from "react";
import CardsType4 from "../components/CardsType4";
import { fetchWatchList } from "../services/userService";
import { Loader } from "../components/Loading";
export default function WatchList() {
  const [watchListData, setWatchListData] = useState(null);
  useEffect(() => {
    fetchWatchList().then((data) => {
      setWatchListData(data);
     
    });
  }, []);
const identifier="watchlist"
  return (
    <>
      {watchListData? (
        <main className="mx-auto my-4  min-h-screen h-auto w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0">
          <div className="my-4 text-start text-3xl text-lavender-web-500">
            Your WatchList
          </div>
          <div className="    grid w-full grid-cols-2 gap-8 py-8 text-slate-50 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {watchListData?.map((data,index) => (
                <CardsType4 key={index} animeId={data.animeId} identifier={identifier} />
              ))}
          </div>
        </main>
      ):(<>
        <main className="mx-auto my-4  h-auto w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0">
          <Loader/>
        </main>
      </>)}
    </>
  );
}
