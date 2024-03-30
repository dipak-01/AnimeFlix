import HomePageApi from "../services/HomePageApi";
import CardsType2 from "./CardsType2";
import { useEffect, useState } from "react";
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
      <div className="w-full py-8 gap-8 flex flex-wrap">
        {latestEpisodes.map((latestEpisodes, index) => (
          <CardsType2
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
