import { Pokemon, fromPvPokePokemon } from "../model/Pokemon";
import pokedex from '../../../data/raw/pvpoke/output/pokemon.json';

export function getPokemonByDexId(dexId: number): Pokemon[] {
  const pokemons: Pokemon[] = fromPvPokePokemon(pokedex);
  return pokemons.filter((pmon) => { 
    return pmon.dex === dexId;
  });
}