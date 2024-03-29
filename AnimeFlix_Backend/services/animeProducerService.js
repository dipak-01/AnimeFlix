export default async function animeProducerService() {
  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/producer/${name}?page=${page}`
  );
  const data = await resp.json();
  console.log(data);
}
