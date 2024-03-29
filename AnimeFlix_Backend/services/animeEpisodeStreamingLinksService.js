export default async function animeStreamingLinksService() {
  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/episode-srcs?id=${episodeId}&server=${server}&category=${category}`
  );
  const data = await resp.json();
  console.log(data);
}
