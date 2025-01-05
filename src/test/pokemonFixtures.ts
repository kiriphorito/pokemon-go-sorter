import { Pokemon, Stats, Family } from "../domain/model/Pokemon";

type FixtureConfig = {
  dex?: number,
  speciesName?: string,
  family?: Family,
}

export function aPokemon(options?: FixtureConfig): Pokemon {
  return new Pokemon(
    options?.dex ? options.dex : 1,
    options?.speciesName ? options.speciesName : 'Pokemon A',
    "pokemon_a",
    new Stats(1, 1, 1),
    [],
    [],
    [],
    [],
    {},
    100,
    3,
    100000,
    true,
    options?.family
  );
}