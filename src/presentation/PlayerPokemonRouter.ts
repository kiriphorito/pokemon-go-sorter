import { Router } from 'express';
import { deletePokemonForPlayer, getAllPokemonForPlayer, savePokemonForPlayer } from "./PlayerPokemonController";

const router: Router = Router();
router.get('/player/:playerId/pokemon', getAllPokemonForPlayer);
router.post('/player/:playerId/pokemon', savePokemonForPlayer);
router.delete('/player/:playerId/pokemon/:playerPokemonId', deletePokemonForPlayer);

export default router;