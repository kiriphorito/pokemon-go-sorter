import { Gender } from "./Pokemon";
import { IndividualValues } from "./IndividualValues";

export interface PlayerPokemon {
  id?: number;
  dexId: number;
  playerId: number;
  iv: IndividualValues;
  gender?: Gender;
  weight?: number;
  height?: number;
  dateOfCapture?: Date;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

export type PlayerPokemonKey = keyof PlayerPokemon;
export const COMPARABLE_KEYS: PlayerPokemonKey[] = ['dexId', 'playerId', 'iv', 'gender', 'weight', 'height', 'dateOfCapture'];

