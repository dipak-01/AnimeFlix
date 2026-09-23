import { useState, useEffect } from "react";
import Swiper from "../components/Swiper";

import Top10Animes from "../components/Top10Animes";
import TrendingCards from "../components/TrendingCards";
import { Loader } from "../components/Loading";
import LatestEpisodes from "../components/LatestEpisodes";
import HomePageApi from "../services/HomePageApi";
import CardsType3 from "../components/CardsType3";
import TopUpcoming from "../components/TopUpcoming";
import { WatchData } from "./ContinueWatch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomePage } from "../redux/slice/homePageSlice";
import { HomePageSkeleton } from "../components/SkeletonLoaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faChartLine,
  faServer,
  faCircleExclamation,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state.homePage.data);
  const isError = useSelector((state) => state.homePage.isError);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHomePage());
    // Fallback: If API provider is banned/unreachable, stop skeleton loader after 3s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (homePageData) {
      setData(homePageData.data.data);
      setLoading(false);
    }
  }, [homePageData]);

  useEffect(() => {
    if (isError) {
      setLoading(false);
    }
  }, [isError]);

  const handleRedirectPage = (page, animeData) => {
    if (page === "mostPopularAnimes") {
      navigate("/anime/mostpopular", {
        state: { data: animeData, pageName: "Most Popular" },
      });
    }
    if (page === "mostFavourite") {
      navigate("/anime/mostfavourite", {
        state: { data: animeData, pageName: "Most Favourite" },
      });
    }
    if (page === "topAiring") {
      navigate("/anime/topairing", {
        state: { data: animeData, pageName: "Top Airing" },
      });
    }
    if (page === "latestCompleted") {
      navigate("/anime/latestcompleted", {
        state: { data: animeData, pageName: "Latest Completed" },
      });
    }
  };
  return (
    <>
      {/* Top Persistent Service Banner */}
      <div className="w-full border-b border-orange-500/30 bg-orange-950/40 px-4 py-2.5 text-center text-xs text-orange-200 sm:text-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
          <span className="font-semibold text-orange-400">
            <FontAwesomeIcon icon={faCircleExclamation} className="mr-1.5" />
            Notice:
          </span>
          <span>
            This application doesn't work anymore since the API provider's repo
            was banned.
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span>Recruiters can explore other works:</span>
          <span className="flex items-center gap-2">
            <a
              href="https://github.com/dipak-01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 underline hover:text-orange-300"
            >
              GitHub
            </a>
            <span>|</span>
            <a
              href="https://anerdstats.dipakkurkute.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 underline hover:text-orange-300"
            >
              Anerdstats
            </a>
            <span>|</span>
            <a
              href="https://homepage.dipakkurkute.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 underline hover:text-orange-300"
            >
              Homelab
            </a>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="mx-auto my-4 h-auto min-h-screen w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-2">
          <HomePageSkeleton />
        </div>
      ) : data && Object.keys(data).length > 0 ? (
        <div className="mx-auto my-4 h-auto min-h-screen w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-2  ">
          <Swiper banners={data?.spotlightAnimes} />
          <div className="  h-full  gap-4">
            <div className=" ">
              <div className="py-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
                Trending
              </div>
              <TrendingCards trendingAnimes={data?.trendingAnimes} />
            </div>
            <div className=" ">
              <div className="py-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
                Top 10
              </div>
              <Top10Animes top10animes={data?.top10Animes} />
              {/* <TrendingCards trendingAnimes={data.trendingAnimes} /> */}
            </div>
          </div>
          <WatchData />
          <div className="w-full lg:flex">
            <div className="  w-full ">
              <div className="pt-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
                Latest Episodes
              </div>
              <LatestEpisodes latestEpisodes={data?.latestEpisodeAnimes} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:flex">
            <div className="sm:1/2 lg:w-1/4">
              <div className="py-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
                Top Airing
              </div>
              <CardsType3 a={0} b={5} data={data?.topAiringAnimes} />
              <div className="text-start text-lg">
                <button
                  onClick={() =>
                    handleRedirectPage("topAiring", data?.topAiringAnimes)
                  }
                  className="py-4"
                >
                  View More <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
            <div className="sm:1/2 lg:w-1/4">
              <div className="py-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
                Most Popular
              </div>
              <CardsType3 a={0} b={5} data={data?.mostPopularAnimes} />
              <div className="text-start text-lg">
                <button
                  className="py-4"
                  onClick={() =>
                    handleRedirectPage(
                      "mostPopularAnimes",
                      data?.mostPopularAnimes,
                    )
                  }
                >
                  View More <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
            <div className="sm:1/2 lg:w-1/4">
              <div className="py-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
                Most Favourite
              </div>
              <CardsType3 a={0} b={5} data={data?.mostFavoriteAnimes} />
              <div className="text-start text-lg">
                <button
                  onClick={() =>
                    handleRedirectPage(
                      "mostFavourite",
                      data?.mostFavoriteAnimes,
                    )
                  }
                  className="py-4"
                >
                  View More <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
            <div className="sm:1/2 lg:w-1/4">
              <div className="py-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
                Latest Completed
              </div>
              <CardsType3 a={0} b={5} data={data?.latestCompletedAnimes} />
              <div className="text-start text-lg">
                <button
                  onClick={() =>
                    handleRedirectPage(
                      "latestCompleted",
                      data?.latestCompletedAnimes,
                    )
                  }
                  className="py-4"
                >
                  View More <i className="fa-solid fa-angle-right"> </i>
                </button>
              </div>
            </div>
          </div>
          <div className="  w-full ">
            <div className="pt-8 text-start text-xl text-lavender-web-500 lg:text-3xl">
              Top Upcoming
            </div>
            <TopUpcoming topUpcoming={data?.topUpcomingAnimes} />
          </div>
        </div>
      ) : (
        /* Offline Fallback when API provider is unavailable */
        <div className="mx-auto my-12 flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
          <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400">
              <FontAwesomeIcon icon={faCircleExclamation} />
              <span>Upstream API Provider Banned &bull; Service Offline</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Anime<span className="text-orange-500">Flix</span> Streaming
              Offline
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
              This application doesn't work anymore since the API provider's
              repo was banned, so sorry for it! Live catalog and video streaming
              are currently unavailable.
            </p>

            {/* Recruiter Links */}
            <div className="mx-auto mt-6 max-w-lg space-y-2.5 text-start">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Recruiter / Portfolio Links
              </p>

              <a
                href="https://github.com/dipak-01"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 transition duration-200 hover:border-orange-500/50 hover:bg-zinc-800/80"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200 transition group-hover:bg-orange-500 group-hover:text-black">
                    <FontAwesomeIcon icon={faGithub} className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100 group-hover:text-orange-400">
                      GitHub Profile
                    </p>
                    <p className="text-xs text-zinc-400">
                      github.com/dipak-01 &bull; Projects & source code
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-xs text-zinc-500 transition group-hover:text-orange-400"
                />
              </a>

              <a
                href="https://anerdstats.dipakkurkute.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 transition duration-200 hover:border-orange-500/50 hover:bg-zinc-800/80"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200 transition group-hover:bg-orange-500 group-hover:text-black">
                    <FontAwesomeIcon icon={faChartLine} className="text-base" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100 group-hover:text-orange-400">
                      Anerdstats
                    </p>
                    <p className="text-xs text-zinc-400">
                      anerdstats.dipakkurkute.dev &bull; Anime/Manga stats app
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-xs text-zinc-500 transition group-hover:text-orange-400"
                />
              </a>

              <a
                href="https://homepage.dipakkurkute.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 transition duration-200 hover:border-orange-500/50 hover:bg-zinc-800/80"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200 transition group-hover:bg-orange-500 group-hover:text-black">
                    <FontAwesomeIcon icon={faServer} className="text-base" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100 group-hover:text-orange-400">
                      Homelab Setup
                    </p>
                    <p className="text-xs text-zinc-400">
                      homepage.dipakkurkute.dev &bull; Self-hosted dashboard
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-xs text-zinc-500 transition group-hover:text-orange-400"
                />
              </a>
            </div>

            {/* GIF Placeholder Frame */}
            <div className="mx-auto mt-6 max-w-sm rounded-xl border border-dashed border-zinc-700 bg-zinc-950/70 p-3">
              <div className="flex min-h-[160px] items-center justify-center rounded-lg bg-black/40 p-2">
                <img
                  src="/giphy.gif"
                  className="max-h-44 w-auto rounded object-contain"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 focus:outline-none"
              >
                &larr; Back to Main Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
