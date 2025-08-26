import { PlayerPokemon, COMPARABLE_KEYS } from "../model/PlayerPokemon";
import {
  findByPlayerIdAndDexIds, save
} from "../../infrastructure/persistance/JdbcPlayerPokemonRepository";
import isEqual from 'lodash/isEqual';
import { findPlayerById } from "../../infrastructure/persistance/JdbcPlayerRepository";

export const savePlayerPokemon = async (playerId: number, playerPokemon: PlayerPokemon): Promise<PlayerPokemon> => {
  const player = await findPlayerById(playerId)
  if (!player) {
    throw new Error(`Player with ID ${playerId} not found`);
  }

  const isPokemonAlreadyStored = await doesPlayerAlreadyHavePokemon(playerId, playerPokemon);
  if (isPokemonAlreadyStored) {
    throw new Error(`Player already has this Pokemon`);
  }

  return save(playerPokemon);
}

const doesPlayerAlreadyHavePokemon = async (playerId: number, playerPokemon: PlayerPokemon): Promise<boolean> => {
  const playerPokemons = await findByPlayerIdAndDexIds(playerId, [playerPokemon.dexId]);
  const matchingPokemon = playerPokemons.filter((pmon) => doPokemonMatch(playerPokemon, pmon));
  return matchingPokemon.length > 0;
}

const doPokemonMatch = (basePokemon: PlayerPokemon, comparePokemon: PlayerPokemon): boolean => {
  for (const property of COMPARABLE_KEYS) {
    if (basePokemon.hasOwnProperty(property) && comparePokemon.hasOwnProperty(property)
      && (basePokemon[property] !== undefined && comparePokemon[property] !== undefined)
    ) {
      if (property === 'iv') {
        if (basePokemon.iv.attack && basePokemon.iv.defense && basePokemon.iv.hp &&
        comparePokemon.iv.attack && comparePokemon.iv.defense && comparePokemon.iv.hp
        ) {
          if (!isEqual(basePokemon[property], comparePokemon[property])) {
            return false;
          }
        } else if (basePokemon.iv.avgIV !== comparePokemon.iv.avgIV) {
          return false;
        }
      } else if (
        basePokemon[property] instanceof Date &&
        comparePokemon[property] instanceof Date
      ) {
        if (basePokemon[property].getTime() !== comparePokemon[property].getTime()) {
          return false;
        }
      } else if (basePokemon[property] !== comparePokemon[property]) {
        return false;
      }
    }
  }
  return true;
}

export const exportedForTesting = { doPokemonMatch };