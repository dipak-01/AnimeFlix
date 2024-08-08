import { useState, useEffect } from "react";
import {
  useFetchData,
  useFetchStreamData,
  useAnimeEpisodeData,
  useAnimeEpisodeServerData,
} from "../services/AnimeWatch";
import { fetchAnimeInfo } from "../redux/slice/animeInfoSlice";
import { useSelector, useDispatch } from "react-redux";
import { PlayIcon } from "@vidstack/react/icons";
// Base styles for media player and provider (~400B).
import "@vidstack/react/player/styles/base.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Loader } from "../components/Loading";
import TopUpcoming from "../components/TopUpcoming";
import VideoPlayer from "../services/VideoPlayer";
import { watchData } from "../services/userService";
import Stream from "../components/Svg";

export default function AnimeStream() {
  // const dispatch=useDispatch();
  // const animeInfoData = useSelector((state) => state.animeInfo.data);
  const [isLoading, setIsLoading] = useState(true);

  const [loadingVideo, setLoadingVideo] = useState(true);
  const location = useLocation();
  const { epiId } = location.state || {};
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(epiId || null);
  const { id } = useParams();
  const { data, loading, error } = useFetchData(id);
  const {
    episodeData,
    loading: loadingEpisodeData,
    error: errorFetchingEpisodeData,
  } = useAnimeEpisodeData(id);
  const {
    episodeServerData,
    loading: loadingServer,
    error: errorServer,
  } = useAnimeEpisodeServerData(selectedEpisodeId);
  const {
    streamData,
    loading: loadingStreamData,
    error: errorStreamData,
  } = useFetchStreamData(selectedEpisodeId);
  const navigate = useNavigate();

  useEffect(() => {
    if (epiId) {
      setSelectedEpisodeId(epiId);
      setIsLoading(false);
    } else if (episodeData && episodeData.episodes.length > 0) {
      setSelectedEpisodeId(episodeData.episodes[0].episodeId);
      setIsLoading(false);
    }
  }, [episodeData]);

  useEffect(() => {
    const sendData = async () => {
      const episodeId = selectedEpisodeId;
      const animeId = id;
      if (animeId && episodeId) await watchData(animeId, episodeId);
    };

    sendData();
  }, [selectedEpisodeId, id]);

  const handleClick = () => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  };
  // const classOfDiv = document.querySelector(".overlay");

  const add = () => {
    setIsLoading(true);
    const currentIndex = episodeData.episodes.findIndex(
      (epi) => epi.episodeId === selectedEpisodeId,
    );
    if (currentIndex < episodeData.episodes.length - 1) {
      setSelectedEpisodeId(episodeData.episodes[currentIndex + 1].episodeId);
    }
    setIsLoading(false);
  };

  const sub = () => {
    const currentIndex = episodeData.episodes.findIndex(
      (epi) => epi.episodeId === selectedEpisodeId,
    );
    if (currentIndex > 0) {
      setSelectedEpisodeId(episodeData.episodes[currentIndex - 1].episodeId);
    }
  };

  if (loading || loadingEpisodeData || loadingServer || loadingStreamData) {
    return <Loader />;
  }

  if (error || errorFetchingEpisodeData || errorServer || errorStreamData) {
    return <div>Error: {error.message}</div>;
  }

  if (
    !data ||
    !data.anime ||
    !data.anime.info ||
    !episodeData ||
    !episodeData.episodes
  ) {
    return <Loader />;
  }

  const info = data.anime.info;
  const relatedAnime = data.relatedAnimes;
  const recommendedAnime = data.recommendedAnimes;

  const episodes = episodeData.episodes;
  const handleWatchTogether = ( info) => {
    if (!id&&info) {
      console.error("Invalid ID provided");
      return;
    }

    console.log(id);
    navigate(`/watchtogether/create/${info.id}`, {
      state: { data: info},
    });;
    // navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  };
  return (
    <div className="mx-auto my-4 h-auto min-h-screen w-full max-w-[1420px] px-4 text-start  sm:px-4 lg:px-6 xl:px-0">
      <div className="mx-auto my-auto flex w-full flex-col space-x-6 space-y-4 rounded-3xl lg:flex-row lg:space-y-0 lg:py-10">
        <div className="flex flex-col-reverse lg:w-3/4 lg:flex-row">
          <div className="mostly-customized-scrollbar max-h-[550px] overflow-auto border-pink-500 text-slate-100 lg:w-1/4">
            <p className="border border-gray-900 py-2 pl-6 text-sm">
              List of Episodes
            </p>
            {/* {isLoading && <div className="w-full h-full rounded-t-md bg-gray-900 flex items-center justify-center ">
               
               <span className="  animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-orange-500 ml-3"></span>
             </div>}
              */}
            {episodes &&
              episodes.map((epi, index) => (
                <div
                  style={{ display: isLoading ? "none" : "flex" }}
                  onClick={() => setSelectedEpisodeId(epi.episodeId)}
                  className={`flex w-full border ${
                    epi.episodeId === selectedEpisodeId
                      ? "font-semibold text-orange-500"
                      : "" || epi.number % 2 !== 0
                        ? "bg-gray-800"
                        : "bg-gray-900"
                  } border-gray-900 py-3 text-xs`}
                  key={index}
                >
                  <div className="w-1/6 text-center">{epi.number}</div>
                  <div className="line-clamp-1 w-4/6 cursor-pointer">
                    {epi.title}
                  </div>
                  <div
                    className={`w-1/6 ${
                      epi.episodeId === selectedEpisodeId
                        ? "selected-episode"
                        : ""
                    }`}
                  >
                    {epi.episodeId === selectedEpisodeId && (
                      <span
                        className="selected-indicator"
                        aria-label="Selected Episode"
                      >
                        <i className="fas fa-play"></i>
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="lg:w-4/5">
            <div>
              {" "}
              {isLoading && (
                <div className="z-10 flex h-full w-full items-center justify-center rounded-t-md bg-gray-900 ">
                  <span className="  ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-orange-500 ease-linear"></span>
                </div>
              )}
              {streamData && (
                <div className="">
                  <VideoPlayer
                    src={streamData.sources[0]?.url}
                    data={streamData}
                  ></VideoPlayer>
                  {/* <Artplayer
                    source={streamData.sources[0]?.url}
                    data={streamData}
                    style={{ width: "full", height: "100%", margin: "0" }}
                    getInstance={(art) => {
                      art.on("ready", () => setLoadingVideo(false));
                      art.on("loadedmetadata", () => setLoadingVideo(false));
                    }}
                  /> */}
                  {/* <VideoPlayer
                    style={{ width: "full", height: "100%", margin: "0" }}
                    src={streamData.sources[0]?.url}
                  /> */}
                </div>
              )}
            </div>
            <div className="flex w-full justify-end gap-2 bg-gray-900 py-1 text-end text-xs font-semibold">
              <button
                onClick={() => sub()}
                className="m-1 rounded-sm bg-orange-200 p-1"
              >
                Previous
              </button>
              <button
                onClick={() => add()}
                className="m-1 rounded-sm bg-orange-200 p-1"
              >
                Next
              </button>
              <button
                onClick={() => handleWatchTogether(info)}
                className="rounded-sm pr-4  text-center"
              >
                <Stream />
              </button>
            </div>
            <div className="flex">
              <div className="w-1/4 rounded-l-md bg-orange-300 p-1 text-center text-xs font-semibold text-gray-800">
                <p className="line-clamp-3 lg:line-clamp-none">
                  You are streaming Episode {episodeServerData?.episodeNo}. If
                  the current server doesn&apos;t work, please try other servers
                  beside.
                </p>
              </div>
              <div className="w-3/4 rounded-r-md bg-gray-600 p-1 text-xs font-bold text-gray-950">
                <div className="flex h-1/2 items-center justify-start space-x-4 border-b-2 border-gray-900">
                  <span>
                    <i className="fas fa-closed-captioning"></i> SUB:
                  </span>
                  <span className="space-x-2 uppercase">
                    {episodeServerData?.sub[0]?.serverName && (
                      <span className="rounded-sm bg-orange-200 px-1">
                        {episodeServerData.sub[0].serverName}
                      </span>
                    )}
                    {episodeServerData?.sub[1]?.serverName && (
                      <span className="rounded-sm bg-orange-200 px-1">
                        {episodeServerData.sub[1].serverName}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex h-1/2 items-center justify-start space-x-5">
                  <span>
                    <i className="fas fa-microphone"></i> DUB:
                  </span>
                  <span className="space-x-2 uppercase">
                    {episodeServerData?.dub[0]?.serverName && (
                      <span className="rounded-sm bg-orange-200 px-1">
                        {episodeServerData.dub[0]?.serverName}
                      </span>
                    )}
                    {episodeServerData?.dub[1]?.serverName && (
                      <span className="rounded-sm bg-orange-200 px-1">
                        {episodeServerData.dub[1].serverName}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-0 lg:w-1/5">
          <div className="left pb-2">
            <img
              className="w-32 rounded-sm shadow-2xl shadow-blue-500/20"
              src={info.poster}
              alt="Anime Poster"
            />
          </div>
          <p className="my-2 line-clamp-2 text-start text-3xl text-slate-300">
            {info.name}
          </p>
          <div>
            <div className="block text-slate-900">
              <div className="info py-2 text-xs font-semibold lg:flex">
                <div className="flex text-start">
                  <p className="rounded-s-sm border border-slate-900 bg-orange-300 px-1">
                    {info.stats.rating}
                  </p>
                  <p className="border border-slate-900 bg-orange-100 px-1">
                    <i className="far fa-clock"></i> {info.stats.duration}
                  </p>
                  <p className="border border-slate-900 bg-orange-300 px-1">
                    <i className="fas fa-tv"></i> {info.stats.type}
                  </p>
                  <p className="rounded-e-sm border border-slate-900 bg-orange-100 px-1">
                    {info.stats.quality}
                  </p>
                </div>
                <div className="flex px-2 text-start text-slate-900">
                  <div className="whitespace-normal text-nowrap rounded-s-sm border border-slate-900 bg-orange-300 px-1">
                    <i className="far fa-closed-captioning"></i>{" "}
                    {info.stats.episodes.sub}
                  </div>
                  {info.stats.episodes.dub && (
                    <div className="rounded-e-sm border border-slate-900 bg-orange-100 px-1">
                      <i className="fas fa-microphone"></i>{" "}
                      {info.stats.episodes.dub}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="right flex flex-col gap-4 py-2 text-start text-xs text-slate-300">
            <div>
              <p className="italic">Overview:</p>
              <p className="line-clamp-3">{info.description}</p>
            </div>
            <div>
              AnimeFlix is a demonstration website that I have developed to
              showcase my skills and abilities. This project is intended purely
              for educational and portfolio purposes. I do not intend to
              monetize, earn money, or derive any financial benefit from this
              website.
            </div>
          </div>
          <div className="my-2 w-fit rounded-sm border border-orange-300 bg-orange-100 p-1 text-xs">
            <button onClick={() => handleClick()}>View Detail</button>
          </div>
        </div>
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
                  <p className="whitespace-normal text-nowrap rounded-s-lg border  border-slate-100 bg-orange-300 px-1">
                    <i className="far fa-closed-captioning "> </i>{" "}
                    {relatedAnime[0].episodes.dub}{" "}
                  </p>
                  <p className="order-slate-100 rounded-e-lg border  bg-orange-100  px-1">
                    <i className="fas fa-microphone"></i>{" "}
                    {relatedAnime[0].episodes.sub}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="  w-full ">
        <div className="pt-8 text-start text-3xl text-lavender-web-500">
          Recommended Anime
        </div>
        <TopUpcoming topUpcoming={recommendedAnime} />
      </div>
    </div>
  );
}
