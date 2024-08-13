/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('join_audience').del();
  await knex('join_audience').insert([
    { user_id: 1, static_id: 1, diff_category_id: 1 },
    { user_id: 2, static_id: 2, diff_category_id: 2 },
    { user_id: 3, static_id: 3, diff_category_id: 3 },
  ]);
};
