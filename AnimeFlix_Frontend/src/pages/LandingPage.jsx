import { useNavigate } from "react-router-dom";
import LandingPageInfo from "../components/LandingPageInfo";

export default function LandingPage() {
  const navigate = useNavigate("");

  const handleEnterClick = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="mx-auto flex h-screen w-full max-w-[1420px] items-center justify-center px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0">
        <div className="flex justify-center">
          <div className="flex h-2/4 transform flex-col rounded-md bg-zinc-900 shadow-lg  transition duration-300 hover:scale-105 lg:w-1/2 lg:flex-row">
            <div className="left space-y-2 px-8 py-8 text-start align-super lg:w-1/2">
              <div className="h-2/5 space-y-2">
                <p className="text-2xl font-semibold">Welcome to </p>
                <span className="text-4xl font-extrabold">
                  Anime<span className="text-orange-500">Flix</span>
                </span>
                <p className="text-orange-200">
                  Your one stop destination to watch anime{" "}
                </p>
              </div>
              <div className="flex h-2/5 flex-col space-y-2">
                <p className="text-sm italic">Suggestion:</p>
                <p className="line-clamp-4 text-sm">
                  Solo Leveling, Overflow (Uncensored), Mashle: Magic and
                  Muscles Season 2, Frieren: Beyond Journey's End, Classroom of
                  the Elite III, Black Clover, Ninja Kamui, Tsukimichi -Moonlit
                  Fantasy- Season 2, Hokkaido Gals Are Super Adorable!,
                  Classroom of the Elite 2nd Season
                </p>
              </div>
              <div className="flex h-1/5 items-center">
                <button
                  onClick={handleEnterClick}
                  className="w-fit transform rounded-md bg-orange-500 p-2 font-semibold text-zinc-800 transition duration-150 ease-in-out hover:border-zinc-600 hover:text-zinc-950 hover:shadow-lg focus:translate-y-1 focus:ring-2"
                >
                  Enter AnimeFlix
                </button>
              </div>
            </div>
            <div className="right hidden w-1/2 items-end justify-center lg:flex">
              <img
                className=" h-auto rounded-md object-cover shadow-lg"
                src="/landingpagehero.png"
                alt="AnimeFlix Hero"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
