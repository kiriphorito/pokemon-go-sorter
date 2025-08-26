import { PlayerPokemon } from "../../domain/model/PlayerPokemon";
import knexInstance from "../../db/index";
import { Knex } from "knex";
import { fromStats } from "../../domain/model/IndividualValues";

export const findPlayerPokemonById = async (id: number, trx?: Knex.Transaction): Promise<PlayerPokemon> => {
  const result = await getPlayerPokemonById(id, trx)
  if (!result) {
    throw new Error("PlayerPokemon doesn't exist");
  }
  return result;
}

export const getPlayerPokemonById = async (id: number, trx?: Knex.Transaction): Promise<PlayerPokemon | null> => {
  const db = trx || knexInstance;
  const result = await db
    .select('*')
    .from('player_pokemon')
    .where('id', id)
    .first();
  if (!result) {
    return null;
  }
  return toPlayerPokemonMapper(result);
}

export const findPokemonByPlayerId = async (playerId: number, isActive: boolean = true, trx?: Knex.Transaction): Promise<PlayerPokemon[]> => {
  const db = trx || knexInstance;
  return db
    .select('*')
    .from('player_pokemon')
    .where('player_id', playerId)
    .where('active', isActive);
}

export const findByPlayerIdAndDexIds = async (playerId: number, dexId: number[], isActive: boolean = true, trx?: Knex.Transaction): Promise<PlayerPokemon[]> => {
  const db = trx || knexInstance;
  const result = await db
    .select('*')
    .from('player_pokemon')
    .where('player_id', playerId)
    .whereIn('dex_id', dexId)
    .where('active', isActive);
  return result.map((row) => toPlayerPokemonMapper(row));
}

export const save = async (playerPokemon: PlayerPokemon, trx?: Knex.Transaction): Promise<PlayerPokemon> => {
  const db = trx || knexInstance;
  const result = await db
    .returning('*')
    .insert([fromPlayerPokemon(playerPokemon)])
    .into('player_pokemon')
    .onConflict('id')
    .merge('active');
  return toPlayerPokemonMapper(result[0]);
}

const fromPlayerPokemon = (playerPokemon: PlayerPokemon): any => {
  return {
    id: playerPokemon.id,
    player_id: playerPokemon.playerId,
    dex_id: playerPokemon.dexId,
    active: playerPokemon.active,
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
    playerId: row.player_id,
    active: row.active,
    iv: fromStats(row.attack_iv, row.defense_iv, row.hp_iv),
    gender: row.gender ?? undefined,
    weight: row.weight ?? undefined,
    height: row.height ?? undefined,
    dateOfCapture: row.date_of_capture,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}