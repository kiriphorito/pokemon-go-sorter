import { Router } from 'express';
import { getAllPokemonForUser, savePokemonForUser } from "./PlayerPokemonController";

const router: Router = Router();
router.get('/user/:userId/pokemon', getAllPokemonForUser);
router.post('/user/:userId/pokemon', savePokemonForUser);

export default router;