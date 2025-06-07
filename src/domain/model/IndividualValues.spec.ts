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
});