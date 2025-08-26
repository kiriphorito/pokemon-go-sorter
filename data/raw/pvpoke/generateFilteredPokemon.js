const pokedex = require("./pokemon.json");
const fs = require('fs');

const filteredPokedex = [];
for (const pokemon of pokedex) {
  if (pokemon.aliasId) {
    continue;
  }
  filteredPokedex.push(pokemon);
}

const jsonString = JSON.stringify(filteredPokedex);
const path = `${__dirname}/filtered-pokemon.json`;
fs.unlink(path, (err) => {
  if (err) {
    throw err;
  }
  console.log('File deleted successfully!');
});
fs.writeFile(path, jsonString, (err) => {
  if (err) {
    throw err;
  }
  console.log('File written successfully!');
});