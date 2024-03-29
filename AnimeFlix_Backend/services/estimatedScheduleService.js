export default async function estimateSchedule() {
  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/schedule?date=${date}`
  );
  const data = await resp.json();
  console.log(data);
}
