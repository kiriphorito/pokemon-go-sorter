#!/bin/bash

wget -O ./data/raw/pvpoke/pokemon.json --wait 10 --random-wait --continue 'https://raw.githubusercontent.com/pvpoke/pvpoke/refs/heads/master/src/data/gamemaster/pokemon.json'
wget -O ./data/raw/pvpoke/great-overall-league.json --wait 10 --random-wait --continue 'https://raw.githubusercontent.com/pvpoke/pvpoke/refs/heads/master/src/data/rankings/all/overall/rankings-1500.json'
wget -O ./data/raw/pvpoke/ultra-overall-league.json --wait 10 --random-wait --continue 'https://raw.githubusercontent.com/pvpoke/pvpoke/refs/heads/master/src/data/rankings/all/overall/rankings-2500.json'