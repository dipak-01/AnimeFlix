import "../styles/loader.css";

export function Loader() {
  return (
    <div className="flex h-screen  w-full items-center justify-center ">
      <img
        className=" h-32 w-60 border-teal-950 bg-right"
        src="/load2.gif"
        alt="Loading..."
      />
    </div>
  );
}

export const SecondLoader = () => {
  return (
    <div className="loader flex items-center">
      <span className="bar"></span>
      <span className="bar bar-second"></span>
      <span className="bar bar-third"></span>
    </div>
  );
};
