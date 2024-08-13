/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tags').del();
  await knex('tags').insert([
    { tag_name: 'LMTV license' },
    { tag_name: 'airborne' },
    { tag_name: 'sec+' },
    { tag_name: 'medical' },
  ]);
};
