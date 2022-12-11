import { Router } from "express";

const router = Router();

router.get('/rentals');
router.post('/rentals');
router.post('/rentals/:id/return');
router.delete('/rentals/:id');

export default router;