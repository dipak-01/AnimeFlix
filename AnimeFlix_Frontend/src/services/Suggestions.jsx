import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Suggestions = ({ query }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleClick=(id)=>{
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();

  }
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://aniwatch-api-euo9.onrender.com/anime/search/suggest?q=${query}`,
          { crossdomain: true }
        );
        // console.log(filteredData);
        const filteredData = response.data.suggestions;
        setData(filteredData);
      } catch (error) {
        console.error("Error in fetching suggestions:", error);
      }
    };

    if (query) {
      getData();
    }
  }, [query]);
  // if (!data || data.length === 0) {
  //   return (
  //     <div className="text-slate-400 bg-slate-900 p-2 mt-1">
  //       Don't Search hentai here you little c*nt.
  //     </div>
  //   );
  // }

  return (
    <div className="bg-slate-900 rounded-xl border border-blue-300 p-2 mt-1">
      {data.length > 0 ? (
        data.map((suggestion) => (
          <div
            onClick={() => handleClick(suggestion.id)}
            className="cursor-pointer hover:text-slate-50 text-slate-400 bg-slate-900 p-1 mb-1 border-b-2 border-slate-700"
            key={suggestion.id}
          >
            {suggestion.name ? suggestion.name : "don't search"}
          </div>
        ))
      ) : (
        <div className="text-slate-400 bg-slate-900 p-1 mb-1   border-slate-700">
          Don't Search hentai here you little c*nt.
        </div>
      )}
    </div>
  );
};

export default Suggestions;
