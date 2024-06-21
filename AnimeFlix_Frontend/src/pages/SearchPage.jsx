import CardsType2 from "../components/CardsType2";
import Search from "../services/Search";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export default function SearchPage() {
  // let { keyword } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
   const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();  

  const handleClick =(id)=>{
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
  

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Search(keyword); // Assuming `Search` is an async function
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);
  // console.log(keyword);
  // console.log(data);
  // const ani = data.animes;
  // console.log(ani);
  // console.log(ani.name);
  if (loading) return <div className="w-full h-screen flex justify-center items-center   text-3xl"><img className=" w-40 h-24 " src="/load2.gif"></img></div>;;
  if (!data) return <div>No data found</div>;

  return (
    <>
      <div className="lg:px-12 px-4  text-slate-50">
       
        <div className="text-3xl text-start pt-8 text-lavender-web-500">
                <p>Search results for : <span className="italic text-orange-500">{keyword}</span></p>
            </div>
        <div>
          <div className="text-slate-200 w-full py-8 gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {(data.animes || []).map((data, index) => (
              <CardsType2
              id={data.id}
                key={index}
                name={data.name}
                poster={data.poster}
                duration={data.duration}
                type={data.type}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
