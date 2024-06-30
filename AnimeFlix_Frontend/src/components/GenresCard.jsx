 
export default function ({ genre }) {
 

  const colors = [
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
    "teal",
  ];
 
  return (
    <>
      <div className="scrollbar-hide text-start flex flex-wrap h-3/4   whitespace-nowrap   gap-6 px-4">
        {genre.slice().map((genres, index) => {
          const color = colors[index % colors.length];

          return (
            <p
              key={index}
              className={
                (color === "red"
                  ? "text-red-400"
                  : color === "green"
                  ? "text-green-400"
                  : color === "blue"
                  ? "text-blue-400"
                  : color === "indigo"
                  ? "text-indigo-400"
                  : color === "purple"
                  ? "text-purple-400"
                  : color === "pink"
                  ? "text-pink-400"
                  : color === "teal"
                  ? "text-teal-400"
                  : "") + " p-1 bg-gunmetal-300 border w-min rounded-md"
              }
            >
              {genres}
            </p>
          );
        })}
      </div>
    </>
  );
}
