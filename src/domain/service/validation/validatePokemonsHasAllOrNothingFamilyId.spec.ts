
import { aPokemon } from '../../../test/pokemonFixtures';
import { Pokemon, Family } from '../../model/Pokemon';
import { validatePokemonsHasAllOfNothingFamilyIdAndConsistent as unit } from './validatePokemonsHasAllOfNothingFamilyIdAndConsistent';

describe('Correctly validatePokemonsHasAllOfNothingFamilyIdAndConsistent', () => {
  const FAMILY_A: Family = new Family('family_a', [])
  const FAMILY_B: Family = new Family('family_b', [])
  const POKEMON_WITH_FAMILY_A_1: Pokemon = aPokemon({ dex: 10, family: FAMILY_A });
  const POKEMON_WITH_FAMILY_A_2: Pokemon = aPokemon({ dex: 11, family: FAMILY_A });
  const POKEMON_WITH_FAMILY_B: Pokemon = aPokemon({ dex: 11, family: FAMILY_B });

  const POKEMON_WITHOUT_FAMILY: Pokemon = aPokemon({ family: undefined });

  const PREFIX_NAME = "Flake";
  const POKEMON_WITH_PREFIX_1 = aPokemon({ speciesName: `${PREFIX_NAME} Dusk` });
  const POKEMON_WITH_PREFIX_2 = aPokemon({ speciesName: `${PREFIX_NAME} Dawn` });
  const POKEMON_WITH_DIFFERENT_PREFIX = aPokemon({ speciesName: "Hello" });

  it('it should validate with same family', async () => {
    const pokemons = [POKEMON_WITH_FAMILY_A_1, POKEMON_WITH_FAMILY_A_2];
    expect(() => unit(pokemons)).not.toThrow();
  });

  it('it should validate with different families', async () => {
    const pokemons = [POKEMON_WITH_FAMILY_A_1, POKEMON_WITH_FAMILY_A_2, POKEMON_WITH_FAMILY_B];
    expect(() => unit(pokemons)).toThrow();
  });

  it('it should validate with mix of families and no familes', async () => {
    const pokemons = [POKEMON_WITH_FAMILY_A_1, POKEMON_WITH_FAMILY_A_2, POKEMON_WITHOUT_FAMILY];
    expect(() => unit(pokemons)).toThrow();
  });

  it('it should validate with no familes but common prefix', async () => {
    const pokemons = [POKEMON_WITH_PREFIX_1, POKEMON_WITH_PREFIX_2];
    expect(() => unit(pokemons)).not.toThrow();
  });

  it('it should validate with no familes but different prefix', async () => {
    const pokemons = [POKEMON_WITH_PREFIX_1, POKEMON_WITH_PREFIX_2, POKEMON_WITH_DIFFERENT_PREFIX];
    expect(() => unit(pokemons)).toThrow();
  });
});