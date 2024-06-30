import { useState, useEffect } from "react";
import Search from '..services/Search'
export default function () {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

  
    window.addEventListener("resize", handleResize);

     return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div>
        {" "}
        {isMobileView === false && (
          <div className="px-8  self-end">
            <input
              className="p-2  rounded-l-md ps-2 outline-none  "
              type="text"
              placeholder="Search for Anime"
            />
            <button onClick={handleSearchReasults} className="absolute  ">
              <i className="p-3 rounded-r-md    bg-lavender-web-400 fas fa-magnifying-glass "></i>
            </button>
          </div>
        )}
        {isMobileView == true && (
          <div className="px-8 self-end ">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <i className="p-3 rounded-md    bg-lavender-web-400 fas fa-magnifying-glass "></i>
            </button>
            {isSearchOpen && (
              <div className="absolute w-full left-0 top-0">
                <div class="relative  h-28    rounded-xl bg-hookers-green-200/80 shadow-lg ring-1 ring-black/5 pt-6 m-1">
                  <input
                    className=" p-2 rounded-l-md ps-2 outline-none w-96  rounded-xl bg-hookers-green-100/90 shadow-lg ring-1 ring-black/5"
                    type="text"
                    placeholder="Search for Anime"
                  />
                  <button
                    className="absolute text-slate-100 right-0 top-0 mt-2 mr-2  "
                    onClick={() => setIsSearchOpen(false)}
                  >
                    {" "}
                    <i className="fas fa-xmark  "></i>{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
