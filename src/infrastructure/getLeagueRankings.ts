import { League } from "../domain/model/LeagueRanking";
import greatLeagueOverallRankings from "../../data/raw/pvpoke/great-overall-league.json";
import ultraLeagueOverallRankings from "../../data/raw/pvpoke/ultra-overall-league.json";

export function getLeagueRankings(league: League): any[] {
  switch(league) {
    case League.Great:
      return greatLeagueOverallRankings;
    case League.Ultra:
      return ultraLeagueOverallRankings;
    default:
      throw new Error(`${league} is unknown or isn't support yet`);
  }
}