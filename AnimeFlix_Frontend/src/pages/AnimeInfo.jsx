import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUpcoming from "../components/TopUpcoming";
import { addWatchListData } from "../services/userService";
import { useLocation } from "react-router-dom";
import { useAlert } from "../components/AlertContext";
import { Loader } from "../components/Loading";
export default function AnimeInfo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
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
    showAlert("Added to your WatchList",'added');
  };
  if (loading) {
    return <Loader />;
  }
  const handleWatchClick = (id) => {
    navigate(`/watch/${id}`);
  };
  const info = data.anime.info;
  const moreinfo = data.anime.moreInfo;
  const seasons = data.seasons;
  const recommendedAnime = data.recommendedAnimes;
  const relatedAnime = data.relatedAnimes;

  if (!data || !data.anime || !info || !moreinfo)
    return <div>No data found</div>;
  return (
    <>
      <div className="mx-auto my-4  h-auto w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0  ">
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
          <div className="right flex h-full flex-col space-y-8 text-start text-slate-300 lg:w-2/4">
            <p className="text-start text-3xl text-slate-300">{info.name}</p>
            <div className="block text-slate-300">
              <div className="info space-y-2 lg:flex lg:space-x-4 lg:space-y-0  ">
                <div className="flex items-center space-x-4 text-start ">
                  <p> {info.stats.rating}</p>
                  <p>
                    <i className="far fa-clock text-sm"></i>{" "}
                    {info.stats.duration}
                  </p>

                  <p>
                    <i className="fas fa-tv text-xs"></i> {info.stats.type}
                  </p>
                </div>

                <div className="flex items-center text-start text-slate-900">
                  <div className=" rounded-lg  px-1 py-0 text-slate-100 lg:mx-2  ">
                    {info.stats.quality}
                  </div>
                  {info.stats.episodes.sub && (
                    <div className="h-fit whitespace-normal text-nowrap rounded-s-lg border border-slate-900 bg-orange-300 px-1">
                      <i className="  far fa-closed-captioning"></i>{" "}
                      {info.stats.episodes.sub}
                    </div>
                  )}
                  {info.stats.episodes.dub && (
                    <div className=" rounded-e-lg border border-slate-900  bg-orange-100  px-1">
                      <i className="  fas fa-microphone"></i>{" "}
                      {info.stats.episodes.dub}
                    </div>
                  )}
                </div>
                <div className="w-fit rounded-md border-2 border-orange-600 bg-orange-500 p-2 font-semibold text-slate-900 transition-colors hover:border-orange-400 hover:bg-orange-400">
                  <button
                    onClick={() => handleWatchClick(info.id)}
                    className=""
                  >
                    Watch Now
                  </button>
                </div>
                <div className="w-fit rounded-md border-2 border-orange-300 bg-orange-300 p-2 font-semibold text-slate-900 transition-colors hover:border-orange-400 hover:bg-orange-400">
                  <button onClick={() => handleWatchlist()} className="">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="italic">Overview:</p>
              <p className=" line-clamp-3">{info.description}</p>
            </div>
            <div>
              AnimeFlix is a demonstration website that I have developed to
              showcase my skills and abilities. This project is intended purely
              for educational and portfolio purposes. I do not intend to
              monetize, earn money, or derive any financial benefit from this
              website.
            </div>
          </div>
          <div className="h-full lg:w-1/4  ">
            <div className=" end  h-max  rounded-lg bg-gray-900 p-4 text-start text-slate-300 shadow-lg">
              <p>
                <span className="font-semibold italic">Japanese:</span>{" "}
                {moreinfo.japanese}
              </p>
              <p>
                <span className="font-semibold italic">Synonyms:</span>{" "}
                {moreinfo.synonyms}
              </p>
              <p>
                <span className="font-semibold italic">Aired:</span>{" "}
                {moreinfo.aired}
              </p>
              <p>
                <span className="font-semibold italic">Premiered:</span>{" "}
                {moreinfo.premiered}
              </p>
              <p>
                <span className="font-semibold italic">Duration:</span>{" "}
                {moreinfo.duration}
              </p>
              <p>
                <span className="font-semibold italic">Status:</span>{" "}
                {moreinfo.status}
              </p>
              <p>
                <span className="font-semibold italic">MAL Score:</span>{" "}
                {moreinfo.malscore}
              </p>
              <p>
                <span className="font-semibold italic">Genres:</span>{" "}
                {Array.isArray(moreinfo.genres) && moreinfo.genres.length === 1
                  ? moreinfo.genres[0]
                  : Array.isArray(moreinfo.genres)
                    ? moreinfo.genres.join(", ")
                    : moreinfo.genres}
              </p>
              <p>
                <span className="font-semibold italic">Studios:</span>{" "}
                {moreinfo.studios}
              </p>
              <p>
                <span className="font-semibold italic">Producers:</span>{" "}
                {Array.isArray(moreinfo.producers) &&
                moreinfo.producers.length === 1
                  ? moreinfo.producers[0]
                  : Array.isArray(moreinfo.producers)
                    ? moreinfo.producers.join(", ")
                    : moreinfo.producers}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full justify-between gap-8 lg:flex">
          <div className="lg:w-8/12">
            {seasons && seasons.length > 0 && (
              <div className="seasons   overflow-auto pt-8  ">
                <div>
                  <p className=" text-start text-3xl text-slate-200">Seasons</p>
                </div>
                <div className="flex">
                  {seasons.map((season, index) => (
                    <div
                      key={index}
                      onClick={() => handleClick(season.id)}
                      className="relative m-4 h-24 w-24 rounded-lg border border-slate-600 bg-cover    bg-center p-4 text-white shadow lg:w-40"
                      style={{
                        backgroundImage: `url('${season.poster}')`,
                      }}
                    >
                      {/* Semi-transparent overlay */}
                      <div className="absolute inset-0 rounded-lg bg-black/65"></div>

                      <div className="relative z-10">
                        <h3 className="line-clamp-2 text-sm font-bold lg:text-lg">
                          {season.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
