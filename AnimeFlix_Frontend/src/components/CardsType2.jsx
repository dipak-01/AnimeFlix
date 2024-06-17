export default function ({ name, type, duration, poster }) {
  return (
    <>
      <div className=" max-w-56 min-w-32 h-96 ">
        <div className="w-full h-72">
          <img className=" h-full w-full rounded-md" src={poster} alt="" />
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
