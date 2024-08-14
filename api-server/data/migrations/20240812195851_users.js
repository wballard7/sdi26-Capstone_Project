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
    table.uuid('supervisor_id').nullable();
    table.integer('higher_unit_id').notNullable();
    table.boolean('availability').notNullable();
    table.boolean('admin').notNullable();
    table.boolean('supervisor').notNullable();

    table.foreign('higher_unit_id').references('id').inTable('units');
    table.foreign('supervisor_id').references('id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('users', (table) => {
      table.dropForeign('higher_unit_id');
      table.dropForeign('supervisor_id');
    })
    .then(function () {
      return knex.schema.dropTableIfExists('users');
    });
};
