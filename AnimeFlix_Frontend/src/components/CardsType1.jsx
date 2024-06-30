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
        <div onClick={() => handleClick(id)} className="relative flex w-42 h-full m-2 rounded-md">
          <div className="w-full rounded-md border-2 border-gray-800 bg-gray-950 flex flex-col mb-2">
            <div className="h-4/5">
              {isLoading && <div className="w-full h-full rounded-t-md bg-gray-900 flex items-center justify-center ">
                {/* Placeholder or loader here */}
                <span className="  animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-orange-500 ml-3"></span>
              </div>}
              <img
                className="w-full h-full rounded-t-md clippath"
                src={poster}
                alt=""
                onLoad={() => setIsLoading(false)}  
               
                style={{ display: isLoading ? 'none' : 'block' }}  
              />
              <p className="text-md absolute start-1 top-1 text-ellipsis">
                {rank < 10 ? "#0" + rank : "#" + rank}{" "}
              </p>
            </div>
            <span className="w-11/12 truncate h-1/5 flex items-center px-2 rounded-md text-left">
              {name}
            </span>
          </div>
        </div>
      </>
    );
}
