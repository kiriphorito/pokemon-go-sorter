import { Knex } from 'knex';

export async function up(db: Knex): Promise<void> {
  if (!await db.schema.hasTable('user')) {
    await db.schema.createTable('user', (table) => {
      table.increments('id').primary();
      table.string('email', 512).unique().notNullable();
      table.boolean('enabled').notNullable();
      table.timestamp('created_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
      table.timestamp('updated_at', {useTz: false}).notNullable().defaultTo(db.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}