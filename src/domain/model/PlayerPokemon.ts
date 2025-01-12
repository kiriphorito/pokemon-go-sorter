import { Gender } from "./Pokemon";
import { IndividualValues } from "./IndividualValues";

export class PlayerPokemon {
  dexId: number;
  gender: Gender;
  iv?: IndividualValues;

  constructor(dexId: number, gender: Gender, iv?: IndividualValues) {
    this.dexId = dexId;
    this.gender = gender;
    this.iv =iv;
  }
}