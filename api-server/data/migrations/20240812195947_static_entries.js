/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('static_entries', (table) => {
    table.increments().primary();
    table.string('title').notNullable();
    table.integer('my_unit_id');
    table.integer('category_id');
    table.uuid('input_owner_id');
    table.integer('tag_id');
    table.string('misc_notes');

    table.foreign('my_unit_id').references('id').inTable('units').onDelete('SET NULL');
    table.foreign('category_id').references('id').inTable('categories').onDelete('SET NULL');
    table.foreign('input_owner_id').references('id').inTable('users').onDelete('SET NULL');
    table.foreign('tag_id').references('id').inTable('tags').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('static_entries', (table) => {
      table.dropForeign('my_unit_id');
      table.dropForeign('category_id');

      table.dropForeign('input_owner_id');
      table.dropForeign('tag_id');
    })
    .then(function () {
      return knex.schema.dropTableIfExists('static_entries');
    });
};
