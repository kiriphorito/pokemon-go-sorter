import { Knex } from 'knex';

export async function up(db: Knex): Promise<void> {
  if (!await db.schema.hasTable('player_pokemon')) {
    await db.schema.createTable('player_pokemon', (table) => {
      table.increments('id').primary();
      table.integer('player_id').notNullable();
      table.boolean('active').notNullable().defaultTo('true');
      table.smallint('dex_id').notNullable();
      table.tinyint('attack_iv').notNullable();
      table.tinyint('defense_iv').notNullable();
      table.tinyint('hp_iv').notNullable();
      table.string('gender');
      table.float('weight');
      table.float('height');
      table.date('date_of_capture');
      table.timestamp('created_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
      table.timestamp('updated_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('player_pokemon');
}