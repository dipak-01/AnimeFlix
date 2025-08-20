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
    <div className="mx-auto my-6 w-full max-w-lg rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
      <div className="flex flex-col gap-2 p-8">
        <div className="text-lg font-bold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">
          {quote.anime}
        </div>
        <p className="text-base font-medium text-gray-600 dark:text-gray-300">
          {quote.character}
        </p>
        <p className="mt-2 text-xl italic text-gray-900 dark:text-gray-100">
          "{quote.quote}"
        </p>
      </div>
    </div>
  );
};

export default AnimeQuoteCard;
