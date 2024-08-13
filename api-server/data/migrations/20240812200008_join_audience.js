/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('join_audience', table => {
    table.increments('id').primary();
    table.integer('input_id').notNullable();
    table.integer('user_id').notNullable();
    table.integer('category_id').notNullable();

    table.foreign('category_id').references('id').inTable('categories');
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('join_audience', (table) => {
    table.dropForeign('category_id');
  })
    .then(function () {
      return knex.schema.dropTableIfExists('join_audience');
    });
};
