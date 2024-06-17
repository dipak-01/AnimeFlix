import axios from "axios";
// import algoliasearch from "algoliasearch";
export default function first() {

  // const client = algoliasearch(
  //   "96QFTVZGSG",
  //   "a1a22ce87a7ac34447ab158180c38483"
  // );
  // const index = client.initIndex("anime_index");

  async function fetchAnimeData(query, page) {
    const url = `https://aniwatch-api-euo9.onrender.com/anime/search?q=${query}&page=${page}`;
    const response = await axios.get(url);
    return response.data;
  }

  async function fetchAllAnimeData(query) {
    let page = 1;
    let allData = [];
    let hasMore = true;

    while (hasMore) {
      const data = await fetchAnimeData(query, page);
      allData = allData.concat(data.results); // Adjust based on the API response structure
      hasMore = data.next_page !== null; // Adjust based on the API response structure
      page++;
    }

    return allData;
  }

  function transformData(animeData) {
    return animeData.map((item) => ({
      objectID: item.id, // Assuming 'id' is the unique identifier
      title: item.title,
      synopsis: item.synopsis,
      // Add other relevant fields
    }));
  }

  async function uploadToAlgolia(animeData) {
    const transformedData = transformData(animeData);
    await index.saveObjects(transformedData);
    console.log("Data uploaded to Algolia");
  }

  fetchAllAnimeData("naruto").then((data) => {
    console.log(data);
    uploadToAlgolia(data);
  });
}
