import CardsType2 from "./CardsType2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Cards({ name, type, duration, poster,id }) {
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  };
  return (
    <>
      <div onClick={() => handleClick(id)} className=" max-w-48 min-w-28   sm:h-96 h-64 ">
        <div className="w-full h-4/5">
        {isLoading && <div className="w-full h-full rounded-t-md bg-gray-900 flex items-center justify-center ">
                {/* Placeholder or loader here */}
                <span className="  animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-orange-500 ml-3"></span>
              </div>}
          <img className=" h-full w-full rounded-md" src={poster} alt=""  onLoad={() => setIsLoading(false)}  
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
export default function ({ latestEpisodes }) {
  // const [latestEpisodes, setlatestEpisodes] = useState([])
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     const getLatestEpisodes = async () => {
  //         const response = await HomePageApi();
  //         setlatestEpisodes(response.latestEpisodeAnimes);
  //         console.log(latestEpisodes);
  //         setLoading(false)
  //     }
  //     getLatestEpisodes();

  // }, [])
  // if (loading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <>
      <div className="w-full py-8  gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {latestEpisodes.map((latestEpisodes, index) => (
          <Cards
            id={latestEpisodes.id}
            key={index}
            name={latestEpisodes.name}
            poster={latestEpisodes.poster}
            duration={latestEpisodes.duration}
            type={latestEpisodes.type}
          />
        ))}
      </div>
    </>
  );
}
