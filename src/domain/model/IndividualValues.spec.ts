import * as IndividualValues from "./IndividualValues";

describe('IndividualValues', () => {
  it('fromStats should create correct object', async () => {
    expect(IndividualValues.fromStats(1, 2, 3)).toEqual({
      avgIV: 13,
      attack: 1,
      defense: 2,
      hp: 3,
    })
  });

  it('fromAverageIV should create correct object', async () => {
    expect(IndividualValues.fromAverageIV(98)).toEqual({
      avgIV: 98,
      attack: undefined,
      defense: undefined,
      hp: undefined,
    })
  });
});