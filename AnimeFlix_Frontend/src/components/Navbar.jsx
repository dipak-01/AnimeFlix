import { useState } from "react";
import SearchBar from "./SearchBar";
export default function () {
  return (
    <>
      <div>
        <nav className="bg-gunmetal-200/75 h-20 z-50 py-4 lg:px-12 px-4 fixed flex items-center w-full justify-between ">
          <div className="flex items-center w-full  justify-between lg:justify-start px-4">
            <div>
              <a href="">
                <i className="text-hookers-green-500 fas pr-4 fa-burger text-3xl"></i>
              </a>
            </div>
            <div className="lg:w-40 w-20 ">
              <img src="/newLogoB.png" alt="" />
            </div>
            <SearchBar></SearchBar>
          </div>
          <div className=" lg:flex hidden ">
            <div className="">
              <ul className="flex gap-8 ml-12 text-xl text-gunmetal-800 font-sans font-semibold">
                <li>
                  <a href="">Home</a>
                </li>
                {"/"}
                <li>
                  <a href="">About</a>
                </li>
                {"/"}
                <li>
                  <a href="">Community</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button></button>
          </div>
        </nav>
      </div>
    </>
  );
}
