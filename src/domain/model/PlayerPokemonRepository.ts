import { PlayerPokemon } from "./PlayerPokemon";

export interface PlayerPokemonRepository {
  getAll(playerId: number, isActive: boolean): Promise<PlayerPokemon[]>;
  getAllByDexIds(playerId: number, dexIds: number[], isActive: boolean): Promise<PlayerPokemon[]>;
  save(playerPokemon: PlayerPokemon): Promise<void>;
}