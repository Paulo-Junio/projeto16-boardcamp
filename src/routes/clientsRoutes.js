import { Router } from "express";

import { GetClientById, GetClients, PostClient, UpdateClient } from "../controllers/clientsControllers.js";
import { ClientValidation } from "../middlewares/clientsMiddlewares.js";

const router = Router();

router.get('/customers', GetClients);
router.get('/customers/:id', GetClientById);
router.post('/customers', ClientValidation, PostClient);
router.put('/customers/:id', ClientValidation, UpdateClient);

export default router;