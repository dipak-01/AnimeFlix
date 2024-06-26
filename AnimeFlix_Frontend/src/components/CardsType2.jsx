import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function ({ name, type, duration, poster,id }) {
  const navigate = useNavigate();  
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const handleClick =(id)=>{
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();

  }
  return (
    <>
      <div onClick={() => handleClick(id)}  className=" max-w-56 min-w-32 sm:h-96 h-68  ">
        <div className="w-full h-4/5">
        {isLoading && <div className="w-full h-full rounded-t-md bg-gray-900 flex items-center justify-center ">
                {/* Placeholder or loader here */}
                <span className="  animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-orange-500 ml-3"></span>
              </div>}
          <img className=" h-full w-full rounded-md" src={poster} alt=""
            onLoad={() => setIsLoading(false)} // Update loading state when image is loaded
               
            style={{ display: isLoading ? 'none' : 'block' }}  />
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
