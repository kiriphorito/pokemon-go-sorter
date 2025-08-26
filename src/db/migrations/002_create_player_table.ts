import { Knex } from 'knex';

export async function up(db: Knex): Promise<void> {
  if (!await db.schema.hasTable('player')) {
    await db.schema.createTable('player', (table) => {
      table.increments('id').primary();
      table.string('name', 15).notNullable();
      table.integer('user_id').notNullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
      table.timestamp('updated_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('player');
}