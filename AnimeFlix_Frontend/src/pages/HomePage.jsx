import { useState, useEffect } from "react";
import Swiper from "../components/Swiper";
import { useAlert } from "../components/AlertContext";
import TrendingCards from "../components/TrendingCards";
import { Loader } from "../components/Loading";
import LatestEpisodes from "../components/LatestEpisodes";
import HomePageApi from "../services/HomePageApi";
import CardsType3 from "../components/CardsType3";
import TopUpcoming from "../components/TopUpcoming";
import { WatchData } from "./ContinueWatch";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  const handleRedirectPage = (page, animeData) => {
    console.log(animeData);
    if (page === "mostPopularAnimes") {
      navigate("/anime/mostpopular", { state: { data: animeData, pageName:"Most Popular"}  });
    }
    if (page === "mostFavourite") {
      navigate("/anime/mostfavourite", { state: { data: animeData, pageName:"Most Favourite"}  });
    }
    if (page === "topAiring") {
      navigate("/anime/topairing", { state: { data: animeData ,pageName:"Top Airing"} });
    }
    if (page === "latestCompleted") {
      navigate("/anime/latestcompleted", { state: { data: animeData, pageName:"Latest Completed"}  });
    }
  };
  return (
    <>
      <div className="h-autow-full mx-auto my-4 min-h-screen max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0  ">
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
              <button onClick={() =>
                  handleRedirectPage(
                    "topAiring",
                    data.topAiringAnimes,
                  )
                } className="py-4">
                View More <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="sm:1/2 lg:w-1/4">
            <div className="py-8 text-start text-3xl text-lavender-web-500">
              Most Popular
            </div>
            <CardsType3 a={0} b={5} data={data.mostPopularAnimes} />
            <div className="text-start text-lg">
              <button
                className="py-4"
                onClick={() =>
                  handleRedirectPage(
                    "mostPopularAnimes",
                    data.mostPopularAnimes,
                  )
                }
              >
                View More <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="sm:1/2 lg:w-1/4">
            <div className="py-8 text-start text-3xl text-lavender-web-500">
              Most Favourite
            </div>
            <CardsType3 a={0} b={5} data={data.mostFavoriteAnimes} />
            <div className="text-start text-lg">
              <button onClick={() =>
                  handleRedirectPage(
                    "mostFavourite",
                    data.mostFavoriteAnimes,
                  )
                }  className="py-4">
                View More <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="sm:1/2 lg:w-1/4">
            <div className="py-8 text-start text-3xl text-lavender-web-500">
              Latest Completed
            </div>
            <CardsType3 a={0} b={5} data={data.latestCompletedAnimes} />
            <div className="text-start text-lg">
              <button onClick={() =>
                  handleRedirectPage(
                    "latestCompleted",
                    data.latestCompletedAnimes,
                  )
                }  className="py-4">
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
