import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Cards({ name, type, duration, poster, id }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  };
  return (
    <>
      <div
        onClick={() => handleClick(id)}
        className=" h-64 min-w-28   max-w-48 sm:h-96 "
      >
        <div className="h-4/5 w-full">
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center rounded-t-md bg-gray-900 ">
              {/* Placeholder or loader here */}
              <span className="  ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-orange-500 ease-linear"></span>
            </div>
          )}
          <img
            className=" h-full w-full rounded-md"
            src={poster}
            alt=""
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </div>
        <div className="   text-left  ">
          <p className=" text-md line-clamp-1 w-3/4 text-clip py-1">{name}</p>
          <span className="   ">{type}</span>
          <span className="px-4  ">
            <i className="fas fa-clock"></i> {duration}
          </span>
        </div>
      </div>
    </>
  );
}
export default function ({ latestEpisodes }) {
  return (
    <>
      <div className="grid w-full  grid-cols-2 gap-3 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {latestEpisodes.map((latestEpisodes, index) => (
          <Cards
            id={latestEpisodes.id}
            key={index}
            name={latestEpisodes.name}
            poster={latestEpisodes.poster}
            duration={latestEpisodes.duration}
            type={latestEpisodes.type}
          />
        ))}
      </div>
    </>
  );
}
