import animeInfoService from "../services/animeInfoService";
const animeInfo = async (req, res) => {
  const animeId = req.params.id;
  try {
    const {
      anime,
      moreInfo,
      mostPopularAnimes,
      recommendedAnimes,
      relatedAnimes,
      seasons,
    } = await animeInfoService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default animeInfo;
