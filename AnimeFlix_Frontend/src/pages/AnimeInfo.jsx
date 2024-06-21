import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUpcoming from "../components/TopUpcoming";

import { useLocation } from "react-router-dom";
import Loader from "../components/Loading";
export default function AnimeInfo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  console.log(id);
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
          `https://aniwatch-api-euo9.onrender.com/anime/info?id=${id}`
        );

        setData(res.data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    if (id) {
      getData(id);
    }
  }, [id]);

  if (loading) {
    return (
    <Loader/>
    );
  }

  const info = data.anime.info;
  const moreinfo = data.anime.moreInfo;
  const seasons = data.seasons;
  const recommendedAnime = data.recommendedAnimes;
  const relatedAnime = data.relatedAnimes;
  console.log(relatedAnime);
  // const thumbnail=data.anime.promotionalVideos[0].thumbnail;
  // style={{backgroundImage: `$url(/bginfo.webp)`}}
  // console.log(thumbnail);
  if (!data || !data.anime || !info || !moreinfo)
    return <div>No data found</div>;
  return (
    <>
      <div className="h-max w-full lg:px-12 px-4  bg-gradient-to-r from-slate-950 via-gray-950 to-zinc-950">
        <div className=" mx-auto space-y-6 space-x-4 py-20 my-auto h-3/4 lg:flex-row flex-col flex justify-evenly rounded-3xl items-center bg-gradient-to-r from-zinc-950 via-gray-950 to-slate-950">
          <div className="left lg:w-1/4  h-full ">
            <div className=" flex justify-center mt-1  ">
              <img
                className="shadow-2xl shadow-blue-500/20 rounded-lg w-60"
                src={info.poster}
                alt="Anime Poster"
              />
            </div>
          </div>
          <div className="right lg:w-2/4 h-full text-start flex flex-col space-y-8 text-slate-300">
            <p className="text-3xl text-start text-slate-300">{info.name}</p>
            <div className="text-slate-300 block">
              <div className="info lg:flex lg:space-x-4 lg:space-y-0 space-y-2  ">
                <div className="flex text-start space-x-4  ">
                  <p> {info.stats.rating}</p>
                  <p>
                    <i className="text-sm far fa-clock"></i>{" "}
                    {info.stats.duration}
                  </p>
                  {/* <p><i className="fa-solid fa-circle"></i>{info.stats.quality}</p> */}
                  <p>
                    <i className="text-xs fas fa-tv"></i> {info.stats.type}
                  </p>
                </div>
                <div className="flex text-start text-slate-900  ">
                  <div className=" text-slate-100  lg:mx-2 rounded-lg px-1 py-0  ">
                    {info.stats.quality}
                  </div>
                  <div className="text-nowrap border-slate-100 border bg-orange-300  rounded-s-lg px-1 whitespace-normal">
                    <i className="  far fa-closed-captioning"></i>{" "}
                    {info.stats.episodes.sub}
                  </div>
                  {info.stats.episodes.dub && (
                    <div className=" border-slate-100 border bg-orange-100  rounded-e-lg  px-1">
                      <i className="  fas fa-microphone"></i>{" "}
                      {info.stats.episodes.dub}
                    </div>
                  )}
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
          <div className="lg:w-1/4 h-full">
            <div className=" h-max   end  text-slate-300 text-start bg-slate-800 p-4 rounded-lg shadow-lg">
              {/* <h3 className="text-lg text-slate-100 font-bold mb-2">Anime Details</h3> */}
              <p>
                <span className="italic font-semibold">Japanese:</span>{" "}
                {moreinfo.japanese}
              </p>
              <p>
                <span className="italic font-semibold">Synonyms:</span>{" "}
                {moreinfo.synonyms}
              </p>
              <p>
                <span className="italic font-semibold">Aired:</span>{" "}
                {moreinfo.aired}
              </p>
              <p>
                <span className="italic font-semibold">Premiered:</span>{" "}
                {moreinfo.premiered}
              </p>
              <p>
                <span className="italic font-semibold">Duration:</span>{" "}
                {moreinfo.duration}
              </p>
              <p>
                <span className="italic font-semibold">Status:</span>{" "}
                {moreinfo.status}
              </p>
              <p>
                <span className="italic font-semibold">MAL Score:</span>{" "}
                {moreinfo.malscore}
              </p>
              <p>
                <span className="italic font-semibold">Genres:</span>{" "}
                {
                  // Check if 'moreinfo.genres' is an array and has only one item
                  Array.isArray(moreinfo.genres) && moreinfo.genres.length === 1
                    ? moreinfo.genres[0] // If only one genre, display it without joining
                    : Array.isArray(moreinfo.genres)
                    ? moreinfo.genres.join(", ")  
                    : moreinfo.genres  
                }
              </p>
              <p>
                <span className="italic font-semibold">Studios:</span>{" "}
                {moreinfo.studios}
              </p>
              <p>
                <span className="italic font-semibold">Producers:</span>{" "}
                {
                  Array.isArray(moreinfo.producers) &&
                  moreinfo.producers.length === 1
                    ? moreinfo.producers[0]  
                    : Array.isArray(moreinfo.producers)
                    ? moreinfo.producers.join(", ")  
                    : moreinfo.producers  
                }
              </p>
            </div>
          </div>
        </div>
        <div className="lg:flex w-full justify-between gap-8">
          <div className="lg:w-8/12">
            {seasons && seasons.length > 0 && (
              <div className="seasons   pt-8 overflow-auto  ">
                <div>
                  <p className=" text-3xl text-start text-slate-200">Seasons</p>
                </div>
                <div className="flex">
                  {seasons.map((season, index) => (
                    <div
                      key={index}
                      onClick={() => handleClick(season.id)}
                      className="relative h-24 m-4 p-4 bg-cover bg-center lg:w-40 w-24    text-white border border-slate-600 rounded-lg shadow"
                      style={{
                        backgroundImage: `url('${season.poster}')`,
                      }}
                    >
                      {/* Semi-transparent overlay */}
                      <div className="absolute inset-0 bg-black/65 rounded-lg"></div>

                      <div className="relative z-10">
                        <h3 className="lg:text-lg text-sm font-bold line-clamp-2">
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
            <div  onClick={() => handleClick(relatedAnime[0].id)} className="lg:w-3/12 pt-8  ">
              <p className="text-3xl text-start text-slate-50">Related Anime</p>
              <div className="border flex space-x-3 border-slate-600 rounded-lg shadow h-24 p-2 mt-4">
                <div className="  h-full">
                  <img
                    className=" rounded h-full "
                    src={relatedAnime[0].poster}
                    alt="relatedAnime poster"
                  />
                </div>
                <div  className="text-slate-50">
                  <p className="text-start   line-clamp-2">
                    {relatedAnime[0].name}
                  </p>
                  <div className="flex gap-4">
                    <p>{relatedAnime[0].type} </p>
                    <div className="flex text-slate-900">
                      <p className="text-nowrap border-slate-100 border bg-orange-300  rounded-s-lg px-1 whitespace-normal">
                        <i className="far fa-closed-captioning "> </i>{" "}
                        {relatedAnime[0].episodes.dub}{" "}
                      </p>
                      <p className="order-slate-100 border bg-orange-100  rounded-e-lg  px-1">
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
          <div className="text-3xl text-start pt-8 text-lavender-web-500">
            Recommended Anime
          </div>
          <TopUpcoming topUpcoming={recommendedAnime} />
        </div>
      </div>
    </>
  );
}

{
  /* <div className="text-base text-nowrap lg:flex grid  justify-start lg:gap-6 gap-4">
            <div className="flex lg:gap-8 gap-4 justify-start ">
              <div>
                <i className=" fas fa-tv"></i> {info.type}
              </div>
              <div>
                <i className="far fa-clock"></i> {info.duration}
              </div>
              <div className="">
                <i className="fas fa-calendar-alt"></i> {info.stats.rating}
              </div>
              
            </div>

            <div className="flex   text-slate-900 space-x-1">
            <div className="bg-powder-blue-400 rounded-lg px-1 py-0 text-slate-900">
                {info.stats.quality}
              </div>
              <div className="text-nowrap   bg-lavender-web-400 rounded-s-lg px-1 whitespace-normal">
                <i className="  far fa-closed-captioning"></i> {info.stats.episodes.sub}
              </div>
              {info.stats.episodes.dub && (
                <div className=" bg-french-gray-600 rounded-e-lg  px-1">
                  <i className="  fas fa-microphone"></i> {info.stats.episodes.dub}
                </div>
              )} 
            </div>
          </div>*/
}
