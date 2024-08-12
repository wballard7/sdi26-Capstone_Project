const { AdUnitsOutlined } = require("@mui/icons-material");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments().primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.integer('parent_unit_id').notNullable();
        table.boolean('availability').notNullable();
        table.boolean('admin').notNullable();
        table.boolean('supervisor').notNullable();

        table.foreign('parent_unit_id').references('id').inTable('units');
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropForeign('parent_unit_id');
  })
    .then(function () {
      return knex.schema.dropTableIfExists('users');
    });
};
