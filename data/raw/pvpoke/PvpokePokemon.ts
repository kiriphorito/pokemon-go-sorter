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
  family?: Family;

  constructor(
    dex: number, 
    speciesName: string, 
    speciesId: string, 
    baseStats: Stats,
    types: string[],
    fastMoves: string[],
    chargedMoves: string[],
    tags: string[],
    defaultIVs: Record<string, number[]>,
    level25CP: number,
    buddyDistance: number,
    thirdMoveCost: number,
    released: boolean,
    family: Family | undefined,
  ) {
    this.dex = dex;
    this.speciesName = speciesName;
    this.speciesId = speciesId;
    this.baseStats = baseStats;
    this.types = types;
    this.fastMoves = fastMoves;
    this.chargedMoves = chargedMoves;
    this.tags = tags;
    this.defaultIVs = defaultIVs;
    this.level25CP = level25CP;
    this.buddyDistance = buddyDistance;
    this.thirdMoveCost = thirdMoveCost;
    this.released = released;
    this.family = family;
  }
}

export class Stats {
  atk: number;
  def: number;
  hp: number

  constructor(atk: number, def: number, hp: number) {
    this.atk = atk;
    this.def = def;
    this.hp = hp;
  }
}

export class Family {
  id: string;
  evolutions: string[];

  constructor(id: string, evolutions: string[]) {
    this.id = id;
    this.evolutions = evolutions;
  }
}

export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
  Neutral = "NEUTRAL"
}

export function fromPvPokePokemon(pvPokeEntries: any[]): Pokemon[] {
  return pvPokeEntries.filter((entry) => {
    return new Pokemon(
      entry.dex,
      entry.speciesName,
      entry.speciesId,
      new Stats(
        entry.baseStats.atk,
        entry.baseStats.def,
        entry.baseStats.hp
      ),
      entry.types,
      entry.fastMoves,
      entry.chargedMoves,
      entry.tags,
      entry.defaultIVs,
      entry.level25CP,
      entry.buddyDistance,
      entry.thirdMoveCost,
      entry.released,
      new Family(
        entry.family?.id,
        entry.family?.evolutions
      )
    )
      
  })
}