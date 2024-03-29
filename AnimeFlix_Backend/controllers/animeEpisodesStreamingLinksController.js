import animeEpisodeStreamingLinksService from "../services/animeEpisodeStreamingLinksService";
const animeEpisodeStreamingLinks = async (req, res) => {
  try {
    const { headers, sources, subtitles, anilistID, malID } =
      await animeEpisodeStreamingLinksService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default animeEpisodeStreamingLinks;
