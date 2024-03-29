import homePage from "../controllers/homeController.js";
import express from "express";

const router = express.Router();

router.get("/home", async (req, res) => {
  try {
    const {
      genres,
      latestEpisodeAnimes,
      spotlightAnimes,
      top10Animes,
      topAiringAnimes,
      topUpcomingAnimes,
      trendingAnimes,
    } = await homePage();

    // Your routes go here
    // res.render('home', {
    //   genres,
    //   latestEpisodeAnimes,
    //   spotlightAnimes,
    //   top10Animes,
    //   topAiringAnimes,
    //   topUpcomingAnimes,
    //   trendingAnimes,
    // });
    res.json({
      genres,
      latestEpisodeAnimes,
      spotlightAnimes,
      top10Animes,
      topAiringAnimes,
      topUpcomingAnimes,
      trendingAnimes,
    });
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

export default router;
