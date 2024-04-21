export default function ({ name, type, duration, poster }) {
  return (
    <>
      <div className=" w-44 h-80 ">
        <div className=" h-64">
          <img className=" h-full " src={poster} alt="" />
        </div>
        <div className="   text-left  ">
          <p className=" w-3/4 text-md py-1 line-clamp-1 text-clip">{name}</p>
          <span className="   ">{type}</span>
          <span className="px-4  ">
            <i className="fas fa-clock"></i> {duration}
          </span>
        </div>
      </div>
    </>
  );
}
