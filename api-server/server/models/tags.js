const knex = require('../db');

async function all() {
  return knex('tags');
}
async function getById(id) {
  const results = await knex('tags').where({ id });
  return results[0];
}
async function getByName(tag_name) {
  const results = await knex('tags').where({ tag_name });
  return results[0];
}
async function remove(id) {
  const results = await knex('tags').where({ id }).del().returning('*');
  return results[0];
}
async function create(data) {
  const results = await knex('tags').insert(data).returning('*');
  return results[0];
}

module.exports = {
  all,
  create,
  remove,
  getById,
  getByName,
};
