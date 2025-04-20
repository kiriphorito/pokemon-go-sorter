import { PlayerPokemon } from "../domain/model/PlayerPokemon";
import { Gender } from "../domain/model/Pokemon";
import * as IndividualValues from "../domain/model/IndividualValues";

export const KiriphoritoPlayerPokemon: PlayerPokemon[] = [
    new PlayerPokemon(46, Gender.Male, IndividualValues.fromAverageIV(93)),
    new PlayerPokemon(46, Gender.Female, IndividualValues.fromAverageIV(80)),
    new PlayerPokemon(46, Gender.Male,  IndividualValues.fromAverageIV(80))
]