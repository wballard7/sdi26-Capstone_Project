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
    { static_id: static_id[8].id },
    { static_id: static_id[9].id },
    { static_id: static_id[10].id },
    { static_id: static_id[11].id },
    { static_id: static_id[12].id },
    { static_id: static_id[13].id },
    { static_id: static_id[14].id },
    { static_id: static_id[15].id },
    { static_id: static_id[16].id },
    { static_id: static_id[17].id },
    { static_id: static_id[18].id },
    { static_id: static_id[19].id },
    { static_id: static_id[20].id },
    { static_id: static_id[21].id },
    { static_id: static_id[22].id },
    { static_id: static_id[23].id },
    { static_id: static_id[24].id },
    { static_id: static_id[25].id },
    { static_id: static_id[26].id },
    { static_id: static_id[27].id },
    { static_id: static_id[28].id },
    { static_id: static_id[29].id },
    { static_id: static_id[30].id },
    { static_id: static_id[31].id },
    { static_id: static_id[32].id },
    { static_id: static_id[33].id },
    { static_id: static_id[34].id },
    { static_id: static_id[35].id },
    { static_id: static_id[36].id },
    { static_id: static_id[37].id },
    { static_id: static_id[38].id },
    { static_id: static_id[39].id },
    { static_id: static_id[40].id },
    { static_id: static_id[41].id },
    { static_id: static_id[42].id },
    { static_id: static_id[43].id },
    { static_id: static_id[44].id },
    { static_id: static_id[45].id },
  ]);
};
