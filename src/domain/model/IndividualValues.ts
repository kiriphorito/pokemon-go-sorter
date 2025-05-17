import { getAverageIVFromStats } from "../service/getAverageIVFromStats";

export interface IndividualValues {
  avgIV: number;
  attack: number;
  defense: number;
  hp: number;
}

export function fromStats(
  attack: number,
  defense: number,
  hp: number,
): IndividualValues {
  return {
    avgIV: getAverageIVFromStats(attack, defense, hp),
    attack,
    defense,
    hp,
  };
}
