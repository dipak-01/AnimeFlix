import { useNavigate } from "react-router-dom";
export default function Top10Animes(top10animes) {

  const data = top10animes.top10animes;

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-4 text-start">
        <div className="lg:w-1/3">
          <div >
            <p className="pb-2 lg:text-2xl font-semibold">Today</p>
            <TemplateCard animeData={data.today} />
          </div>
        </div>
        <div className="lg:w-1/3">
          <div>
            <p className="pb-2 lg:text-2xl font-semibold">Week</p>
            <TemplateCard animeData={data.week} />
          </div>
        </div>
        <div className="lg:w-1/3">
          <div>
            <p className="pb-2 lg:text-2xl font-semibold">Month</p>
            <TemplateCard animeData={data.month} />
          </div>
        </div>
      </div>
    </>
  );
}
function TemplateCard({ animeData }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  return (
    <div className="space-y-4">
      {animeData.slice(0, 5).map((top10anime, index) => (
        <div
          key={index}
          onClick={() => handleClick(top10anime.id)}
          className="relative flex items-center space-x-4 rounded-lg bg-slate-900 px-2 py-4 shadow-lg transition-colors hover:bg-slate-800 cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${top10anime.poster})`,
            }}
          ></div>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border bg-orange-200">
            <p className="     text-center lg:text-3xl text-xl font-bold  text-orange-600  ">
              {top10anime.rank}
            </p>
          </div>
          {/* Uncomment the image if needed */}
          {/* <img
            className="ml-4 h-24 w-16 rounded-lg object-cover"
            src={top10anime.poster}
            alt={top10anime.name}
          /> */}
          <div className="relative ml-4 w-3/4   ">
            <p className="line-clamp-1 lg:text-lg font-semibold text-white">
              {top10anime.name}
            </p>

            {top10anime.episodes && (
              <div className="flex w-min    gap-1 rounded-md px-1 text-sm font-thin text-slate-900">
                {" "}
                {top10anime.episodes.sub && (
                  <p className="flex items-center rounded-s-md bg-orange-300 px-1 font-medium">
                    {" "}
                    <i className=" far fa-closed-captioning px-1"></i>
                    {top10anime.episodes.sub}
                  </p>
                )}
                {top10anime.episodes.dub && (
                  <p className="flex items-center rounded-e-md bg-orange-100 px-1 font-medium">
                    <i className=" fas fa-microphone px-1"> </i>
                    {top10anime.episodes.dub}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
