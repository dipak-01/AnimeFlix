import axios from "axios";

export default async function Search(query) {
  console.log(query);

  async function fetchAnimeData(query, page) {
    console.log(`${query} and ${page}`);
    const url = `https://aniwatch-api-euo9.onrender.com/anime/search?q=${query}&page=${page}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  async function fetchAllAnimeData(query) {
    console.log(`fetchalldata ${query}`);
    let allData = [];
    for (let page = 1; page <= 5; page++) {
      const data = await fetchAnimeData(query, page);
      allData = { ...allData, ...data }; // Adjust based on the API response structure
      if (!data.hasNextPage) break;
    }
    console.log(allData);
    return allData;
  }

  if (query) {
    const results = await fetchAllAnimeData(query);
    return results;
  }
  return [];
}
