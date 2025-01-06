import { PlayerPokemon } from "../domain/model/PlayerPokemon";
import { Gender } from "../domain/model/Pokemon";
import { IndividualValues } from "../domain/model/IndividualValues";

export const KiriphoritoPlayerPokemon: PlayerPokemon[] = [
    new PlayerPokemon(46, Gender.Male, new IndividualValues(93)),
    new PlayerPokemon(46, Gender.Female, new IndividualValues(80)),
    new PlayerPokemon(46, Gender.Male,  new IndividualValues(80))
]