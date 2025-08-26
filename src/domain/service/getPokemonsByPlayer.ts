import { PlayerPokemon } from "../model/PlayerPokemon";
import {
  findByPlayerIdAndDexIds,
  findPokemonByPlayerId
} from "../../infrastructure/persistance/JdbcPlayerPokemonRepository";
import { findPlayerById } from "../../infrastructure/persistance/JdbcPlayerRepository";

export const getPokemonsByPlayer = async (playerId: number): Promise<PlayerPokemon[]> => {
  const player = await findPlayerById(playerId);
  if (!player) {
    throw new Error(`Player with ID ${playerId} not found`);
  }

  return await findPokemonByPlayerId(playerId);
}

export const getPlayersPokemonsByDexIds = async (playerId: number, dexIds: number[]): Promise<PlayerPokemon[]> => {
  const player = await findPlayerById(playerId);
  if (!player) {
    throw new Error(`Player with ID ${playerId} not found`);
  }

  return await findByPlayerIdAndDexIds(playerId, dexIds);
}