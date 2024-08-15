/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const salt = await bcrypt.genSalt(10);
  const password1 = await bcrypt.hash('a', salt);
  await knex('users').del();
  await knex('users').insert([
    {
      id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      first_name: 'John',
      last_name: 'Wick',
      username: 'Baba_Yaga',
      password: password1,
      my_unit_id: 11,
      // supervisor_id: 1,
      availability: true,
      admin: false,
      supervisor: true,
    },

    {
      id: 'd0cd71e2-3034-43f8-a324-b9bffc4edd4d',
      first_name: 'Son',
      last_name: 'Goku',
      username: 'kakarot',
      password: password1,
      my_unit_id: 15,

      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      availability: true,

      admin: true,
      supervisor: true,
    },
    {
      id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      first_name: 'Ferris',
      last_name: 'Bueller',
      username: 'sick_boy',
      password: password1,
      my_unit_id: 12,
      // supervisor_id: 1,
      availability: false,
      admin: false,
      supervisor: true,
    },
  ]);
};

//   0c49ad8f-a23e-4379-a926-96af872449b8 | John       | Wick      | Baba_Yaga | password1 |               |         11 | t            | f     | t
//  d0cd71e2-3034-43f8-a324-b9bffc4edd4d | Son        | Goku      | kakarot   | password2 |               |         15 | t            | t     | t
//  a46d1c98-9107-4664-bffc-a6a481efa2a6 | Ferris     | Bueller   | sick_boy  | password3 |               |         12 | f            | f     | t
