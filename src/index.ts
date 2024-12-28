import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import pokedex from '../data/pokemon.json';
import greatLeagueOverallRankings from '../data/great-overall-league.json';
import ultraLeagueOverallRankings from '../data/ultra-overall-league.json';
import { Pokemon } from './domain/model/Pokemon';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(pokedex[0]);
});

app.get("/pvp", async (req: Request, res: Response) => {
    const pokemonRanking = await searchPvp(req.query.search as string);
    const rankingMinimum = process.env.RANKING_MINIMUM ? 150 : Number(process.env.RANKING_MINIMUM);
    const filteredPokemonRanking = pokemonRanking.filter((rank) => rank < rankingMinimum);
    if (filteredPokemonRanking.length == 0) {
        res.send({ delete: true });
    } else {
        res.send({ delete: false });
    }
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const searchPvp = async (nameSearch: string) => {
    const filteredPokemon: any[] = pokedex.filter(
        (pokemon) => {
            return pokemon.speciesName.toLowerCase().substring(0, nameSearch.length).includes(nameSearch.toLowerCase());
        }
    );

    if (filteredPokemon.length == 0) {
        throw new TypeError(`Cannot find the any Pokemon with the following search term: ${nameSearch}`);
    }

    const distinctFamily = new Set<string>();
    filteredPokemon.map((pokemon) => {
        if (pokemon.family?.id) {
            distinctFamily.add(pokemon.family.id);
        }
    });

    if (distinctFamily.size > 1) {
        throw new TypeError('Error message');
    }

    const allPokemonInFamily = getAllByFamilyId([...distinctFamily][0]);
    const allPokemonSpeciesId = allPokemonInFamily.map((pokemon) => {
        return pokemon.speciesId;
    });

    const rankings = getAllRankingsForPokemon(allPokemonSpeciesId)
    return rankings;
} 

const getAllByFamilyId = (familyId: string) => {
    return pokedex.filter(
        (pokemon) => {
            // @ts-ignore
            return pokemon.family?.id === familyId;
        }
    );
}

const getAllRankingsForPokemon = (speciesId: string[]) => {
    return [
        ...getRankingsForPokemon(speciesId, greatLeagueOverallRankings),
        ...getRankingsForPokemon(speciesId, ultraLeagueOverallRankings)
    ];
}

const getRankingsForPokemon = (speciesId: string[], rankings: any[]) => {
    const filteredRankings: number[] = [];
    for (const [index, pokemon] of rankings.entries()) {
        if (speciesId.includes(pokemon.speciesId)) {
            filteredRankings.push(index);
        }
    }
    return filteredRankings;
}