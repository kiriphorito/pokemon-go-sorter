import pvpoke from "./raw/pvpoke/output/pokemon.json" with { type: "json" };
import pokemonDb from "./raw/pokemondb/output/pokemon-forms.json" with { type: "json" };
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('The directory path is:', __dirname);

const pvpokeToPokemonDbMapper = {
  "pikachu_5th_anniversary": "pikachu",
  "pikachu_flying": "pikachu",
  "pikachu_horizons": "pikachu",
  "pikachu_kariyushi": "pikachu",
  "pikachu_libre": "pikachu",
  "pikachu_pop_star": "pikachu",
  "pikachu_rock_star": "pikachu",
  "pikachu_shaymin": "pikachu",
  "nidoran_female": "nidoran-f",
  "nidoran_male": "nidoran-m",
  "tauros_aqua": "tauros-paldean-aqua",
  "tauros_blaze": "tauros-paldean-blaze",
  "tauros_combat": "tauros-paldean-combat",
  "mewtwo_armored": "mewtwo",
  "deoxys": "deoxys-normal",
  "cherrim_overcast": "cherrim",
  "cherrim_sunny": "cherrim",
  "arceus_bug": "arceus",
  "arceus_dark": "arceus",
  "arceus_dragon": "arceus",
  "arceus_electric": "arceus",
  "arceus_fairy": "arceus",
  "arceus_fighting": "arceus",
  "arceus_fire": "arceus",
  "arceus_flying": "arceus",
  "arceus_ghost": "arceus",
  "arceus_grass": "arceus",
  "arceus_ground": "arceus",
  "arceus_ice": "arceus",
  "arceus_poison": "arceus",
  "arceus_psychic": "arceus",
  "arceus_rock": "arceus",
  "arceus_steel": "arceus",
  "arceus_water": "arceus",
  "basculin": "basculin-red-striped",
  "genesect": "genesect",
  "genesect_burn": "genesect",
  "genesect_chill": "genesect",
  "genesect_douse": "genesect",
  "genesect_shock": "genesect",
  "meowstic": "meowstic-male",
  "zygarde": "zygarde-50",
  "hoopa": "hoopa-confined",
  "wishiwashi": "wishiwashi-solo", // TODO: Needs review when it comes out
  "silvally_bug": "silvally", // TODO: Needs review when it comes out
  "silvally_dark": "silvally", // TODO: Needs review when it comes out
  "silvally_dragon": "silvally", // TODO: Needs review when it comes out
  "silvally_electric": "silvally", // TODO: Needs review when it comes out
  "silvally_fairy": "silvally", // TODO: Needs review when it comes out
  "silvally_fighting": "silvally", // TODO: Needs review when it comes out
  "silvally_fire": "silvally", // TODO: Needs review when it comes out
  "silvally_flying": "silvally", // TODO: Needs review when it comes out
  "silvally_ghost": "silvally", // TODO: Needs review when it comes out
  "silvally_grass": "silvally", // TODO: Needs review when it comes out
  "silvally_ground": "silvally", // TODO: Needs review when it comes out
  "silvally_ice": "silvally", // TODO: Needs review when it comes out
  "silvally_poison": "silvally", // TODO: Needs review when it comes out
  "silvally_psychic": "silvally", // TODO: Needs review when it comes out
  "silvally_rock": "silvally", // TODO: Needs review when it comes out
  "silvally_steel": "silvally", // TODO: Needs review when it comes out
  "silvally_water": "silvally", // TODO: Needs review when it comes out
  "toxtricity": "toxtricity_amped",
  "eiscue": "eiscue-ice",
  "indeedee": "indeedee-male",
  "zacian_crowned_sword": "zacian-crowned",
  "zamazenta_crowned_shield": "zamazenta-crowned",
  "oinkologne": "oinkologne-male",
  "maushold": "maushold-family3",
  "maushold_family_of_four": "maushold-family4",
  "maushold_family_of_three": "maushold-family3",
  "squawkabilly": "squawkabilly-green",
  "palafin": "palafin-zero",
  "dudunsparce": "dudunsparce-two-segment",
  "dudunsparce_three": "dudunsparce-three-segment",
  "dudunsparce_two": "dudunsparce-two-segment",
  "greattusk": "great-tusk",
  "screamtail": "scream-tail",
  "brutebonnet": "brute-bonnet",
  "fluttermane": "flutter-mane",
  "slitherwing": "slither-wing",
  "sandyshocks": "sandy-shocks",
  "irontreads": "iron-treads",
  "ironbundle": "iron-bundle",
  "ironhands": "iron-hands",
  "ironjugulis": "iron-jugulis",
  "ironmoth": "iron-moth",
  "ironthorns": "iron-thorns",
  "gimmighoul": "gimmighoul-roaming",
  "roaringmoon": "roaring-moon",
  "ironvaliant": "iron-valiant",
  "koraidon_apex": "koraidon",
  "miraidon_ultimate": "miraidon"
}

const getGenders = (pvpokeSpeciesId) => {
  const speciesId = pvpokeSpeciesId.replaceAll(/_shadow.*/g, "");
  const pokemon = pokemonDb[(pvpokeToPokemonDbMapper[speciesId] ?? speciesId)
    .replaceAll('_', '-')];
  const gender = pokemon["gender"];
  if (gender === 'genderless') {
    return ["NEUTRAL"];
  } else if (gender === 0) {
    return ["MALE"]
  } else if (/:0/.test(gender)) {
    return ["FEMALE"]
  }
  return ["MALE", "FEMALE"]
}

const pvpokeDex = pvpoke;

const customDex = []
pvpokeDex.forEach((pokemon) => {
  const genders = getGenders(pokemon.speciesId);
  const customPokemon = {
    dex: pokemon.dex,
    speciesName: pokemon.speciesName,
    speciesId: pokemon.speciesId,
    baseStats: pokemon.baseStats,
    family: pokemon.family,
    genders: genders,
  };
  customDex.push(customPokemon);
});

const jsonString = JSON.stringify(customDex, null, 2);
const filePath = `${__dirname}/processed/pokemon.json`;
await fs.unlink(filePath);
console.log('File deleted successfully!');
await fs.writeFile(filePath, jsonString);
console.log('File written successfully!');

