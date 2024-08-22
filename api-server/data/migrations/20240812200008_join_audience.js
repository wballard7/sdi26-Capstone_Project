/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('join_audience', (table) => {
    table.increments('id').primary();
    table.uuid('user_id');
    table.integer('static_id');

    table.foreign('user_id').references('id').inTable('users').onDelete('SET NULL');
    table.foreign('static_id').references('id').inTable('static_entries').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema
    .alterTable('join_audience', (table) => {
      table.dropForeign('user_id');
      table.dropForeign('static_id');
    })
    .then(function () {
      return knex.schema.dropTableIfExists('join_audience');
    });
};
