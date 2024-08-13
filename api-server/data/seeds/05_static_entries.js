/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('static_entries').del();
  await knex('static_entries').insert([
    /*maint*/ { title: 'oil change', unit_id: 3, category_id: 3, input_owner_id: 1, tag_id: 1, misc_notes: 'humvy 1' },
    /*maint*/ { title: 'oil change', unit_id: 3, category_id: 3, input_owner_id: 1, tag_id: 1, misc_notes: 'humvy 1' },
    /*maint*/ { title: 'oil change', unit_id: 3, category_id: 3, input_owner_id: 1, tag_id: 1, misc_notes: 'humvy 1' },
    /*maint*/ { title: 'oil change', unit_id: 3, category_id: 3, input_owner_id: 1, tag_id: 1, misc_notes: 'humvy 1' },
    /*maint*/ { title: 'oil change', unit_id: 3, category_id: 3, input_owner_id: 1, tag_id: 1, misc_notes: 'humvy 1' },
  ]);
};

// table.string('title').notNullable();
// table.integer('unit_id').notNullable();
// table.integer('category_id').notNullable();
// table.uuid('input_owner_id').notNullable();
// table.integer('tag_id');
// table.string('misc_notes');

// table.foreign('unit_id').references('id').inTable('units');
// table.foreign('category_id').references('id').inTable('categories');
// table.foreign('input_owner_id').references('id').inTable('users');
// table.foreign('tag_id').references('id').inTable('tags');
