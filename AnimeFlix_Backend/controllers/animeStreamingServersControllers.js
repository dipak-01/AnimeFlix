import animeStreamingServersService from "../services/animeStreamingServersService";
const animeStreamingServers = async (req, res) => {
  try {
    const { episodeId, episodeNo, sub, dub } = await animeStreamingServersService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default animeStreamingServers;
