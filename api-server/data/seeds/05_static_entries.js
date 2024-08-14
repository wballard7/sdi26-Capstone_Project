/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('static_entries').del();
  await knex('static_entries').insert([
    /*medic*/ {
      title: 'Med-deployment status',
      unit_id: 3,
      category_id: 1,
      input_owner_id: '215d445d-c170-4fda-8aef-f09e42411bbf',
      tag_id: 1,
      misc_notes: 'hmmwv 1',
    },
    /*maint*/ {
      title: 'HMMWV PMCS',
      unit_id: 3,
      category_id: 1,
      input_owner_id: '215d445d-c170-4fda-8aef-f09e42411bbf',
      tag_id: 4,
      misc_notes: 'weekly, every Monday. ',
    },
    /*medic*/ {
      title: 'M',
      unit_id: 4,
      category_id: 3,
      input_owner_id: '215d445d-c170-4fda-8aef-f09e42411bbf',
      tag_id: 1,
      misc_notes: 'hmmwv 1',
    },
    /*medic*/ {
      title: 'PHA/MHA',
      unit_id: 4,
      category_id: 3,
      input_owner_id: '215d445d-c170-4fda-8aef-f09e42411bbf',
      tag_id: 1,
      misc_notes: 'hmmwv 1',
    },

    /*train*/ {
      title: 'cyber awareness',
      unit_id: 3,
      category_id: 3,
      input_owner_id: 1,
      tag_id: 1,
      misc_notes: 'hmmwv 1',
    },
    /*qualif*/ { title: '5 level', unit_id: 3, category_id: 3, input_owner_id: 1, tag_id: 1, misc_notes: 'hmmwv 1' },
    /*cert*/ {
      title: 'security plus',
      unit_id: 3,
      category_id: 3,
      input_owner_id: 1,
      tag_id: 1,
      misc_notes: 'hmmwv 1',
    },
    /*admin*/ { title: 'memorandum', unit_id: 3, category_id: 3, input_owner_id: 1, tag_id: 1, misc_notes: 'hmmwv 1' },
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
