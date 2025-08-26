import { exportedForTesting } from "./savePlayerPokemon";
import { fromStats } from "../model/IndividualValues";
import {Gender} from "../model/Pokemon";

describe('saveUserPokemon works correctly', () => {
  describe('doPokemonMatch', () => {
    test.each([
      // [ // Identical
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), dateOfCapture: new Date('2023-01-01'), active: true},
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), dateOfCapture: new Date('2023-01-01'), active: true},
      //   true
      // ],
      [ // Base has one more property
        {
          dexId: 1,
          iv: { avgIV: 33, attack: 5, defense: 5, hp: 5 },
          dateOfCapture: new Date("2025-08-05T00:00:00.000Z"),
          gender: Gender.Neutral,
          weight: 1.1,
          height: 1.1,
          playerId: 1,
          active: true
      },
        {
          id: 5,
          dexId: 1,
          playerId: 1,
          active: true,
          iv: { avgIV: 33, attack: 5, defense: 5, hp: 5 },
          gender: Gender.Neutral,
          weight: 1.1,
          height: undefined,
          dateOfCapture: new Date("2025-08-05T00:00:00.000Z"),
          createdAt: new Date("2025-08-24T12:36:01.836Z"),
          updatedAt: new Date("2025-08-24T12:36:01.836Z")
  },
          true
      ]
      // [ // Base has one more property
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0, active: true},
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), active: true},
      //   true
      // ],
      // [ // Compare has one more property
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), active: true},
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0, active: true},
      //   true
      // ],
      // [ // Non-matching properties
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 2.0, active: true},
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0, active: true},
      //   false
      // ],
      // [ // Non-matching date properties
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0, dateOfCapture: new Date('2025-08-20'), active: true},
      //   {dexId: 1, playerId: 1, iv: fromStats(15, 15, 15), weight: 1.0, dateOfCapture: new Date('2025-08-21'), active: true},
      //   false
      // ]
    ]) ('test', (basePokemon, comparePokemon, expected) => {
      expect(exportedForTesting.doPokemonMatch(basePokemon, comparePokemon)).toBe(expected);
    });
  });
});