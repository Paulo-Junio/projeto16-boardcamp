import { Router } from "express";
import { DeleteRent, GetRents, PostRents, RentReturn } from "../controllers/rentsControllers.js";
import { DeleteRentValidation, RentsReturnValidation, RentsValidation } from "../middlewares/rentsMiddlewares.js";

const router = Router();

router.get('/rentals', GetRents);
router.post('/rentals', RentsValidation, PostRents);
router.post('/rentals/:id/return',RentsReturnValidation, RentReturn);
router.delete('/rentals/:id', DeleteRentValidation, DeleteRent);

export default router;