export default function AnimeBasicInfo({
  info,
  handleWatchClick,
  handleWatchlist,
}) {
  return (
    <>
      <div className="right flex h-full flex-col space-y-6 text-start text-slate-300 lg:w-2/4 ">
        <div>
          <p className="text-start text-3xl text-slate-300">{info.name}</p>
        </div>
        <div className="block text-slate-900">
          <div className="info text-md gap-4 py-2 font-semibold lg:flex">
            <div className="flex space-x-1 text-start">
              <p className="rounded-s-sm border border-slate-900 bg-orange-300 px-1">
                {info.stats.rating}
              </p>
              <p className="border border-slate-900 bg-orange-100 px-1">
                <i className="far fa-clock"></i> {info.stats.duration}
              </p>
              <p className="border border-slate-900 bg-orange-300 px-1">
                <i className="fas fa-tv"></i> {info.stats.type}
              </p>
              <p className="rounded-e-sm border border-slate-900 bg-orange-100 px-2">
                {info.stats.quality}
              </p>
            </div>
            <div className="text-md flex space-x-1 px-2 text-start text-slate-900">
              <div className="whitespace-normal text-nowrap rounded-s-sm border border-slate-900 bg-orange-300 px-2">
                <i className="far fa-closed-captioning"></i>{" "}
                {info.stats.episodes.sub}
              </div>
              {info.stats.episodes.dub && (
                <div className="rounded-e-sm border border-slate-900 bg-orange-100 px-2">
                  <i className="fas fa-microphone"></i>{" "}
                  {info.stats.episodes.dub}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2  ">
            <div className="w-fit rounded-md border-2 border-orange-600 bg-orange-500 p-2 font-semibold text-slate-900 transition-colors hover:border-orange-400 hover:bg-orange-400">
              <button onClick={() => handleWatchClick(info.id)} className="">
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
          AnimeFlix is a demonstration website that I have developed to showcase
          my skills and abilities. This project is intended purely for
          educational and portfolio purposes. I do not intend to monetize, earn
          money, or derive any financial benefit from this website.
        </div>
      </div>
    </>
  );
}
