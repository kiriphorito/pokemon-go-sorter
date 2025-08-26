import { Router } from "express";
import { pokemonLookup } from "./PokemonController";

const router: Router = Router();
router.get('/pokemon', pokemonLookup);

export default router;