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
    // Original Users
    {
      id: '0c49ad8f-a23e-4379-a920-96af872449b8',
      first_name: 'a',
      last_name: 'a',
      username: 'a',
      password: password1,
      my_unit_id: 8, // Assigned to Unit 8
      supervisor_id: null,
      availability: true,
      admin: true,
      supervisor: true,
    },
    {
      id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      first_name: 'John',
      last_name: 'Wick',
      username: 'Baba_Yaga',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a920-96af872449b8', // Supervising 'Son Goku' in a related unit
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
      my_unit_id: 11, // Same unit as supervisor John Wick
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
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: null, // Not supervised
      availability: false,
      admin: false,
      supervisor: true,
    },
    {
      id: '1c98df21-1234-432f-a920-96af12345678',
      first_name: 'Ellen',
      last_name: 'Ripley',
      username: 'xenomorph_hunter',
      password: password1,
      my_unit_id: 7, // Assigned to Unit 7
      supervisor_id: null, // Not supervised
      availability: true,
      admin: false,
      supervisor: true,
    },
    {
      id: '2f34ad65-a324-4827-a9b1-07af872449c1',
      first_name: 'Sarah',
      last_name: 'Connor',
      username: 'terminator_resistance',
      password: password1,
      my_unit_id: 10, // Assigned to Unit 10
      supervisor_id: null, // Not supervised
      availability: true,
      admin: true,
      supervisor: false,
    },
    {
      id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      first_name: 'Han',
      last_name: 'Solo',
      username: 'nerf_herder',
      password: password1,
      my_unit_id: 16, // Assigned to Unit 16
      supervisor_id: null, // Supervises Luke Skywalker in the same unit
      availability: true,
      admin: false,
      supervisor: true,
    },
    {
      id: 'b49d1c98-5678-432b-bffc-a6a481efb5b1',
      first_name: 'Luke',
      last_name: 'Skywalker',
      username: 'force_wielder',
      password: password1,
      my_unit_id: 16, // Same unit as supervisor Han Solo
      supervisor_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      availability: false,
      admin: false,
      supervisor: true,
    },

    {
      id: 'a1b2c3d4-e567-490f-a123-4567890b1cde',
      first_name: 'James',
      last_name: 'Bond',
      username: 'agent_007',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'b2c3d4e5-f678-4934-b567-890cdef12abc',
      first_name: 'Indiana',
      last_name: 'Jones',
      username: 'dr_jones',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'c3d4e5f6-7890-4235-c678-90def12abc34',
      first_name: 'Tony',
      last_name: 'Stark',
      username: 'iron_man',
      password: password1,
      my_unit_id: 16, // Assigned to Unit 16
      supervisor_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d', // Supervised by Han Solo
      availability: true,
      admin: true,
      supervisor: false,
    },
    {
      id: 'd4e5f6a7-8901-3456-d789-01ef234abc45',
      first_name: 'Bruce',
      last_name: 'Wayne',
      username: 'batman',
      password: password1,
      my_unit_id: 16, // Assigned to Unit 16
      supervisor_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d', // Supervised by Han Solo
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'e5f6a7b8-9012-4567-e890-12f345abc567',
      first_name: 'Clark',
      last_name: 'Kent',
      username: 'superman',
      password: password1,
      my_unit_id: 10, // Assigned to Unit 10
      supervisor_id: null, // Not supervised
      availability: true,
      admin: true,
      supervisor: true,
    },
    {
      id: 'f6a7b8c9-0123-5678-f901-23g456abc789',
      first_name: 'Peter',
      last_name: 'Parker',
      username: 'spiderman',
      password: password1,
      my_unit_id: 7, // Assigned to Unit 7
      supervisor_id: '1c98df21-1234-432f-a920-96af12345678', // Supervised by Ellen Ripley
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'g7b8c9d0-1234-6789-g012-34h567abc890',
      first_name: 'Diana',
      last_name: 'Prince',
      username: 'wonder_woman',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'h8c9d0e1-2345-7890-h123-45i678abc901',
      first_name: 'Natasha',
      last_name: 'Romanoff',
      username: 'black_widow',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'i9d0e1f2-3456-8901-i234-56j789abc012',
      first_name: 'Steve',
      last_name: 'Rogers',
      username: 'captain_america',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'j0e1f2g3-4567-9012-j345-67k890abc123',
      first_name: 'Thor',
      last_name: 'Odinson',
      username: 'god_of_thunder',
      password: password1,
      my_unit_id: 16, // Assigned to Unit 16
      supervisor_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d', // Supervised by Han Solo
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'k1f2g3h4-5678-0123-k456-78l901abc234',
      first_name: 'Bruce',
      last_name: 'Banner',
      username: 'hulk',
      password: password1,
      my_unit_id: 16, // Assigned to Unit 16
      supervisor_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d', // Supervised by Han Solo
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'l2g3h4i5-6789-1234-l567-89m012abc345',
      first_name: 'Arthur',
      last_name: 'Curry',
      username: 'aquaman',
      password: password1,
      my_unit_id: 10, // Assigned to Unit 10
      supervisor_id: null, // Not supervised
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'm3h4i5j6-7890-2345-m678-90n123abc456',
      first_name: 'Barry',
      last_name: 'Allen',
      username: 'the_flash',
      password: password1,
      my_unit_id: 7, // Assigned to Unit 7
      supervisor_id: '1c98df21-1234-432f-a920-96af12345678', // Supervised by Ellen Ripley
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'n4i5j6k7-8901-3456-n789-01o234abc567',
      first_name: 'Victor',
      last_name: 'Stone',
      username: 'cyborg',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'o5j6k7l8-9012-4567-o890-12p345abc678',
      first_name: 'Clark',
      last_name: 'Griswold',
      username: 'holiday_roadhouse',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'p6k7l8m9-0123-5678-p901-23q456abc789',
      first_name: 'Marty',
      last_name: 'McFly',
      username: 'time_traveler',
      password: password1,
      my_unit_id: 7, // Assigned to Unit 7
      supervisor_id: '1c98df21-1234-432f-a920-96af12345678', // Supervised by Ellen Ripley
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'q7l8m9n0-1234-6789-q012-34r567abc890',
      first_name: 'Emmett',
      last_name: 'Brown',
      username: 'doc_brown',
      password: password1,
      my_unit_id: 7, // Assigned to Unit 7
      supervisor_id: '1c98df21-1234-432f-a920-96af12345678', // Supervised by Ellen Ripley
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'r8m9n0o1-2345-7890-r123-45s678abc901',
      first_name: 'Rick',
      last_name: 'Deckard',
      username: 'blade_runner',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 's9n0o1p2-3456-8901-s234-56t789abc012',
      first_name: 'Ethan',
      last_name: 'Hunt',
      username: 'mission_impossible',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 't0o1p2q3-4567-9012-t345-67u890abc123',
      first_name: 'Neo',
      last_name: 'Anderson',
      username: 'the_one',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'u1p2q3r4-5678-0123-u456-78v901abc234',
      first_name: 'John',
      last_name: 'McClane',
      username: 'die_hard',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'v2q3r4s5-6789-1234-v567-89w012abc345',
      first_name: 'Max',
      last_name: 'Rockatansky',
      username: 'mad_max',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'w3r4s5t6-7890-2345-w678-90x123abc456',
      first_name: 'Frodo',
      last_name: 'Baggins',
      username: 'ring_bearer',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'x4s5t6u7-8901-3456-x789-01y234abc567',
      first_name: 'Aragorn',
      last_name: 'Son_of_Arathorn',
      username: 'strider',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'y5t6u7v8-9012-4567-y890-12z345abc678',
      first_name: 'Samwise',
      last_name: 'Gamgee',
      username: 'sam',
      password: password1,
      my_unit_id: 11, // Assigned to Unit 11
      supervisor_id: '0c49ad8f-a23e-4379-a926-96af872449b8', // Supervised by John Wick
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'z6u7v8w9-0123-5678-z901-23a456abc789',
      first_name: 'Legolas',
      last_name: 'Greenleaf',
      username: 'the_elven_archer',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
    {
      id: 'a7v8w9x0-1234-6789-a012-34b567abc890',
      first_name: 'Gimli',
      last_name: 'Son_of_Gloin',
      username: 'the_dwarf_warrior',
      password: password1,
      my_unit_id: 12, // Assigned to Unit 12
      supervisor_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6', // Supervised by Ferris Bueller
      availability: true,
      admin: false,
      supervisor: false,
    },
  ]);
};
