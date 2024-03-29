import animeEpisodesService from "../services/animeEpisodesService";
const animeEpisodes = async (req, res) => {
  try {
    const { totalEpisodes, episodes } = await animeEpisodesService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default animeEpisodes;
