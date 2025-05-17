import { exportedForTesting } from "./saveUserPokemon";
import { fromStats } from "../model/IndividualValues";

describe('saveUserPokemon works correctly', () => {
  describe('doPokemonMatch', () => {
    test.each([
      [ // Identical
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), dateOfCapture: new Date('2023-01-01')},
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), dateOfCapture: new Date('2023-01-01')},
        true
      ],
      [ // Base has one more property
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0},
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15)},
        true
      ],
      [ // Compare has one more property
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15)},
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0},
        true
      ],
      [ // Non-matching properties
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 2.0},
        {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0},
        false
      ]
    ]) ('test', (basePokemon, comparePokemon, expected) => {
      expect(exportedForTesting.doPokemonMatch(basePokemon, comparePokemon)).toBe(expected);
    });
  });
});