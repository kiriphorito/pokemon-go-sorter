import pokedex from '../../../data/pokemon.json';
import { Pokemon, fromPvPokePokemon } from '../model/Pokemon';

export function searchPokemon(search: string, isShadow?: boolean): Pokemon[] {
  if (!search) {
    throw new Error("Search term is blank!")
  }

  const pokemons: Pokemon[] = fromPvPokePokemon(pokedex);
  return pokemons.filter(
    (pokemon) => {
      const isMatchingPrefix = pokemon.speciesName.toLowerCase().substring(0, search.length).includes(search.toLowerCase());
      return isMatchingPrefix;
    }
  );
}