export default function () {
  return (
    <>
      <main className="h-screen text-white lg:px-6 px-2 w-full max-w-[1420px] my-4 mx-auto xl:px-0 sm:px-4">
        <div
          style={{
            backgroundImage: `url(${images[1]})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            objectFit: "cover",
          }}
          className="flex relative h-1/4 bg-french-gray-100 items-center"
        >
          <div className="absolute z-10 w-full h-full bg-gray-700/75 blur-sm"></div>
          <p className="z-20 text-4xl text-black font-bold m-auto">
            Hi, {user.displayName}
          </p>
        </div>

        <div className="flex w-2/4 mx-auto justify-between p-4 m-4 border-b-2 border-gray-900">
          <a href="">
            <i className="fas fa-user"></i> Profile
          </a>
          <a href="">
            <i className="fas fa-heart"></i> WatchList
          </a>
          <a href="">
            <i className="fas fa-clock"></i> Continue Watching
          </a>
        </div>
      </main>
    </>
  );
}
