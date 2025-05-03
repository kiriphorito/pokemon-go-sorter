import { getAverageIVFromHexStats, getAverageIVFromStats } from "./getAverageIVFromStats";

describe('getAverageIVFromStats works correctly', () => {
  test.each([
    [15, 15, 15, 100], 
    [14, 15, 15, 98],
    [15, 15, 14, 98],
    [13, 15, 15, 96],
    [12, 15, 15, 93],
    [11, 15, 15, 91],
    [10, 15, 15, 89],
  ])(
    'getAverageIVFromStats should calculate average IV from attack: %i, defense: %i and hp %i to equal %i',
    (attack, defense, hp, expected) => {
      expect(getAverageIVFromStats(attack, defense, hp)).toBe(expected);
    }
  );

  test.each([
    ["FFF", 100], 
    ["EFF", 98],
    ["FFE", 98],
    ["DFF", 96],
    ["CFF", 93],
    ["BFF", 91],
    ["AFF", 89],
  ])(
    'getAverageIVFromHexStats should calculate average IV from from hex %s to equal %i',
    (hexStats, expected) => {
      expect(getAverageIVFromHexStats(hexStats)).toBe(expected);
    }
  );
});