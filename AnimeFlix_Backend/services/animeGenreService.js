export default async function animeGenreService() {
    const resp = await fetch(
        `https://api-aniwatch.onrender.com/anime/genre/${name}?page=${page}`
      );
      const data = await resp.json();
      console.log(data);
}