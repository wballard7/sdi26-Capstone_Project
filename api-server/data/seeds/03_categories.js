/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex('categories').insert([
    { category_name: 'medical' },
    { category_name: 'training' },
    { category_name: 'maintenance' },
    { category_name: 'qualifications' },
    { category_name: 'certifications' },
    { category_name: 'administrative' },
    { category_name: 'personnel' },
  ]);
};

//medical
//training
//maintenance
//qualifications
//certifications
//administrative
