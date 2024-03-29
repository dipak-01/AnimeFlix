export default async function animeEpisodesService() {
  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/episodes/${animeId}`
  );
  const data = await resp.json();
  console.log(data);
}
