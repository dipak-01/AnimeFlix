export default function ({
  poster,
  description,
  name,
  otherInfo,
  rank,
  episodes,
}) {
  return (
    <>
      <div className="w-full h-full     text-slate-50 relative">
        <div className="absolute    z-8    inset-y-0 right-0  px-4 ">
          <img className="w-auto object-cover  h-full " src={poster} alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-gunmetal-100   "></div>
          {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 "></div> */}
          <div className="absolute inset-0 bg-gradient-to-l from-gunmetal-100/15  "></div>
        </div>
        <div className="relative text-xl font-thin h-full my-auto justify-center bg-gradient-to-r from-slate-950     w-1/2 text-left flex flex-col  pt-20 gap-8 ">
          <div className="text-3xl text-hookers-green-700">
            <p>#{rank} SpotLight</p>
          </div>
          <div className="text-5xl line-clamp-2">
            <p>{name}</p>
          </div>
          <div className="text-nowrap flex   justify-start gap-8">
             
              <div>
                <i className=" fas fa-tv"></i> {otherInfo[0]}
              </div>
              <div>
                <i className="far fa-clock"></i> {otherInfo[1]}
              </div>
              <div className="">
                <i className="fas fa-calendar-alt"></i> {otherInfo[2]}
              </div>
              <div className="bg-powder-blue-400 rounded-lg px-1 py-0 text-slate-900">
                {otherInfo[3]}
              </div> 
             
            <div className="flex  text-slate-900 space-x-1">
              <div className="text-nowrap   bg-lavender-web-400 rounded-s-lg px-1 whitespace-normal">
                <i className="  far fa-closed-captioning"></i>{" "}
                {episodes.sub}
              </div>
              {episodes.dub && (
                <div className=" bg-french-gray-600 rounded-e-lg  px-1">
                  {episodes.dub}
                </div>
              )}
            </div>
          </div>
          <div className="overflow-hidden  line-clamp-3">{description}</div>
          <div className="text-slate-900 rounded-lg bg-hookers-green-600 w-max px-4 py-2 flex items-center">
            <button>
              Watch Now{""}{" "}
              <i className="fa-solid fa-arrow-right align-middle"></i>{" "}
            </button>
          </div>
        </div>
        {/* <div className="bg-gradient-to-t from-slate-900 to-slate-700"></div> */}
      </div>
    </>
  );
}
// style={{ backgroundImage: `url(${poster})`, backgroundPosition: 'right top', backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
