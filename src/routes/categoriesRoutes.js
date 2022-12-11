import { Router } from "express";

import { GetCategories, PostCategories } from "../controllers/categoriesControllers.js";
import { CategoreisValidation } from "../middlewares/categoriesMiddleware.js";

const router = Router();

router.get('/categories', GetCategories);
router.post('/categories', CategoreisValidation, PostCategories);

export default router;