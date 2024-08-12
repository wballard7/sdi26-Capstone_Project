/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('dynamic_entries', table => {
        table.increments().primary();
        table.string('name').notNullable();
        table.integer('input_id').notNullable();
        table.integer('audience_id').notNullable();
        table.string('start_date').notNullable();
        table.string('end_date').notNullable();
        table.integer('event_owner_id').notNullable();
        table.boolean('completed').notNullable();
        table.integer('tag_id');

        table.foreign('input_id').references('id').inTable('static_entries');
        table.foreign('audience_id').references('id').inTable('join_audience');
        table.foreign('event_owner_id').references('id').inTable('users');
        table.foreign('tag_id').references('id').inTable('tags');
      });
   
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('dynamic_entries', (table) => {
    table.dropForeign('input_id');
    table.dropForeign('audience_id');
    table.dropForeign('event_owner_id');
    table.dropForeign('tag_id');
  })
    .then(function () {
      return knex.schema.dropTableIfExists('dynamic_entries');
    });
};
