import { PlayerPokemon } from "../../model/PlayerPokemon";
import { Pokemon } from "../../model/Pokemon";
import { getAllRankingsForPokemon } from "../getRankingsForPokemon";
import { getRelatedPokemonByFamilyId } from "../getRelatedPokemonByFamilyId";

export function isOfHighEnoughRankAcrossFamily(pokemons: Pokemon[], playerPokemons?: PlayerPokemon[]) {
  const pokemonFamily = pokemons[0].family?.id;
  const allRelatedPokemon = !!pokemonFamily ? getRelatedPokemonByFamilyId(pokemonFamily) : pokemons;
  const rankings = getAllRankingsForPokemon(allRelatedPokemon);
  return rankings;
}