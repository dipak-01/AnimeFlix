import axios from "axios";

export default async function Search(query) {
  async function fetchAnimeData(query, page) {
    const url =
      `${import.meta.env.VITE_ANIME_URL_SECONDARY}/search?q=${query}&page=${page}` ||
      `${import.meta.env.VITE_ANIME_URL}/search?q=${query}&page=${page}`;
    const response = await axios.get(url);
    return response.data.data;
  }

  async function fetchAllAnimeData(query) {
    let allData = [];
    for (let page = 1; page <= 5; page++) {
      const data = await fetchAnimeData(query, page);
      allData = { ...allData, ...data };
      if (!data.hasNextPage) break;
    }
    return allData;   
  }

  if (query) {
    const results = await fetchAllAnimeData(query);
    return results;
  }
  return [];
}
