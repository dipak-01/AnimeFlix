import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUpcoming from "../components/TopUpcoming";
import { addWatchListData } from "../services/userService";
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import DetailCard from "../components/AnimeInfo/DetailCard";
import SeasonsSlider from "../components/AnimeInfo/SeasonsSlider";
import AnimeBasicInfo from "../components/AnimeInfo/AnimeBasicInfo";
import AnimeInfoSkeletonLoader from "../components/SkeletonLoaders";
export default function AnimeInfo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  useEffect(() => {
    const getData = async (id) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/info?id=${id}`,
        );

        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    if (id) {
      getData(id);
    }
  }, [id]);

  const handleWatchlist = async () => {
    const animeId = id;

    if (animeId) await addWatchListData(animeId);
    toast("Added to your WatchList", { position: "bottom-left" });
  };
  if (loading) {
    return <AnimeInfoSkeletonLoader />;
  }
  const handleWatchClick = (id) => {
    navigate(`/watch/${id}`);
  };
  const info = data.anime.info;
  const moreinfo = data.anime.moreInfo;
  const seasons = data.seasons || "";
  const recommendedAnime = data.recommendedAnimes;
  const relatedAnime = data.relatedAnimes;

  if (!data || !data.anime || !info || !moreinfo)
    return <div>No data found</div>;
  return (
    <>
     
      <div className="  top-0 mx-auto my-4 h-auto min-h-screen w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6  xl:px-0">
        <Toaster />
        <div className=" mx-auto my-auto flex h-3/4 flex-col items-center justify-evenly space-x-4 space-y-6 rounded-3xl bg-gradient-to-r py-20 lg:flex-row ">
          <div className="left h-full  lg:w-1/4 ">
            <div className=" mt-1 flex justify-center  ">
              <img
                className="w-60 rounded-lg shadow-2xl shadow-blue-500/20"
                src={info.poster}
                alt="Anime Poster"
              />
            </div>
          </div>
          <AnimeBasicInfo
            info={info}
            handleWatchClick={handleWatchClick}
            handleWatchlist={handleWatchlist}
          />

          <DetailCard moreinfo={moreinfo} />
        </div>

        <div className="w-full justify-between gap-8 lg:flex">
          <SeasonsSlider seasons={seasons} />
          {relatedAnime && (
            <div
              onClick={() => handleClick(relatedAnime[0].id)}
              className="pt-8 lg:w-3/12  "
            >
              <p className="text-start text-3xl text-slate-50">Related Anime</p>
              <div className="mt-4 flex h-24 space-x-3 rounded-lg border border-slate-600 p-2 shadow">
                <div className=" h-full w-fit">
                  <img
                    className=" h-full rounded "
                    src={relatedAnime[0].poster}
                    alt="relatedAnime poster"
                  />
                </div>
                <div className="text-slate-50">
                  <p className="line-clamp-2   text-start">
                    {relatedAnime[0].name}
                  </p>
                  <div className="flex gap-4">
                    <p>{relatedAnime[0].type} </p>
                    <div className="flex text-slate-900">
                      <p className="h-fit whitespace-normal text-nowrap rounded-s-lg border border-slate-900 bg-orange-300 px-1">
                        <i className="far fa-closed-captioning "> </i>{" "}
                        {relatedAnime[0].episodes.dub}{" "}
                      </p>
                      <p className="h-fit rounded-e-lg border border-slate-900 bg-orange-100  px-1">
                        <i className="fas fa-microphone"></i>{" "}
                        {relatedAnime[0].episodes.sub}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="  w-full ">
          <div className="pt-8 text-start text-3xl text-lavender-web-500">
            Recommended Anime
          </div>
          <TopUpcoming topUpcoming={recommendedAnime} />
        </div>
      </div>
    </>
  );
}
