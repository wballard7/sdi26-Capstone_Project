/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('join_audience').del();
  await knex('join_audience').insert([
    { static_id: 9 },
    { static_id: 10 },
    { static_id: 11 },
    { static_id: 12 },
    { static_id: 13 },
    { static_id: 14 },
    { static_id: 15 },
    { static_id: 16 },
  ]);
};
