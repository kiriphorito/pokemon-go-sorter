import { PlayerPokemon } from "../../model/PlayerPokemon";
import { Pokemon } from "../../model/Pokemon";
import { getRelatedPokemonByPokemonFamilyId } from '../getRelatedPokemonByFamilyId';

export function haveEnoughAbove80IV(pokemon: Pokemon, playerPokemons: PlayerPokemon[]): boolean {
  const isPokemonAShadow: boolean = pokemon.speciesId.includes('shadow');

  const relatedPokemon: Pokemon[] = getRelatedPokemonByPokemonFamilyId(pokemon);
  const filteredPokemon: Pokemon[] = relatedPokemon.filter((pmon) => {
    return (isPokemonAShadow && pmon.speciesId.includes('shadow')) 
      || (!isPokemonAShadow && !pmon.speciesId.includes('shadow')) 
  });

  const numberOfPokemonInFamily = filteredPokemon.length;

  const dexIds = filteredPokemon.map((pmon) => {
    return pmon.dex;
  })

  const filteredPlayerPokemon = playerPokemons.filter((pmon) => {
    return dexIds.includes(pmon.dexId)
      && pmon.avgIV > 80;
  });

  return filteredPlayerPokemon.length > numberOfPokemonInFamily;
}