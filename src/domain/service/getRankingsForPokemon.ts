import { getLeagueRankings } from "../../infrastructure/getLeagueRankings";
import { League, LeagueRanking } from "../model/LeagueRanking";

const getAllRankingsForPokemon = (pokemon: any[]) => {
  return [
      ...getRankingsForPokemon(pokemon, League.Great),
      ...getRankingsForPokemon(pokemon, League.Ultra)
  ];
}

const getRankingsForPokemon = (pokemons: any[], league: League): LeagueRanking[] => {
  const leagueRankings = getLeagueRankings(league);

  const allSpeciesId = pokemons.map((pokemon) => { return pokemon.speciesId });

  const filteredRankings: LeagueRanking[] = [];
  for (const [index, rankingEntry] of leagueRankings.entries()) {
    if (allSpeciesId.includes(rankingEntry.speciesId)) {
      const pokemon = pokemons.find((pmon) => { return pmon.speciesId === rankingEntry.speciesId });
      filteredRankings.push(new LeagueRanking(league, index, pokemon));
    }
  }
  return filteredRankings;
}

export { getAllRankingsForPokemon, getRankingsForPokemon };