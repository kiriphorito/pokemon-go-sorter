import { Knex } from "knex";
import knexInstance from "../../db";
import { User } from "../../domain/model/User";
import { Player } from "../../domain/model/Player";
import { PlayerPokemon } from "../../domain/model/PlayerPokemon";

export const findPlayerById  = async (id: number, trx?: Knex.Transaction): Promise<Player> => {
  const player = await getPlayerById(id, trx);
  if (!player) {
    throw new Error("Player doesn't exist");
  }
  return player;
}

export const getPlayerById = async (id: number, trx?: Knex.Transaction): Promise<Player | null> => {
  const db = trx || knexInstance;
  const result = await db
    .select('*')
    .from('player')
    .where('id', id)
    .first();
  if (!result) {
    return null;
  }
  return toPlayerMapper(result);
}

export const findPlayerByUserId = async (userId: number,  trx?: Knex.Transaction): Promise<Player[]> => {
  const db = trx || knexInstance;
  const result = await db
    .select()
    .from('player')
    .where('userId', userId);
  return result.map((row) => toPlayerMapper(row));
}

const fromPlayer = (player: Player): any => {
  return {
    user_id: player.userId,
    active: player.active,
    // TODO: add createdAt and updatedAt
  }
};

const toPlayerMapper = (row: any): Player => {
  return {
    id: row.id,
    userId: row.user_id,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}