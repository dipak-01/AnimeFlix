import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faChartLine,
  faServer,
  faCircleExclamation,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-[1420px] flex-col items-center justify-center px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
        {/* Main Announcement Card */}
        <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md transition duration-300 hover:border-orange-500/40 sm:p-10">
          {/* Subtle Orange Glow Ambient Effect */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

          {/* Header & Status Indicator */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
            <div>
              <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Anime<span className="text-orange-500">Flix</span>
              </span>
              <p className="mt-1 text-sm text-zinc-400">
                Anime Streaming & Community Platform
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400">
              <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
              <span>Service Offline (Upstream API Banned)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Notice & Recruiter Links */}
            <div className="space-y-6 lg:col-span-7">
              {/* Notice Banner */}
              <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="mt-0.5 text-lg text-orange-400"
                  />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-orange-200">
                      Service Notice
                    </p>
                    <p className="leading-relaxed text-zinc-300">
                      This application doesn't work anymore since the API
                      provider's repo was banned, so sorry for it!
                    </p>
                  </div>
                </div>
              </div>

              {/* Recruiter & Other Works Section */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wide text-zinc-200">
                  If you are a recruiter, you can see my other works here:
                </p>

                <div className="space-y-2.5">
                  {/* GitHub Link */}
                  <a
                    href="https://github.com/dipak-01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 transition duration-200 hover:border-orange-500/50 hover:bg-zinc-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200 transition group-hover:bg-orange-500 group-hover:text-black">
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-100 group-hover:text-orange-400">
                          GitHub Profile
                        </p>
                        <p className="text-xs text-zinc-400">
                          github.com/dipak-01 &bull; Open-source projects & code
                        </p>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="text-xs text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400"
                    />
                  </a>

                  {/* Anerdstats Link */}
                  <a
                    href="https://anerdstats.dipakkurkute.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 transition duration-200 hover:border-orange-500/50 hover:bg-zinc-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200 transition group-hover:bg-orange-500 group-hover:text-black">
                        <FontAwesomeIcon
                          icon={faChartLine}
                          className="text-lg"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-100 group-hover:text-orange-400">
                          Anerdstats
                        </p>
                        <p className="text-xs text-zinc-400">
                          anerdstats.dipakkurkute.dev &bull; Anime & manga stats
                          app
                        </p>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="text-xs text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400"
                    />
                  </a>

                  {/* Homelab Setup Link */}
                  <a
                    href="https://homepage.dipakkurkute.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 transition duration-200 hover:border-orange-500/50 hover:bg-zinc-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200 transition group-hover:bg-orange-500 group-hover:text-black">
                        <FontAwesomeIcon icon={faServer} className="text-lg" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-100 group-hover:text-orange-400">
                          Homelab Setup
                        </p>
                        <p className="text-xs text-zinc-400">
                          homepage.dipakkurkute.dev &bull; Self-hosted homelab
                          dashboard
                        </p>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="text-xs text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400"
                    />
                  </a>
                </div>
              </div>

              {/* Enter AnimeFlix UI Button */}
              <div className="pt-2">
                <button
                  onClick={handleEnterClick}
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/20 transition duration-200 hover:bg-orange-400 hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 active:translate-y-0.5"
                >
                  <span>Enter AnimeFlix (UI Demo)</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Column: GIF Placeholder */}
            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="w-full rounded-xl border border-dashed border-zinc-700 bg-zinc-950/70 p-4 transition duration-300 hover:border-orange-500/40">
                {/* GIF Header Tag */}
                <div className="mb-3 flex items-center justify-between text-xs font-medium text-zinc-400"></div>

                {/* GIF Image Container */}
                <div className="group relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-lg bg-black/40 p-2">
                  <img
                    src="/giphy.gif"
                    className="max-h-60 w-auto rounded object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
