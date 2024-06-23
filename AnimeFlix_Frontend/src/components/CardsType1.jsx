import { useNavigate } from "react-router-dom";

export default function ({ name, poster, rank, id }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  return (
    <>
      <div onClick={() => handleClick(id)} className="relative flex w-42 h-72 m-2  ">
        <div className="w-full rounded-md  bg-orange-400 flex flex-col ">
          <div className="  ">
            <img
              className="w-full h-64 rounded-t-md clippath"
              src={poster}
              alt=""
            />

            <p className="text-xl  absolute start-3 top-3   text-ellipsis  ">
              {rank < 10 ? "#0" + rank : "#" + rank}{" "}
            </p>
          </div>
          <span className="w-11/12  truncate h-8 flex  items-center px-2      text-left ">
            {name}
          </span>
        </div>
        {/* <div className="absolute top-1/2 left-1/2">
        <div>

        </div>
        
        </div> */}
      </div>
    </>
  );
}
