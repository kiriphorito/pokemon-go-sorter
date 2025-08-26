import {PlayerPokemon} from "../domain/model/PlayerPokemon";
import {Gender} from "../domain/model/Pokemon";
import * as IndividualValues from "../domain/model/IndividualValues";

export const KiriphoritoPlayerPokemon: PlayerPokemon[] = [
  {
    dexId: 46,
    playerId: 1,
    active: true,
    gender: Gender.Male,
    iv: IndividualValues.fromStats(15, 15, 13)
  },
  {
    dexId: 46,
    playerId: 1,
    active: true,
    gender: Gender.Female,
    iv: IndividualValues.fromStats(12, 12, 12)
  },
  {
    dexId: 46,
    playerId: 1,
    active: true,
    gender: Gender.Male,
    iv: IndividualValues.fromStats(12, 12, 12)
  },
]