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
    { category_name: 'logistics' },
    { category_name: 'communications' },
    { category_name: 'intelligence' },
    { category_name: 'operations' },
    { category_name: 'supply' },
    { category_name: 'security' },
    { category_name: 'medical readiness' },
    { category_name: 'IT support' },
    { category_name: 'reconnaissance' },
    { category_name: 'strategy planning' },
    { category_name: 'resource management' },
    { category_name: 'transportation' },
    { category_name: 'aircraft maintenance' },
    { category_name: 'vehicle readiness' },
    { category_name: 'personnel deployment' },
  ]);
};

//medical
//training
//maintenance
//qualifications
//certifications
//administrative
