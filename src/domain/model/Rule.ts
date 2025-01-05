import { Pokemon } from "./Pokemon";

interface Rule {
    (pokemon: Pokemon): boolean;
}