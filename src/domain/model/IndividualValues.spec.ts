import { IndividualValues } from "./IndividualValues";

describe('IndividualValues works correctly', () => {
  it('it should validate entered stats', async () => {
    expect(() => new IndividualValues(1, undefined, undefined, undefined)).not.toThrow();
    expect(() => new IndividualValues(undefined, 1, 1, 2)).not.toThrow();
    expect(() => new IndividualValues(9, 1, 1, 2)).not.toThrow();
    expect(() => new IndividualValues(10, 1, 1, 2)).toThrow();
    expect(() => new IndividualValues(undefined, undefined, undefined, undefined)).toThrow();
    expect(() => new IndividualValues(undefined, undefined, 1, 2)).toThrow();
    expect(() => new IndividualValues(undefined, 1, undefined, 2)).toThrow();
    expect(() => new IndividualValues(undefined, 1, 1, undefined)).toThrow();
  });
});