import animeCategoryService from "../services/animeCategoryService";
const animeCategory = async (req, res) => {
  try {
    const {
      category,
      animes,
      genres,
      top10Animes,
      currentPage,
      totalPages,
      hasNextPage,
    } = await animeCategoryService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default animeCategory;
