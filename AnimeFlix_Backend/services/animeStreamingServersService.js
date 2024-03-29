export default async function animeEpisodeStreamingServers() {
  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/servers?episodeId=${id}`
  );
  const data = await resp.json();
  console.log(data);
}
