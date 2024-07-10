import { useState, useEffect } from "react";
import Swiper from "../components/Swiper";
import TrendingCards from "../components/TrendingCards";
import { Loader } from "../components/Loading";
import LatestEpisodes from "../components/LatestEpisodes";
import HomePageApi from "../services/HomePageApi";
import CardsType3 from "../components/CardsType3";
import TopUpcoming from "../components/TopUpcoming";
import { WatchData } from "./ContinueWatch";
export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await HomePageApi();
      setData(response);

      setLoading(false);
    };
    getData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="mx-auto my-4  h-auto w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0  ">
        <Swiper banners={data.spotlightAnimes} />
        <div className="py-8 text-start text-3xl text-lavender-web-500">
          Trending
        </div>
        <TrendingCards trendingAnimes={data.trendingAnimes} />
        <WatchData />
        <div className="w-full lg:flex">
          <div className="  w-full ">
            <div className="pt-8 text-start text-3xl text-lavender-web-500">
              Latest Episodes
            </div>
            <LatestEpisodes latestEpisodes={data.latestEpisodeAnimes} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:flex">
          <div className="sm:1/2 lg:w-1/4">
            <div className="py-8 text-start text-3xl text-lavender-web-500">
              Top Airing
            </div>
            <CardsType3 a={0} b={5} data={data.topAiringAnimes} />
            <div className="text-start text-lg">
              <button className="py-4">
                View More <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="sm:1/2 lg:w-1/4">
            <div className="py-8 text-start text-3xl text-lavender-web-500">
              Most Popular
            </div>
            <CardsType3 a={4} b={9} data={data.top10Animes.month} />
            <div className="text-start text-lg">
              <button className="py-4">
                View More <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="sm:1/2 lg:w-1/4">
            <div className="py-8 text-start text-3xl text-lavender-web-500">
              Most Favourite
            </div>
            <CardsType3 a={0} b={5} data={data.trendingAnimes} />
            <div className="text-start text-lg">
              <button className="py-4">
                View More <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="sm:1/2 lg:w-1/4">
            <div className="py-8 text-start text-3xl text-lavender-web-500">
              Latest Completed
            </div>
            <CardsType3 a={0} b={5} data={data.latestEpisodeAnimes} />
            <div className="text-start text-lg">
              <button className="py-4">
                View More <i className="fa-solid fa-angle-right"> </i>
              </button>
            </div>
          </div>
        </div>
        <div className="  w-full ">
          <div className="pt-8 text-start text-3xl text-lavender-web-500">
            Top Upcoming
          </div>
          <TopUpcoming topUpcoming={data.topUpcomingAnimes} />
        </div>
      </div>
    </>
  );
}
