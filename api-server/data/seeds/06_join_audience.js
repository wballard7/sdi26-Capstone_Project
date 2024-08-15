/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('join_audience').del();
  const static_id = await knex('static_entries').select('id');

  await knex('join_audience').insert([
    { static_id: static_id[0].id },
    { static_id: static_id[1].id },
    { static_id: static_id[2].id },
    { static_id: static_id[3].id },
    { static_id: static_id[4].id },
    { static_id: static_id[5].id },
    { static_id: static_id[6].id },
    { static_id: static_id[7].id },
  ]);
};
