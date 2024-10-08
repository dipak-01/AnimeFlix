import { useState, useEffect } from "react";
import axios from "axios";

const AnimeQuoteCard = () => {
  const [quote, setQuote] = useState({
    anime: "",
    character: "",
    quote: "",
  });

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://animechan.io/api/v1/quotes/random",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response;
       setQuote({
        anime: data.anime,
        character: data.animeCharacter,
        quote: data.content,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="m-4 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="p-8">
        <div className=" text-xl font-semibold uppercase tracking-wide text-indigo-500">
          {quote.anime}
        </div>
        <p className="mt-2 text-gray-500">{quote.character}</p>
        <p className="mt-2  text-gray-900">"{quote.quote}"</p>
      </div>
    </div>
  );
};

export default AnimeQuoteCard;
