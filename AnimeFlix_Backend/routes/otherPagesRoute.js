
import  homePage  from "../controllers/homeController.js";
import express from 'express';

const router = express.Router();

router.get('/latest-episodes', async (req, res) => {
  try {
    const { latestEpisodeAnimes } = await homePage();
    
    res.json(  { latestEpisodeAnimes });
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
router.get('/top-airing', async (req, res) => {
  try {
    const { topAiringAnimes } = await homePage();
    
    res.json(  { topAiringAnimes });
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
router.get('/top-upcoming', async (req, res) => {
  try {
    const { topUpcomingAnimes } = await homePage();
    
    res.json(  { topUpcomingAnimes });
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
router.get('/trending', async (req, res) => {
  try {
    const { trendingAnimes } = await homePage();
    
    res.json(  { trendingAnimes });
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
 

export default router;
