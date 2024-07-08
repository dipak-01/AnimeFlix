import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Suggestions = ({ query }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ANIME_URL}/anime/search/suggest?q=${query}`,
          { crossdomain: true },
        );

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
    <div className="mt-1 rounded-xl border border-blue-300 bg-slate-900 p-2">
      {data.length > 0 ? (
        data.map((suggestion) => (
          <div
            onClick={() => handleClick(suggestion.id)}
            className="mb-1 cursor-pointer border-b-2 border-slate-700 bg-slate-900 p-1 text-slate-400 hover:text-slate-50"
            key={suggestion.id}
          >
            {suggestion.name ? suggestion.name : "don't search"}
          </div>
        ))
      ) : (
        <div className="mb-1 border-slate-700 bg-slate-900 p-1   text-slate-400">
          {"  Don't Search hentai here you little c*nt."}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
