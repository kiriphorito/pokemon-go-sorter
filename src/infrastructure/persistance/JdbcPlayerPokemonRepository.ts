import { PlayerPokemon } from "../../domain/model/PlayerPokemon";
import knexInstance from "../../db/index";
import { Knex } from "knex";
import { fromStats } from "../../domain/model/IndividualValues";

export function findPokemonByUserId(playerId: number, trx?: Knex.Transaction): Promise<PlayerPokemon[]> {
  const db = trx || knexInstance;
  return db
    .select('*')
    .from('player_pokemon')
    .where('user_id', playerId);
}

export const findByPlayerIdAndDexIds = async (playerId: number, dexId: number[], trx?: Knex.Transaction): Promise<PlayerPokemon[]> => {
  const db = trx || knexInstance;
  console.log(dexId)
  const result = await db
    .select('*')
    .from('player_pokemon')
    .where('user_id', playerId)
    .whereIn('dex_id', dexId);
  return result.map((row) => toPlayerPokemonMapper(row));
}

export function save(playerPokemon: PlayerPokemon, trx?: Knex.Transaction): Promise<PlayerPokemon> {
  const db = trx || knexInstance;
  return db
    .returning('*')
    .insert([fromPlayerPokemon(playerPokemon)])
    .into('player_pokemon');
}

const fromPlayerPokemon = (playerPokemon: PlayerPokemon): any => {
  return {
    user_id: playerPokemon.playerId,
    dex_id: playerPokemon.dexId,
    attack_iv: playerPokemon.iv.attack,
    defense_iv: playerPokemon.iv.defense,
    hp_iv: playerPokemon.iv.hp,
    gender: playerPokemon.gender,
    weight: playerPokemon.weight,
    height: playerPokemon.height,
    date_of_capture: playerPokemon.dateOfCapture,
    // TODO: add createdAt and updatedAt
  }
};

const toPlayerPokemonMapper = (row: any): PlayerPokemon => {
  return {
    id: row.id,
    dexId: row.dex_id,
    playerId: row.user_id,
    iv: fromStats(row.attack_iv, row.defense_iv, row.hp_iv),
    gender: row.gender,
    weight: row.weight,
    height: row.height,
    dateOfCapture: row.date_of_capture,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}