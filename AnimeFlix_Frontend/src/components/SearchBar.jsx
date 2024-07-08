import { useState, useEffect } from "react";
import Search from "..services/Search";
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
          <div className="self-end  px-8">
            <input
              className="rounded-l-md  p-2 ps-2 outline-none  "
              type="text"
              placeholder="Search for Anime"
            />
            <button onClick={handleSearchReasults} className="absolute  ">
              <i className="fas fa-magnifying-glass    rounded-r-md bg-lavender-web-400 p-3 "></i>
            </button>
          </div>
        )}
        {isMobileView == true && (
          <div className="self-end px-8 ">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <i className="fas fa-magnifying-glass    rounded-md bg-lavender-web-400 p-3 "></i>
            </button>
            {isSearchOpen && (
              <div className="absolute left-0 top-0 w-full">
                <div class="relative  m-1    h-28 rounded-xl bg-hookers-green-200/80 pt-6 shadow-lg ring-1 ring-black/5">
                  <input
                    className=" w-96 rounded-xl rounded-l-md bg-hookers-green-100/90 p-2  ps-2 shadow-lg outline-none ring-1 ring-black/5"
                    type="text"
                    placeholder="Search for Anime"
                  />
                  <button
                    className="absolute right-0 top-0 mr-2 mt-2 text-slate-100  "
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
