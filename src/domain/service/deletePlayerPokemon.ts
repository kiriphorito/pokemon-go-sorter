import { PlayerPokemon, markInactive } from "../model/PlayerPokemon";
import {
  findPlayerPokemonById, save
} from "../../infrastructure/persistance/JdbcPlayerPokemonRepository";

export const deletePlayerPokemon = async (playerPokemonId: number): Promise<PlayerPokemon> => {
  const playerPokemon: PlayerPokemon = await findPlayerPokemonById(playerPokemonId);
  markInactive(playerPokemon);
  return save(playerPokemon);
}