import { Gender } from "./Pokemon";

export class PlayerPokemon {
  dexId: number;
  gender: Gender;
  avgIV: number;

  constructor(dexId: number, gender: Gender, avgIV: number) {
    this.dexId = dexId;
    this.gender = gender;
    this.avgIV = avgIV;
  }

}