import { Request, Response, NextFunction } from 'express';
import { getPokemonsByPlayer } from "../domain/service/getPokemonsByPlayer";
import { saveUserPokemon } from "../domain/service/saveUserPokemon";
import { TypedRequestBody } from "./TypedRequestBody";
import { PlayerPokemon } from "../domain/model/PlayerPokemon";
import { fromStats } from "../domain/model/IndividualValues";

export const getAllPokemonForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const pokemons = await getPokemonsByPlayer(userId);
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
};

export const savePokemonForUser = async (
  req: TypedRequestBody<Omit<PlayerPokemon, 'id' | 'playerId' | 'createdAt' | 'updatedAt'>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const body = req.body;
    const playerPokemon = {
      ...body,
      playerId: userId,
      iv: body.iv.attack && body.iv.defense && body.iv.hp ? fromStats(body.iv.attack, body.iv.defense, body.iv.hp) : body.iv,
      dateOfCapture: body.dateOfCapture ? new Date(body.dateOfCapture) : undefined,
    }
    const pokemon = await saveUserPokemon(userId, playerPokemon);
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
};