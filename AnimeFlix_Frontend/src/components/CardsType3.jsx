export default function ({ data }) {
   
  return (
    <>
      <div className="">
        {data.slice(0, 5).map((data2, index) => (
          <div key={index} className="py-1 pr-1">
            <div className="flex h-36 p-2 ">
              <div className="w-24 rounded-lg ">
                <img
                  className="w-full rounded-lg h-full"
                  src={data2.poster}
                  alt={data2.name}
                />
              </div>
              <div className="text-start text-xl w-2/3 px-4 ">
                <p className="w-3/4 line-clamp-1 mb-2">{data2.name}</p>
                <span>
                  <p>
                    {data2.episodes && (
                      <div className="flex gap-1    w-min rounded-md px-1 text-slate-900 text-sm font-thin">
                        {" "}
                        <p className="flex px-1 items-center bg-lavender-web-400 rounded-s-md">
                          {" "}
                          <i className=" px-1 far fa-closed-captioning"></i>
                          {data2.episodes.sub}
                        </p>
                        {data2.episodes.dub && (
                          <p className="flex px-1 items-center bg-french-gray-600 rounded-e-md">
                            <i className=" px-1 fas fa-microphone"> </i>
                            {data2.episodes.dub}
                          </p>
                        )}{data2.type && (
                      <div className="px-2 text-slate-100 ">
                   
                        {data2.type}{" "}
                      </div>
                    )}
                      </div>
                    )}
                    
                  </p>
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
