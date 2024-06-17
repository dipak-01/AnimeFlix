import React, { useState, useEffect } from "react";
import axios from "axios";

const Suggestions = ({ query }) => {
  const [data, setData] = useState([]);

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

  return (
    <div className="bg-slate-900  p-2">
      {data.map((suggestion) => (
        <div
          className="text-slate-400 bg-slate-900 w p-1 mb-1 border-b-2 border-slate-700"
          key={suggestion.id}
        >
            
          {suggestion.name == ""
            ? "dont search hentai you little c*nt"
            : suggestion.name}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
