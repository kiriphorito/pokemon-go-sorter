import { getAverageIVFromStats } from "../service/getAverageIVFromStats";

export class IndividualValues {
  avgIV: number;
  attack?: number;
  defense?: number;
  hp?: number;
  
  constructor(avgIV?: number, attack?: number, defense?: number, hp?: number) {
    if (!avgIV && (!attack || !defense || !hp)) {
      throw new Error("You must have avgIV, avgIV and all stats or all stats.");
    }

    if (!!avgIV && !!attack && !!defense && !!hp) {
      const calculatedIV = getAverageIVFromStats(attack, defense, hp);
      if (calculatedIV !== avgIV) {
        throw new Error("The stats don't add up?");
      }
    }

    this.attack = attack;
    this.defense = defense;
    this.hp = hp;
    // @ts-ignore
    this.avgIV = !avgIV ? getAverageIVFromStats(attack, defense, hp) : avgIV;
  }
}