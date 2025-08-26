export class Pokemon {
  dex!: number;
  speciesName!: string;
  speciesId!: string;
  family?: Family;
  genders: Gender[];

  constructor(
    dex: number, 
    speciesName: string, 
    speciesId: string,
    genders: Gender[],
    family: Family | undefined,
  ) {
    this.dex = dex;
    this.speciesName = speciesName;
    this.speciesId = speciesId;
    this.family = family;
    this.genders = genders;
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
      entry.genders,
      new Family(
        entry.family?.id,
        entry.family?.evolutions
      )
    )
      
  })
}