import { useNavigate } from "react-router-dom";
import LandingPageInfo from "../components/LandingPageInfo";

export default function LandingPage() {
  const navigate = useNavigate("");

  const handleEnterClick = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="lg:px-6 px-2 text-slate-50 w-full h-screen max-w-[1420px] mx-auto xl:px-0 sm:px-4 flex justify-center items-center">
        <div className="flex justify-center">
          <div className="bg-zinc-900 lg:w-1/2 h-2/4 rounded-md lg:flex-row flex flex-col  shadow-lg transform transition duration-300 hover:scale-105">
            <div className="left lg:w-1/2 text-start py-8 px-8 align-super space-y-2">
              <div className="h-2/5 space-y-2">
                <p className="text-2xl font-semibold">Welcome to </p>
                <span className="text-4xl font-extrabold">
                  Anime<span className="text-orange-500">Flix</span>
                </span>
                <p className="text-orange-200">Your one stop destination to watch anime </p>
              </div>
              <div className="h-2/5 flex flex-col space-y-2">
                <p className="italic text-sm">Suggestion:</p>
                <p className="line-clamp-4 text-sm">
                  Solo Leveling, Overflow (Uncensored), Mashle: Magic and Muscles Season 2, Frieren: Beyond Journey's End, Classroom of the Elite III, Black Clover, Ninja Kamui, Tsukimichi -Moonlit Fantasy- Season 2, Hokkaido Gals Are Super Adorable!, Classroom of the Elite 2nd Season
                </p>
              </div>
              <div className="h-1/5 flex items-center">
                <button
                  onClick={handleEnterClick}
                  className="w-fit transition duration-150 focus:ring-2 ease-in-out transform bg-orange-500 text-zinc-800 font-semibold p-2 rounded-md hover:text-zinc-950 hover:border-zinc-600 focus:translate-y-1 hover:shadow-lg"
                >
                  Enter AnimeFlix
                </button>
              </div>
            </div>
            <div className="right lg:flex w-1/2 hidden justify-center items-end">
              <img className=" h-auto object-cover rounded-md shadow-lg" src="/landingpagehero.png" alt="AnimeFlix Hero" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
