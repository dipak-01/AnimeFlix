import fetchData from "../services/homeService.js";

const homePage = async (req, res) => {
  try {
    const {
      genres,
      latestEpisodeAnimes,
      spotlightAnimes,
      top10Animes,
      topAiringAnimes,
      topUpcomingAnimes,
      trendingAnimes,
    } = await fetchData();
    return {
      genres,
      latestEpisodeAnimes,
      spotlightAnimes,
      top10Animes,
      topAiringAnimes,
      topUpcomingAnimes,
      trendingAnimes,
    };
  } catch (error) {
    console.error("Error in fetching the results:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

export default homePage;
