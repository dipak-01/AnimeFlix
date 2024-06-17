// import { useState } from "react";
// import SearchBar from "./SearchBar";
// import IconBreadcrumbs from "./IconBreadcrumbs";
// export default function () {
//   return (
//     <>
//       <div>
//         {/* <nav className="bg-gunmetal-200/75 h-20 z-50 py-4 lg:px-12 px-4 fixed flex items-center w-full justify-between ">
//           <div className="flex items-center w-full  justify-between lg:justify-start px-4">
//             <div>
//               <a href="">
//                 <i className="text-hookers-green-500 fas pr-4 fa-burger text-3xl"></i>
//               </a>
//             </div>
//             <div className="lg:w-40 w-20 ">
//               <img src="/newLogoB.png" alt="" />
//             </div>
//             <SearchBar></SearchBar>
//           </div>
//           <div className=" lg:flex hidden ">
//             <div className="">
//               <ul className="flex gap-8 ml-12 text-xl text-gunmetal-800 font-sans font-semibold">
//                 <li>
//                   <a href="">Home</a>
//                 </li>
//                 {"/"}
//                 <li>
//                   <a href="">About</a>
//                 </li>
//                 {"/"}
//                 <li>
//                   <a href="">Community</a>
//                 </li>
//               </ul>
//             </div>
//             <IconBreadcrumbs/>
//           </div>
//           <div>
//             <button></button>
//           </div>
//         </nav> */}

//         {/* <nav class="bg-white border-gray-200 dark:bg-gray-900">
//           <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//             <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
//               <img src="./newLogoB.png" class="h-8" alt="Flowbite Logo" />
//               <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
//             </a>
//             <div class="flex md:order-2">
//               <button
//                 type="button"
//                 data-collapse-toggle="navbar-search"
//                 aria-controls="navbar-search"
//                 aria-expanded="false"
//                 class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
//               >
//                 <svg
//                   class="w-5 h-5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//                 <span class="sr-only">Search</span>
//               </button>
//               <div class="relative hidden md:block">
//                 <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                   <svg
//                     class="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                     />
//                   </svg>
//                   <span class="sr-only">Search icon</span>
//                 </div>
//                 <input
//                   type="text"
//                   id="search-navbar"
//                   class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Search..."
//                 />
//               </div>
//               <button
//                 data-collapse-toggle="navbar-search"
//                 type="button"
//                 class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                 aria-controls="navbar-search"
//                 aria-expanded="false"
//               >
//                 <span class="sr-only">Open main menu</span>
//                 <svg
//                   class="w-5 h-5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 17 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M1 1h15M1 7h15M1 13h15"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div
//               class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//               id="navbar-search"
//             >
//               <div class="relative mt-3 md:hidden">
//                 <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                   <svg
//                     class="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   id="search-navbar"
//                   class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Search..."
//                 />
//               </div>
//               <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                 <li>
//                   <a
//                     href="#"
//                     class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
//                     aria-current="page"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                   >
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                   >
//                     Services
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav> */}
//       </div>

//     </>
//   );
// }

import Suggestions from "../services/Suggestions";
import React, { useState,useRef,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";

function App() {
  const searchBarRef = useRef(null); // Step 1
  const [name, setName] = useState("");
  const [query, setQuery] = useState('');


  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }
 
  // ...

  const handleSearchSuggestion = (event) => {
    event.preventDefault();
    let val=event.target.value
    setName(val);
    setQuery(val)
   
    // Call Suggestions component with the value as parameter
    
  };


  useEffect(() => { // Step 2
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) { // Step 3
        handleSearchClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => { // Step 4
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchBarRef]);
  return (
    <div className="App ">
      <nav className="bg-slate-1000/75   px-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-white text-xl font-bold">
            <img className="w-32" src="./newLogoB.png" alt="" />
          </a>

          {/* Links */}
          <div className="hidden space-x-4 text-white text-lg lg:flex">
            <a href="/link1" className="hover:underline">
              Home
            </a>
            <span>/</span>
            <a href="/link2" className="hover:underline">
              Community
            </a>
            <span>/</span>
            <a href="/link3" className="hover:underline">
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
        <div  className="z-50 fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="relative w-4/5 sm:w-3/5 lg:w-2/5">
            <form ref={searchBarRef}  onSubmit={handleSubmit} class="max-w-md mx-auto">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-950 dark:bg-slate-900 dark:border-gray-700 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12"
                  placeholder="Search Overflow, HighSchool DXD..."
                  required
                  value={name}
                  onChange={handleSearchSuggestion}
                />
                <button
                  type="submit"
                  class="h-12 absolute text-sm end-0 bottom-0    focus:outline-none   font-medium rounded-lg px-4 py-2   "
                >
                  <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-zinc-500" />
                </button>
              </div>
                {query && <Suggestions query={query} />}
            </form>
            {/* <Suggestions query={query} /> */}
            <button 

              onClick={handleSearchClose}
              className="absolute top-3 right-0 text-white"
            >
               
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// <form class="max-w-md mx-auto">
//     <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//     <div class="relative">
//         <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//             </svg>
//         </div>
//         <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
//         <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//     </div>
// </form>
