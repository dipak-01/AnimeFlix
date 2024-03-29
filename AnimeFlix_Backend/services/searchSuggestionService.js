export default async function searchSuggestionService() {
    const resp = await fetch(
        `https://api-aniwatch.onrender.com/anime/search/suggest?q=${query}`
      );
      const data = await resp.json();
      console.log(data);
}