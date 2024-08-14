/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      first_name: 'John',
      last_name: 'Wick',
      username: 'Baba_Yaga',
      password: 'password1',
      my_unit_id: 11,
      // supervisor_id: 1,
      availability: true,
      admin: false,
      supervisor: true,
    },
    {
      first_name: 'Son',
      last_name: 'Goku',
      username: 'kakarot',
      password: 'password2',
      my_unit_id: 2,
      // supervisor_id: 2,
      availability: true,
      admin: true,
      supervisor: true,
    },
    {
      first_name: 'Ferris',
      last_name: 'Bueller',
      username: 'sick_boy',
      password: 'password3',
      my_unit_id: 11,
      // supervisor_id: 1,
      availability: false,
      admin: false,
      supervisor: true,
    },
  ]);
};

//  215d445d-c170-4fda-8aef-f09e42411bbf | John       | Wick      | Baba_Yaga | password1 |               |              1 | t            | f     | t
//  22c66f37-c1a6-4b52-a0be-7c3bbdb18632 | Son        | Goku      | kakarot   | password2 |               |              2 | t            | t     | t
//  a7e49227-bc2e-4d60-a544-7adc05eb04f0 | Ferris     | Bueller   | sick_boy  | password3 |               |              1 | f            | f     | t
