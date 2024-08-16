/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('static_entries').del();
  await knex('static_entries').insert([
    {
      title: 'Med-deployment status',
      my_unit_id: 11,
      category_id: 1,
      input_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      tag_id: 4,
      misc_notes: 'Priority immunizations and PHA',
    },
    {
      title: 'Motorpool Maintenance',
      my_unit_id: 11,
      category_id: 3,
      input_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      tag_id: 1,
      misc_notes: 'need to pmcs HMMWVs A1, A2, C3',
    },
    {
      title: 'Weapons Qual',
      my_unit_id: 11,
      category_id: 4,
      input_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      misc_notes: 'M4, range 37',
    },
    {
      title: 'JQS',
      my_unit_id: 11,
      category_id: 2,
      input_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      tag_id: 2,
      misc_notes: 'Training starts 01OCT24',
    },

    {
      title: 'PFC Snuffy',
      my_unit_id: 12,
      category_id: 7,
      input_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 1,
      misc_notes: 'Needs to road test the LMTV',
    },
    {
      title: 'SGT Slaughter',
      my_unit_id: 12,
      category_id: 7,
      input_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 2,
      misc_notes: 'Static line airborne jump on 24 SEP 24',
    },
    {
      title: 'A1C Damp',
      my_unit_id: 12,
      category_id: 7,
      input_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 3,
      misc_notes: 'needs to work on sec+ approved networks',
    },
    {
      title: 'SSG Rambo',
      my_unit_id: 12,
      category_id: 7,
      input_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 4,
      misc_notes: 'needs to do his post-deployment assessment',
    },
  ]);
};

// table.string('title').notNullable();
// table.integer('my_unit_id').notNullable();
// table.integer('category_id').notNullable();
// table.uuid('input_owner_id').notNullable();
// table.integer('tag_id');
// table.string('misc_notes');

// table.foreign('my_unit_id').references('id').inTable('units');
// table.foreign('category_id').references('id').inTable('categories');
// table.foreign('input_owner_id').references('id').inTable('users');
// table.foreign('tag_id').references('id').inTable('tags');
