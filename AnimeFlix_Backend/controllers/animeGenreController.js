import animeGenreService from "../services/animeGenreService";
const animeGenre = async (req, res) => {
  try {
    const {
      genreName,
      animes,
      topAiringAnimes,
      currentPage,
      totalPages,
      hasNextPage,
    } = await animeGenreService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default animeGenre;
