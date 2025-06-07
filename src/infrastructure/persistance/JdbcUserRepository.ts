import { Knex } from "knex";
import knexInstance from "../../db";
import { User } from "../../domain/model/User";

export function findUserById(id: number, trx?: Knex.Transaction): Promise<User> {
  const db = trx || knexInstance;
  return db
    .select('*')
    .from('user')
    .where('id', id)
    .first();
}