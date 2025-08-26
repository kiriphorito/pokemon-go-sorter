import pokedex from './output/pokemon.json';

describe('pvpoke Data Assumptions test', () => {
  describe("Shadow Pokemon:",  () => {
    it('for all shadow pokemon, there is a non-shadow equivalent', async () => {
      const shadowPokemons = pokedex.filter((entry) => {
        return entry.speciesId.includes("_shadow");
      });

      for (const shadowPokemon of shadowPokemons) {
        const normalPokemon = pokedex.find((entry) => {
          return entry.speciesId === shadowPokemon.speciesId.replace(/_shadow/, "");
        });

        expect(normalPokemon).toBeDefined();
      }
    });

    it('the base stats of a shadow pokemon is the same as non-shadow', async () => {
      const shadowPokemons = pokedex.filter((entry) => {
        return entry.speciesId.includes("_shadow");
      });

      for (const shadowPokemon of shadowPokemons) {
        const normalPokemon = pokedex.find((entry) => {
          return entry.speciesId === shadowPokemon.speciesId.replace(/_shadow/, "");
        });

        expect(normalPokemon?.baseStats).toEqual(shadowPokemon.baseStats);
      }
    });
  })
});