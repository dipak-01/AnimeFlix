export default async function animeCategoryService() {
  // categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

  const resp = await fetch(
    `https://api-aniwatch.onrender.com/anime/${category}?page=${page}`
  );
  const data = await resp.json();
  console.log(data);
}
