import Suggestions from "../services/Suggestions";
 import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserProfilePopover from "./BurgerPopover";

function App() {
  const searchBarRef = useRef(null);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate("");
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name);
    const keyword = name;
    if (name !== "") navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    setSearchOpen(false);
  };

  // ...

  const handleSearchSuggestion = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setName(val);
    setQuery(val);

    // Call Suggestions component with the value as parameter
  };

  useEffect(() => {
    // Step 2
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        // Step 3
        handleSearchClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Step 4
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);
  return (
    <div className="App ">
      <nav className="bg-slate-1000/75   lg:px-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="space-x-2">
            {" "}
            <UserProfilePopover />
            <a href="/" className="text-white text-xl font-bold">
              <span className="text-pretty text-xl lg:text-3xl">
                Anime<span className="text-orange-600">Flix</span>{" "}
              </span>
              {/* <img className="w-32" src="./newLogoB.png" alt="" /> */}
            </a>
          </div>
          {/* Links */}
          <div className="hidden space-x-4 text-white text-lg lg:flex">
            <a href="/home" className="hover:underline">
              Home
            </a>
            <span>/</span>
            <a href="/community" className="hover:underline">
              Community
            </a>
            <span>/</span>
            <a href="/watchtogether" className="hover:underline">
              Watch Together
            </a>
          </div>

          {/* Icons */}
          <div className="flex space-x-8 items-center ">
            <button onClick={handleSearchOpen} className="text-white">
              <FontAwesomeIcon icon={faSearch} className="h-6 w-6" />
            </button>
            <button className="text-white">
              <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="relative w-4/5 sm:w-3/5 lg:w-2/5">
            <form
              ref={searchBarRef}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-950 dark:bg-slate-900 dark:border-gray-700 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12"
                  placeholder="Search Overflow..."
                  
                  required
                  value={name}
                  onChange={handleSearchSuggestion}
                />
                <button
                  type="submit"
                  className="h-12 absolute text-sm end-0 bottom-0    focus:outline-none   font-medium rounded-lg px-4 py-2   "
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="h-6 w-6 text-zinc-500"
                  />
                </button>
              </div>
              {query && <Suggestions query={query} />}
            </form>
             <button
              onClick={handleSearchClose}
              className="absolute top-3 right-0 text-white"
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
