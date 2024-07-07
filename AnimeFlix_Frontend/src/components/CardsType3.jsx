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
              <div className="w-24 rounded-lg ">
                {isLoading && (
                  <div className="w-full h-full rounded-t-md bg-gray-900 flex items-center justify-center ">
                    {/* Placeholder or loader here */}
                    <span className="  animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-orange-500 ml-3"></span>
                  </div>
                )}
                <img
                  className="w-full rounded-lg h-full"
                  src={data2.poster}
                  alt={data2.name}
                  onLoad={() => setIsLoading(false)}
                  style={{ display: isLoading ? "none" : "block" }}
                />
              </div>
              <div className="text-start text-xl w-2/3 px-4 ">
                <p className="w-3/4 line-clamp-1 mb-2">{data2.name}</p>
                <span>
                  <div>
                    {data2.episodes && (
                      <div className="flex gap-1    w-min rounded-md px-1 text-slate-900 text-sm font-thin">
                        {" "}
                        {data2.episodes.sub && (
                          <p className="flex font-medium px-1 items-center bg-orange-300 rounded-s-md">
                            {" "}
                            <i className=" px-1 far fa-closed-captioning"></i>
                            {data2.episodes.sub}
                          </p>
                        )}
                        {data2.episodes.dub && (
                          <p className="flex px-1 items-center font-medium bg-orange-100 rounded-e-md">
                            <i className=" px-1 fas fa-microphone"> </i>
                            {data2.episodes.dub}
                          </p>
                        )}
                        {data2.type && (
                          <div className="px-2 text-slate-100 font-medium ">
                            {data2.type}{" "}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </span>
              </div>
            </div>
            <hr className="bg-slate-800 h-px w-11/12 border-0" />
          </div>
        ))}
      </div>
    </>
  );
}
