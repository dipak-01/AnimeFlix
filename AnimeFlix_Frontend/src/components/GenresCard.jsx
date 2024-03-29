import { useState, useEffect } from "react";
import HomePageApi from "../services/HomePageApi";
export default function ({genre}) {
//   const [genre, setGenre] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   useEffect(() => {
//     const getGenre = async () => {
//       const response = await HomePageApi();
//       setGenre(response.genres);
//       setLoading(false);
//     };
//     getGenre();
//   }, []);

//   if (loading == false)
    return (
      <>
        <div className="scrollbar-hide text-start h-2/3 overflow-y-scroll bg-gunmetal-500 grid lg:grid-cols-3 grid-cols-2 grid-flow-row gap-6 p-8">
          {genre.map((genres, index) => {
            const color = colors[index % colors.length];
             
            return (
              <p
                key={index}
                className={
                  color === "red"
                    ? "text-red-400"
                    : color === "yellow"
                    ? "text-yellow-400"
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
                    : ""
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
