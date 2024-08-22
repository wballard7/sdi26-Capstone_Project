/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    //table.increments().primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.uuid('supervisor_id');
    table.integer('my_unit_id');
    table.boolean('availability').notNullable();
    table.boolean('admin').notNullable();
    table.boolean('supervisor').notNullable();

    table.foreign('my_unit_id').references('id').inTable('units').onDelete('SET NULL');
    table.foreign('supervisor_id').references('id').inTable('users').onDelete('SET NULL');
  });
};

/**
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('users', (table) => {
      table.dropForeign('my_unit_id');
      table.dropForeign('supervisor_id');
    })
    .then(function () {
      return knex.schema.dropTableIfExists('users');
    });
};
