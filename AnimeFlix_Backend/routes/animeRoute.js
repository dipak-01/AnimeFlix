
import  express  from 'express';
import animeInfo from "../controllers/animeInfoController.js";
const router=express.Router();


router.get('/anime/info/:id',animeInfo)   
export default router;