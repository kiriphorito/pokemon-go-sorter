import { PlayerPokemon } from "./PlayerPokemon";

export interface PlayerPokemonRepository {
  getAll(userId: number): Promise<PlayerPokemon[]>;
  getAllByDexIds(userId: number, dexIds: number[]): Promise<PlayerPokemon[]>;
  save(playerPokemon: PlayerPokemon): Promise<void>;
}