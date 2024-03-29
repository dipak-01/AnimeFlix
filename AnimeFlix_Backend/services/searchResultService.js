export default async function searchResultService() {
    const resp = await fetch(
        `https://api-aniwatch.onrender.com/anime/search?q=${query}&page=${page}`

      );
      const data = await resp.json();
      console.log(data);
}