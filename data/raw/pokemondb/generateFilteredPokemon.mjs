import { load } from "js-yaml";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('The directory path is:', __dirname);

const yamlData = await fs.readFile(`${__dirname}/pokemon-forms.yaml`, 'utf8');
// There is an issue with YAML parser
// YAMLException: bad indentation of a mapping entry (31354:12)
//
// 31351 |     gen: 9
// 31352 |     release: scarlet-violet
// 31353 |     type1: grass
// 31354 |     type2: -
// -------------------^
// 31355 |     stats:
// 31356 |         hp: 80
const correctedYamlData = yamlData.replaceAll(/type2: -/g, "type2: ")

const jsonData = load(correctedYamlData, {});

const jsonString = JSON.stringify(jsonData, null, 2);
const filePath = `${__dirname}/output/pokemon-forms.json`;
await fs.unlink(filePath);
console.log('File deleted successfully!');
await fs.writeFile(filePath, jsonString);
console.log('File written successfully!');
