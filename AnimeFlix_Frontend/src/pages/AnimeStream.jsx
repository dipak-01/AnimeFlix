import React, { useState, useEffect } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css"

// import "plyr-react/dist/plyr.css";
import {
  useFetchData,
  useFetchStreamData,
  useAnimeEpisodeData,
  useAnimeEpisodeServerData,
} from "../services/AnimeWatch";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loading";

export default function AnimeInfo() {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
  const { id } = useParams();
  const { data, loading, error } = useFetchData(id);
  const { episodeData, loading: loading2, error: error2 } = useAnimeEpisodeData(
    id
  );
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
    if (episodeData && episodeData.episodes.length > 0) {
      setSelectedEpisodeId(episodeData.episodes[0].episodeId);
    }
  }, [episodeData]);

  const handleClick = () => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  };

  if (loading || loading2 || loadingServer || loadingStreamData) {
    return <Loader />;
  }

  if (error || error2 || errorServer || errorStreamData) {
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
  const episodes = episodeData.episodes;

  return (
    <div className="text-start h-screen w-full lg:px-12 px-4 bg-gradient-to-r from-slate-950 via-gray-950 to-zinc-950">
      <div className="w-full h-screen mx-auto space-x-6 py-10 my-auto lg:flex-row flex-col flex rounded-3xl bg-gradient-to-r from-zinc-950 via-gray-950 to-slate-950">
        <div className="flex w-3/4">
          <div className="w-1/4 border-pink-500 h-full overflow-auto mostly-customized-scrollbar text-slate-100">
            <p className="border border-gray-900 pl-6 py-2 text-sm">
              List of Episodes
            </p>
            {episodes &&
              episodes.map((epi, index) => (
                <div
                  onClick={() => setSelectedEpisodeId(epi.episodeId)}
                  className={`w-full flex border ${
                    epi.number % 2 !== 0 ? "bg-gray-800" : "bg-gray-900"
                  } border-gray-900 py-2 text-xs`}
                  key={index}
                >
                  <div className="w-1/6 text-center">{epi.number}</div>
                  <div className="w-4/6 line-clamp-1">{epi.title}</div>
                  <div className="w-1/6"> </div>
                </div>
              ))}
          </div>
          <div className="w-4/5">
            <div>
              {streamData && (
                <Plyr
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: streamData.sources[0].url,
                        type: "hls",
                      },
                    ],
                  }}
                />
              )}
            </div>
            <div className="w-full h-10 my-1 bg-gray-900"></div>
            <div className="flex">
              <div className="w-1/4 text-xs bg-orange-300 text-center font-semibold text-gray-800 p-1 rounded-l-md">
                <p>
                  You are streaming Episode {episodeServerData?.episodeNo}. If
                  the current server doesn't work, please try other servers
                  beside.
                </p>
              </div>
              <div className="w-3/4 text-xs font-bold bg-gray-600 text-gray-950 p-1 rounded-r-md">
                <div className="h-1/2 border-b-2 flex justify-start items-center border-gray-900 space-x-4">
                  <span>
                    <i className="fas fa-closed-captioning"></i> SUB:
                  </span>
                  <span className="uppercase space-x-2">
                    {episodeServerData?.sub[0]?.serverName && (
                      <span className="bg-orange-200 rounded-sm px-1">
                        {episodeServerData.sub[0].serverName}
                      </span>
                    )}
                    {episodeServerData?.sub[1]?.serverName && (
                      <span className="bg-orange-200 rounded-sm px-1">
                        {episodeServerData.sub[1].serverName}
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-1/2 flex justify-start items-center space-x-5">
                  <span>
                    <i className="fas fa-microphone"></i> DUB:
                  </span>
                  <span className="uppercase space-x-2">
                    {episodeServerData?.dub[0]?.serverName && (
                      <span className="bg-orange-200 rounded-sm px-1">
                        {episodeServerData.dub[0]?.serverName}
                      </span>
                    )}
                    {episodeServerData?.dub[1]?.serverName && (
                      <span className="bg-orange-200 rounded-sm px-1">
                        {episodeServerData.dub[1].serverName}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/5 p-0">
          <div className="left pb-2">
            <img
              className="shadow-2xl shadow-blue-500/20 rounded-sm w-32"
              src={info.poster}
              alt="Anime Poster"
            />
          </div>
          <p className="text-3xl line-clamp-2 my-2 text-start text-slate-300">
            {info.name}
          </p>
          <div>
            <div className="text-slate-900 block">
              <div className="info lg:flex text-xs font-semibold py-2">
                <div className="flex text-start">
                  <p className="border-slate-900 border bg-orange-300 rounded-s-sm px-1">
                    {info.stats.rating}
                  </p>
                  <p className="border-slate-900 border bg-orange-100 px-1">
                    <i className="far fa-clock"></i> {info.stats.duration}
                  </p>
                  <p className="border-slate-900 border bg-orange-300 px-1">
                    <i className="fas fa-tv"></i> {info.stats.type}
                  </p>
                  <p className="border-slate-900 border bg-orange-100 rounded-e-sm px-1">
                    {info.stats.quality}
                  </p>
                </div>
                <div className="flex text-start text-slate-900 px-2">
                  <div className="text-nowrap border-slate-900 border bg-orange-300 rounded-s-sm px-1 whitespace-normal">
                    <i className="far fa-closed-captioning"></i>{" "}
                    {info.stats.episodes.sub}
                  </div>
                  {info.stats.episodes.dub && (
                    <div className="border-slate-900 border bg-orange-100 rounded-e-sm px-1">
                      <i className="fas fa-microphone"></i>{" "}
                      {info.stats.episodes.dub}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="right text-start flex flex-col py-2 text-xs text-slate-300">
            <div>
              <p className="italic">Overview:</p>
              <p className="line-clamp-3">{info.description}</p>
            </div>
          </div>
          <div className="border my-2 border-orange-300 bg-orange-100 w-fit text-xs p-1 rounded-sm">
            <button onClick={() => handleClick()}>View Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
}
