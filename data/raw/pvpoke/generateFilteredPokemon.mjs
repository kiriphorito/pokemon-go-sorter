import pokedex  from "./pokemon.json" with { type: "json" };
import fs from 'fs/promises';
import { fileURLToPath } from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('The directory path is:', __dirname);

const filteredPokedex = [];
for (const pokemon of pokedex) {
  if (pokemon.aliasId) {
    continue;
  } else if (pokemon.tags?.includes("duplicate")) {
    continue;
  }
  filteredPokedex.push(pokemon);
}

const jsonString = JSON.stringify(filteredPokedex, null, 2);
const filePath = `${__dirname}/output/pokemon.json`;
await fs.unlink(filePath);
console.log('File deleted successfully!');
await fs.writeFile(filePath, jsonString);
console.log('File written successfully!');