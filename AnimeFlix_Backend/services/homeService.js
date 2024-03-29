export default async function fetchData() {
  const resp = await fetch("https://api-aniwatch.onrender.com/anime/home");
  const data = await resp.json();

  return data;
}

// const homeService = async () => {
//   try {
//     const data = await fetchData();
//     const {
//       genres,
//       latestEpisodeAnimes,
//       spotlightAnimes,
//       top10Animes,
//       topAiringAnimes,
//       topUpcomingAnimes,
//       trendingAnimes,
//     } = data;
//     console.log(data);
//     return {
//       data,
//       genres,
//       latestEpisodeAnimes,
//       spotlightAnimes,
//       top10Animes,
//       topAiringAnimes,
//       topUpcomingAnimes,
//       trendingAnimes,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// export { homeService };
