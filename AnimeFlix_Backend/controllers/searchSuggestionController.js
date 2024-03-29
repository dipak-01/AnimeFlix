import searchSuggestionService from "../services/searchSuggestionService";
const searchSuggestion = async (req, res) => {
  try {
    const { suggestions } = await searchSuggestionService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default searchSuggestion;
