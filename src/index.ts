import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

import pokedex from '../data/pokemon.json';
import { Pokemon, fromPvPokePokemon } from './domain/model/Pokemon';
import { searchPokemon } from './domain/service/searchPokemon';
import { haveEnoughAbove80IV } from './domain/service/rules/haveEnoughAbove80IV';
import { KiriphoritoPlayerPokemon } from './infrastructure/KiriphoritoPlayerPokemon';
import { LeagueOrder } from "./domain/model/LeagueRanking";
import { getAllRankingsForPokemon } from "./domain/service/getRankingsForPokemon";
import { validatePokemonsHasAllOfNothingFamilyIdAndConsistent } from "./domain/service/validation/validatePokemonsHasAllOfNothingFamilyIdAndConsistent";
import { isOfHighEnoughRankAcrossFamily } from "./domain/service/rules/isOfHighEnoughRankAcrossFamily";
import { getAverageIVFromStats, getAverageIVFromHexStats } from "./domain/service/getAverageIVFromStats";
import playerPokemonRouter from "./presentation/PlayerPokemonRouter";




import knexInstance from "./db/index";
import {findPokemonByUserId} from "./infrastructure/persistance/JdbcPlayerPokemonRepository";

const app: Express = express();
app.use(express.json())

const port = process.env.PORT || 3000;

const knex = knexInstance;
knex.migrate.latest()

app.use(playerPokemonRouter)

app.get("/test", async (req, res) => {
  findPokemonByUserId(2).then((result) => {
    console.log(result);
    res.send(result);
  }).catch((error) => {
    console.error(error);
    res.status(500).send("Error retrieving data");
  });
})

app.get("/", (req: Request, res: Response) => {
  res.send(pokedex[0]);
});

app.get("/iv/average", async (req: Request, res: Response) => {
  const attackStat = req.query.attack as string;
  const defenseStat = req.query.defense as string;
  const hpStat = req.query.hp as string;
  const hexStats = req.query.hex as string;
  if (!(!!hexStats !== (!!attackStat && !!defenseStat && !!hpStat))) {
    throw new Error("You need to provide all attack, defense and hp stats!")
  }
  res.send({
    attack: attackStat,
    defense: defenseStat,
    hp: hpStat,
    avgIV: hexStats 
      ? getAverageIVFromHexStats(hexStats)
      : getAverageIVFromStats(Number(attackStat), Number(defenseStat), Number(hpStat)),
  });
})

app.get("/pvp", async (req: Request, res: Response) => {
  const pokemonRanking = await searchPvp(req.query.search as string);
  const rankingMinimum = !process.env.RANKING_MINIMUM ? 150 : Number(process.env.RANKING_MINIMUM);
  const filteredPokemonRanking = pokemonRanking.filter((rank) => rank.speciesRank < rankingMinimum);
  const responseRanking = pokemonRanking.map((ranking) => {
    return {
      league: ranking.league,
      speciesRank: ranking.speciesRank,
      speciesName: ranking.pokemon.speciesName
    }
  }).sort((a, b) => (LeagueOrder[a.league] || 0) - (LeagueOrder[b.league] || 0) || a.speciesRank - b.speciesRank)
  if (filteredPokemonRanking.length == 0) {
    res.send(
      { 
        delete: true,
        rankings: responseRanking
      }
    );
  } else {
    res.send(
      { 
        delete: false,
        rankings: responseRanking
      });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const searchPvp = async (nameSearch: string) => {
  const searchedPokemon: Pokemon[] = searchPokemon(nameSearch);
  console.log(searchedPokemon);

  if (searchedPokemon.length == 0) {
    throw new TypeError(`Cannot find the any Pokemon with the following search term: ${nameSearch}`);
  }

  validatePokemonsHasAllOfNothingFamilyIdAndConsistent(searchedPokemon);

  return isOfHighEnoughRankAcrossFamily(searchedPokemon)
} 