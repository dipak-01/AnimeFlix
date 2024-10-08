import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ({ data }) {
   const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  };

  return (
    <>
      <div className="">
        {data.slice(0, 5).map((data2, index) => (
          <div
            key={index}
            onClick={() => handleClick(data2.id)}
            className="py-1 pr-1"
          >
            <div className="flex h-36 p-2 ">
              <div className=" w-1/3 rounded-lg ">
                {isLoading && (
                  <div className="flex h-full w-full items-center justify-center rounded-t-md bg-gray-900 ">
                    {/* Placeholder or loader here */}
                    <span className="  ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-orange-500 ease-linear"></span>
                  </div>
                )}
                <img
                  className="h-full rounded-lg"
                  src={data2.poster}
                  alt={data2.name}
                  onLoad={() => setIsLoading(false)}
                  style={{ display: isLoading ? "none" : "block" }}
                />
              </div>
              <div className="w-2/3 px-4 text-start text-xl ">
                <p className="mb-2 line-clamp-2 w-3/4">{data2.name}</p>
                <span>
                  <div>
                    {data2.episodes && (
                      <div className="flex w-min    gap-1 rounded-md px-1 text-sm font-thin text-slate-900">
                        {" "}
                        {data2.episodes.sub && (
                          <p className="flex items-center rounded-s-md bg-orange-300 px-1 font-medium">
                            {" "}
                            <i className=" far fa-closed-captioning px-1"></i>
                            {data2.episodes.sub}
                          </p>
                        )}
                        {data2.episodes.dub && (
                          <p className="flex items-center rounded-e-md bg-orange-100 px-1 font-medium">
                            <i className=" fas fa-microphone px-1"> </i>
                            {data2.episodes.dub}
                          </p>
                        )}
                        {data2.type && (
                          <div className="px-2 font-medium text-slate-100 ">
                            {data2.type}{" "}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </span>
              </div>
            </div>
            <hr className="h-px w-11/12 border-0 bg-slate-800" />
          </div>
        ))}
      </div>
    </>
  );
}
