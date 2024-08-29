import { useNavigate } from "react-router-dom";
export default function ({
  poster,
  description,
  name,
  otherInfo,
  rank,
  episodes,
  id,
}) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  };
  const handleWatchClick = (id) => {
    navigate(`/watch/${id}`);
  };
  return (
    <>
      <div className="  relative   h-full  w-full text-slate-50">
        <div className="z-1    absolute    inset-y-0 right-0   ">
          <img className="h-full w-auto  object-cover " src={poster} alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-gunmetal-100   "></div>
          <div className="absolute inset-0 bg-gradient-to-l from-gunmetal-100/15  "></div>
        </div>
        <div className="relative my-auto flex h-full w-3/4 flex-col justify-center gap-8 bg-gradient-to-r  from-black to-black/5 px-4 pb-5 pt-20  text-left text-xl font-thin lg:w-1/2">
          <div className="lg:text3xl text-lg text-hookers-green-700">
            <p className="font-medium">#{rank} SpotLight</p>
          </div>
          <div className="my-1 line-clamp-3 text-2xl lg:text-5xl">
            <p className="font-semibold">{name}</p>
          </div>
          <div className="grid justify-start gap-4 text-nowrap  text-base lg:flex lg:gap-6">
            <div className="flex justify-start gap-4 font-medium lg:gap-8">
              <div>
                <i className=" fas fa-tv"></i> {otherInfo[0]}
              </div>
              <div>
                <i className="far fa-clock"></i> {otherInfo[1]}
              </div>
              <div className="">
                <i className="fas fa-calendar-alt"></i> {otherInfo[2]}
              </div>
            </div>

            <div className="flex space-x-1  text-sm font-bold text-slate-900 lg:text-lg">
              <div className="rounded-lg bg-orange-400 px-1 py-0 text-slate-900">
                {otherInfo[3]}
              </div>
              <div className="whitespace-normal   text-nowrap rounded-s-lg bg-orange-300 px-1">
                <i className="  far fa-closed-captioning"></i> {episodes.sub}
              </div>
              {episodes.dub && (
                <div className=" rounded-e-lg bg-orange-100  px-1">
                  <i className="  fas fa-microphone"></i> {episodes.dub}
                </div>
              )}
            </div>
          </div>
          <div className="lg:text-md line-clamp-3 overflow-hidden text-sm font-light">
            {description}
          </div>
          <div className="flex space-x-4 text-sm lg:text-lg">
            <div
              onClick={() => handleWatchClick(id)}
              className="flex w-max items-center rounded-lg bg-orange-300 px-4 py-2 font-bold text-slate-900"
            >
              <button>
                Watch  
               {" "}
              </button>
            </div>
            <div className="flex w-max items-center rounded-lg bg-hookers-green-800 px-4 py-2 font-bold text-slate-900">
              <button onClick={() => handleClick(id)}>
                Details{""} <i className="fa-solid fa-arrow align-middle"></i>{" "}
              </button>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
