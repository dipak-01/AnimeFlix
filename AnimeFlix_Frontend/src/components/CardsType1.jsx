import { useNavigate } from "react-router-dom";

export default function ({ name, poster, rank, id }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  return (
    <>
      <div
        onClick={() => handleClick(id)}
        className="relative flex w-42 h-full m-2   rounded-md "
      >
        <div className="w-full rounded-md border-2 border-gray-800  bg-gray-950 flex flex-col mb-2">
          <div className=" h-4/5 ">
            <img
              className="w-full h-full rounded-t-md clippath"
              src={poster}
              alt=""
            />

            <p className="text-md  absolute start-1 top-1   text-ellipsis  ">
              {rank < 10 ? "#0" + rank : "#" + rank}{" "}
            </p>
          </div>
          <span className="w-11/12  truncate h-1/5 flex  items-center px-2     rounded-md  text-left ">
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
