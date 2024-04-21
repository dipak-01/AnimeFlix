export default function () {
  return (
    <>
      <div>
        <nav className="bg-gunmetal-200/75 h-20 z-50 py-4 px-12 fixed flex items-center w-full justify-between ">
          <div className="flex gap-8 items-center">
            <div>
              <a href="">
                <i className="text-hookers-green-500 fas pr-4 fa-burger text-3xl"></i>
              </a>
            </div>
            <div className="w-60  ">
              <img src="/newLogoB.png" alt="" />
            </div>
            <div className="px-8  ">
              <input
                className="p-2 rounded-l-md ps-2 outline-none"
                type="text"
                placeholder="Search for Anime"
              />
              <button>
                <i className="p-3 rounded-r-md  bg-lavender-web-400 fas fa-magnifying-glass "></i>
              </button>
            </div>
          </div>
          <div className="   ">
            <div className="">
              <ul className="flex gap-8 ml-12 text-2xl text-gunmetal-800 font-sans font-semibold">
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
