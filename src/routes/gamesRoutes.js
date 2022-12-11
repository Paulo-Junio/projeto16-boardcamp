import { Router } from "express";

import { GetGames, PostGames } from "../controllers/gamesControllers.js";
import { GamesValidation } from "../middlewares/gamesMiddlewares.js";

const router = Router();

router.get('/games', GetGames);
router.post('/games', GamesValidation, PostGames);

export default router;