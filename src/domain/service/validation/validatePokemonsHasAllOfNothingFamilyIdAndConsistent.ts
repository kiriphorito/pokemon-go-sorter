import { Pokemon } from "../../model/Pokemon";

export function validatePokemonsHasAllOfNothingFamilyIdAndConsistent(pokemon: Pokemon[]): void {
  const firstPokemonHaveFamilyId = pokemon[0].family?.id;

  const inconsistentFamilyPokemon = pokemon.find((pmon) => {
    if (!firstPokemonHaveFamilyId && !pmon.family?.id) {
      return false;
    }
    if (!!firstPokemonHaveFamilyId && !!pmon.family?.id && firstPokemonHaveFamilyId === pmon.family.id) {
      return false;
    }
    return true;
  });

  if (inconsistentFamilyPokemon) {
    throw new Error("The seems to be a mix of Pokemon with and without familyId or mix of families!");
  }

  if (firstPokemonHaveFamilyId) {
    return;
  }

  const words = pokemon[0].speciesName.match(/^\w+/);
  if (!words) {
    throw new Error(`Unable to get the first word in the Species Name of ${ pokemon[0].speciesName}`);
  }
  
  const inconsistentSpeciesNamePokemon = pokemon.find((pmon) => {
    return !pmon.speciesName.includes(words[0]);
  });

  if (inconsistentSpeciesNamePokemon) {
    throw new Error("The seems to be a mix of Pokemon without familyId but not a common species prefix!");
  }
}
