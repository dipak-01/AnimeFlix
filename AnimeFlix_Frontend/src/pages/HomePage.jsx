// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import { useState, useEffect } from "react";
import Swiper from "../components/Swiper";
import TrendingCards from "../components/TrendingCards";
import LatestEpisodes from "../components/LatestEpisodes";
import GenresCard from "../components/GenresCard";
import HomePageApi from "../services/HomePageApi";
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
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="px-12  text-slate-50">
        {/* <Navbar /> */}
        <Swiper banners={data.spotlightAnimes} />
        <div className="text-3xl text-start py-8">Trending</div>
        <TrendingCards trendingAnimes={data.trendingAnimes} />
        <div className="lg:flex ">
          <div className="lg:w-3/4">
            <div className="text-3xl text-start pt-8">Latest Episodes</div>
            <LatestEpisodes latestEpisodes={data.latestEpisodeAnimes} />
          </div>
          <div className="lg:w-1/4">
            <div className="text-3xl text-start py-8">Genres</div>
            <GenresCard genre={data.genres} />
          </div>
        </div>
        <div></div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
