import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ({ name, poster, rank, id }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  return (  
    <>
      <div
        onClick={() => handleClick(id)}
        className="w-42 relative m-2 flex h-full rounded-md"
      >
        <div className="mb-2 flex w-full flex-col rounded-md border-2 border-gray-800 bg-gray-950">
          <div className="h-4/5">
            {isLoading && (
              <div className="flex h-full w-full items-center justify-center rounded-t-md bg-gray-900 ">
                {/* Placeholder or loader here */}
                <span className="  ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-orange-500 ease-linear"></span>
              </div>
            )}
            <img
              className="clippath h-full w-full rounded-t-md"
              src={poster}
              alt=""
              onLoad={() => setIsLoading(false)}
              style={{ display: isLoading ? "none" : "block" }}
            />
            <p className="text-md absolute start-1 top-1 text-ellipsis">
              {rank < 10 ? "#0" + rank : "#" + rank}{" "}
            </p>
          </div>
          <span className="flex h-1/5 w-11/12 items-center truncate rounded-md px-2 text-left">
            {name}
          </span>
        </div>
      </div>
    </>
  );
}
