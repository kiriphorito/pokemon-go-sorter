import {Pokemon, Stats, Family, Gender} from "../domain/model/Pokemon";

type FixtureConfig = {
  dex?: number,
  speciesName?: string,
  genders? : Gender[],
  family?: Family,
}

export function aPokemon(options?: FixtureConfig): Pokemon {
  return new Pokemon(
    options?.dex ? options.dex : 1,
    options?.speciesName ? options.speciesName : 'Pokemon A',
    "pokemon_a",
    options?.genders ?? [Gender.Neutral],
    options?.family
  );
}