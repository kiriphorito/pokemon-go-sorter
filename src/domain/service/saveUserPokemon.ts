import { PlayerPokemon, COMPARABLE_KEYS } from "../model/PlayerPokemon";
import { findUserById } from "../../infrastructure/persistance/JdbcUserRepository";
import {
  findByPlayerIdAndDexIds, save
} from "../../infrastructure/persistance/JdbcPlayerPokemonRepository";
import isEqual from 'lodash/isEqual';

export const saveUserPokemon = async (userId: number, playerPokemon: PlayerPokemon): Promise<PlayerPokemon> => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const isPokemonAlreadyStored = await doesUserAlreadyHavePokemon(userId, playerPokemon);
  if (isPokemonAlreadyStored) {
    throw new Error(`User already has this Pokemon`);
  }

  return save(playerPokemon);
}

const doesUserAlreadyHavePokemon = async (userId: number, playerPokemon: PlayerPokemon): Promise<boolean> => {
  const playerPokemons = await findByPlayerIdAndDexIds(userId, [playerPokemon.dexId]);
  const matchingPokemon = playerPokemons.filter((pmon) => doPokemonMatch(playerPokemon, pmon));
  return matchingPokemon.length > 0;
}

const doPokemonMatch = (basePokemon: PlayerPokemon, comparePokemon: PlayerPokemon): boolean => {
  for (const property of COMPARABLE_KEYS) {
    if (basePokemon.hasOwnProperty(property) && comparePokemon.hasOwnProperty(property)) {
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
      } else if (basePokemon[property] !== comparePokemon[property]
          && basePokemon[property]?.toString() !== comparePokemon[property]?.toString()
      ) {
        return false;
      }
    }
  }
  return true;
}

export const exportedForTesting = { doPokemonMatch };