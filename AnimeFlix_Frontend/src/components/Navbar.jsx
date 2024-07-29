import Suggestions from "../services/Suggestions";
// import { createClient } from "@supabase/supabase-js";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import { fetchUserData } from "../services/authService";
import { useAlert } from "./AlertContext";

import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserProfilePopover from "./BurgerPopover";

function App() {
  const { showAlert } = useAlert();
  const [toggleUser, setToggleUser] = useState(false);
  const toggleRef = useRef(null);
  const [session, setSession] = useState(false);
  const searchBarRef = useRef(null);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate("");
  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    getData();
  }, []);
  useEffect(() => {}, [userData]);
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleToggleUser = () => {
    setToggleUser(!toggleUser);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const keyword = name;
    if (name !== "") navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    setSearchOpen(false);
  };

  const handleSearchSuggestion = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setName(val);
    setQuery(val);
  };

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        handleSearchClose();
      }
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setToggleUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef, toggleRef]);

  return (
    <div className="App h-20  ">
      <div className="fixed w-full z-50 bg-black">
        <nav className="bg-slate-1000/75 p-4   lg:px-10 ">
          <div className="container mx-auto flex items-center justify-between">
            <div className="space-x-2">
              <UserProfilePopover />
              <a href="/" className="text-xl font-bold text-white">
                <span className="text-pretty text-xl lg:text-3xl">
                  Anime<span className="text-orange-600">Flix</span>
                </span>
              </a>
            </div>
            <div className="hidden space-x-4 text-lg text-white lg:flex">
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
            <div className="flex items-center space-x-8">
              <button onClick={handleSearchOpen} className="text-white">
                <FontAwesomeIcon icon={faSearch} className="h-6 w-6" />
              </button>
              <div className="relative" ref={toggleRef}>
                <button
                  type="button"
                  onClick={handleToggleUser}
                  className="text-white"
                >
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                </button>
                {toggleUser && (
                  <div className="absolute right-0 z-50 w-72 space-y-4 rounded-lg bg-gray-900 p-2 py-4 text-start text-slate-50">
                    {userData ? (
                      <div className="space-y-3">
                        <p className="text-orange-400"> {userData.username}</p>
                        <p className="cursor-pointer rounded-2xl border-2 border-gray-700 bg-gray-800 p-2 hover:text-white">
                          {userData.email}
                        </p>
                        <p
                          onClick={() => navigate("/user/profile")}
                          className="cursor-pointer rounded-2xl border-2 border-gray-700 bg-gray-800 p-2 hover:text-white"
                        >
                          Profile
                        </p>
                        <p
                          onClick={() => navigate("/user/watchlist")}
                          className="cursor-pointer rounded-2xl border-2 border-gray-700 bg-gray-800 p-2 hover:text-white"
                        >
                          Watchlist
                        </p>
                        <p
                          onClick={() => navigate("/user/continuewatching")}
                          className="cursor-pointer rounded-2xl border-2 border-gray-700 bg-gray-800 p-2 hover:text-white"
                        >
                          Continue Watching
                        </p>
                        <div className="cursor-pointer px-2 text-end hover:text-white">
                          <button
                            className="hover:text-orange-300"
                            onClick={() => {
                              localStorage.removeItem("token");
                              showAlert("Logged Out", "success");
                              setTimeout(() => {
                                window.location.reload();
                              }, 3000);
                            }}
                          >
                            Logout <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* {showAuth && (
                        <Auth
                          supabaseClient={supabase}
                          appearance={{ theme: ThemeSupa }}
                        />
                      )} */}
                        <button
                          className="rounded-xl border-2 bg-orange-200 px-2 text-gray-800"
                          id="login"
                          onClick={() => navigate("/login")}
                          // onClick={handleLoginClick}
                        >
                          Log in
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative w-4/5 sm:w-3/5 lg:w-2/5">
              <form
                ref={searchBarRef}
                onSubmit={handleSubmit}
                className="mx-auto max-w-md"
              >
                <label
                  htmlFor="default-search"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
                    className="block h-12 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:bg-slate-950 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:placeholder-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search Overflow..."
                    required
                    value={name}
                    onChange={handleSearchSuggestion}
                  />
                  <button
                    type="submit"
                    className="absolute bottom-0 end-0 h-12 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none"
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
                className="absolute right-0 top-3 text-white"
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
