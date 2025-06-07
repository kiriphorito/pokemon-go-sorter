import { PlayerPokemon } from "../model/PlayerPokemon";
import { findPokemonByUserId, findByPlayerIdAndDexIds } from "../../infrastructure/persistance/JdbcPlayerPokemonRepository";
import { findUserById } from "../../infrastructure/persistance/JdbcUserRepository";

export const getPokemonsByPlayer = async (userId: number): Promise<PlayerPokemon[]> => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return await findPokemonByUserId(userId);
}

export const getPlayersPokemonsByDexIds = async (userId: number, dexIds: number[]): Promise<PlayerPokemon[]> => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return await findByPlayerIdAndDexIds(userId, dexIds);
}