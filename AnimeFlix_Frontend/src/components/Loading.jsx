import "../styles/loader.css"
 
 export function Loader() {
  return (
    <div className="w-full h-screen  flex justify-center items-center ">
      <img
        className=" border-teal-950 w-60 h-32 bg-right"
        src="/load2.gif"
        alt="Loading..."
      />
    </div>
  );
}

export const SecondLoader = () => {
  return (
    <div className="flex items-center loader">
      <span className="bar"></span>
      <span className="bar bar-second"></span>
      <span className="bar bar-third"></span>
    </div>
  );
};

