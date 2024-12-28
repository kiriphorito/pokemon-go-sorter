export class Pokemon {
    dex!: number;
    speciesName!: string;
    speciesId!: string;
    baseStats!: Stats;
    types!: string[];
    fastMoves!: string[];
    chargedMoves!: string[];
    tags!: string[];
    defaultIVs!: Record<string, number[]>;
    level25CP!: number;
    buddyDistance!: number;
    thirdMoveCost!: number;
    released!: boolean;
    family!: Family;
}

class Stats {
    atk!: number;
    def!: number;
    hp!: number
}

class Family {
    id!: string;
    evolutions!: string[];
}