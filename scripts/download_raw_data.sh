#!/bin/bash

wget -O ./data/raw/pvpoke/pokemon.json 'https://raw.githubusercontent.com/pvpoke/pvpoke/refs/heads/master/src/data/gamemaster/pokemon.json'
node ./data/raw/pvpoke/generateFilteredPokemon.mjs
wget -O ./data/raw/pvpoke/great-overall-league.json 'https://raw.githubusercontent.com/pvpoke/pvpoke/refs/heads/master/src/data/rankings/all/overall/rankings-1500.json'
wget -O ./data/raw/pvpoke/ultra-overall-league.json 'https://raw.githubusercontent.com/pvpoke/pvpoke/refs/heads/master/src/data/rankings/all/overall/rankings-2500.json'

wget -O ./data/raw/pokemondb/pokemon-forms.yaml 'https://raw.githubusercontent.com/pokemondb/database/refs/heads/master/data/pokemon-forms.yaml'
node ./data/raw/pokemondb/generateFilteredPokemon.mjs

node ./data/generate.mjs