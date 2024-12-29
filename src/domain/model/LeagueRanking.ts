import { Pokemon } from "./Pokemon";

export class LeagueRanking {
  league: League;
  speciesRank: number;
  // percentileRank: number;
  pokemon: Pokemon;
  // playerPokemon: PlayerPokemon;
  
  constructor(league: League, speciesRank: number, pokemon: Pokemon) {
    this.league = league;
    this.speciesRank = speciesRank;
    this.pokemon = pokemon;
  }
}

export enum League {
  Great = "GREAT",
  Ultra = "ULTRA",
  Master = "MASTER"
}

type LeagueOrderMap = { [key in League]?: number };

const LeagueOrder: LeagueOrderMap = {
  [ League.Great ]: 0,
  [ League.Ultra ]: 1,
  [ League.Master ]: 2,
};

export { LeagueOrder };