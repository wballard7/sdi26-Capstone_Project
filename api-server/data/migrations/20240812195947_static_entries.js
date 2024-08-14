/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('static_entries', (table) => {
    table.increments().primary();
    table.string('title').notNullable();
    table.integer('unit_id').notNullable();
    table.integer('category_id').notNullable();
    table.uuid('input_owner_id').notNullable();
    table.integer('tag_id');
    table.string('misc_notes');

    table.foreign('unit_id').references('id').inTable('units');
    table.foreign('category_id').references('id').inTable('categories');
    table.foreign('input_owner_id').references('id').inTable('users');
    table.foreign('tag_id').references('id').inTable('tags');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('static_entries', (table) => {
      table.dropForeign('unit_id');
      table.dropForeign('category_id');
      table.dropForeign('input_owner_id');
      table.dropForeign('tag_id');
    })
    .then(function () {
      return knex.schema.dropTableIfExists('static_entries');
    });
};
