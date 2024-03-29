import searchResultService from "../services/searchResultService";
const searchResult = async (req, res) => {
  try {
    const {
      animes,
      mostPopularAnimes,
      currentPage,
      totalPages,
      hasNextPage,
      searchQuery,
      searchFilters,
    } = await searchResultService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default searchResult;
