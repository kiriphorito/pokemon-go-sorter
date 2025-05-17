import { Knex } from 'knex';

export async function up(db: Knex): Promise<void> {
  if (!await db.schema.hasTable('user_token')) {
    await db.schema.createTable('user_token', (table) => {
      table.increments('id').primary();
      table.integer('user_id').notNullable();
      table.boolean('type').notNullable();
      table.boolean('value').notNullable();
      table.timestamp('created_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
      table.timestamp('updated_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_token');
}