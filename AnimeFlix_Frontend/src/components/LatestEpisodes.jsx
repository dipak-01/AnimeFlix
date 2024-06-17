import CardsType2 from "./CardsType2";
function Cards({ name, type, duration, poster }) {
  return (
    <>
      <div className=" max-w-48 min-w-28 h-96 ">
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
