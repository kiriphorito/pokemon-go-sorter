import { Request, Response, NextFunction } from 'express';
import { getPokemonsByPlayer } from "../domain/service/getPokemonsByPlayer";
import { TypedRequestBody } from "./TypedRequestBody";
import { PlayerPokemon } from "../domain/model/PlayerPokemon";
import { fromStats } from "../domain/model/IndividualValues";
import { savePlayerPokemon } from "../domain/service/savePlayerPokemon";
import {deletePlayerPokemon} from "../domain/service/deletePlayerPokemon";

export const getAllPokemonForPlayer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const playerId = parseInt(req.params.playerId, 10);
    const pokemons = await getPokemonsByPlayer(playerId);
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
};

export const savePokemonForPlayer = async (
  req: TypedRequestBody<Omit<PlayerPokemon, 'id' | 'playerId' | 'active' | 'createdAt' | 'updatedAt'>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const playerId = parseInt(req.params.playerId, 10);
    const body = req.body;
    const playerPokemon = {
      ...body,
      playerId: playerId,
      active: true,
      iv: body.iv.attack && body.iv.defense && body.iv.hp ? fromStats(body.iv.attack, body.iv.defense, body.iv.hp) : body.iv,
      dateOfCapture: body.dateOfCapture ? new Date(body.dateOfCapture) : undefined,
    }
    const pokemon = await savePlayerPokemon(playerId, playerPokemon);
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
};

export const deletePokemonForPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const playerId = parseInt(req.params.playerId, 10);
    const playerPokemonId = parseInt(req.params.playerPokemonId, 10);
    const pokemon = await deletePlayerPokemon(playerPokemonId);
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
};