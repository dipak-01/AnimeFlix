import CardsType2 from "../components/CardsType2";
import Search from "../services/Search";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Search(keyword);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center   text-3xl">
        <img className=" h-24 w-40 " src="/load2.gif"></img>
      </div>
    );
  if (!data) return <div>No data found</div>;

  return (
    <>
      <div className="mx-auto my-4  min-h-screen h-auto   w-full max-w-[1420px] px-4 text-slate-50 sm:px-4 lg:px-6 xl:px-0">
        <div className="pt-8 text-start text-3xl text-lavender-web-500">
          <p>
            Search results for :{" "}
            <span className="italic text-orange-500">{keyword}</span>
          </p>
        </div>
        <div>
          <div className="grid w-full   grid-cols-2 gap-8 py-8 text-slate-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {data.animes && Object.keys(data.animes).length > 0 ? (
              data.animes.map((anime, index) => (
                <CardsType2
                  key={index}
                  id={anime.id}
                  name={anime.name}
                  poster={anime.poster}
                  duration={anime.duration}
                  type={anime.type}
                />
              ))
            ) : (
              <div className="absolute   flex gap-4 text-3xl font-bold italic text-slate-300">
                <div className="flex w-full">
                  <p> There are no such anime, bruh.</p>{" "}
                  <img className="w-60" src="/noanime.gif" alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
