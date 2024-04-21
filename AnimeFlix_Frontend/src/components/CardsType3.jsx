export default function ({ data }) {
  return (
    <>
      <div className="">
        {data.slice(0, 5).map((data, index) => (
          <div className="py-1 pr-1">
            <div key={index} className="  flex h-36 p-2 ">
              <div className="w-24 rounded-lg ">
                <img
                  className=" w-full rounded-lg h-full"
                  src={data.poster}
                  alt=""
                />
              </div>
              <div className="text-start text-xl w-2/3 px-4">
                <p className="w-3/4 line-clamp-1">{data.name}</p>
                {/* <p>{data.otherInfo[0]}</p> */}
              </div>
            </div>{" "}
            <hr className="bg-slate-800 h-px w-11/12   border-0" />
          </div>
        ))}
      </div>
    </>
  );
}
