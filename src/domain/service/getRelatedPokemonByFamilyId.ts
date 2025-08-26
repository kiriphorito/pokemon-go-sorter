import { Pokemon, fromPvPokePokemon } from '../model/Pokemon';
import pokedex from '../../../data/raw/pvpoke/filtered-pokemon.json';

export function getRelatedPokemonByPokemonFamilyId(pokemon: Pokemon): Pokemon[] {
  if (!pokemon.family) {
    return [pokemon];
  }
  
  return getRelatedPokemonByFamilyId(pokemon.family.id);
}

export function getRelatedPokemonByFamilyId(familyId: string): Pokemon[] {
  const pokemons: Pokemon[] = fromPvPokePokemon(pokedex);
  return pokemons.filter((pmon) => { 
    return pmon.family?.id === familyId;
  });
}