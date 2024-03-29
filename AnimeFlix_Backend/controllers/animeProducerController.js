import animeProducerService from "../services/animeProducerService";
const animeProducer = async (req, res) => {
  try {
    const {
      producerName,
      animes,
      topAiringAnime,
      top10Anime,
      currentPage,
      totalPages,
      hasNextPage,
    } = await animeProducerService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default animeProducer;
