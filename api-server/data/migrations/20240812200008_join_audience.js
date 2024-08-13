/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('join_audience', (table) => {
    table.increments('id').primary();
    table.uuid('user_id').notNullable();
    table.integer('static_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('static_id').references('id').inTable('static_entries');
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
