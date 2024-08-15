const knex = require('../db');

async function all() {
  return knex('categories');
}
async function getById(id) {
  const results = await knex('categories').where({ id });
  return results[0];
}
async function getByName(category_name) {
  const results = await knex('categories').where(category_name);
  return results[0];
}
async function remove(id) {
  const results = await knex('categories').where({ id }).del().returning('*');
  return results[0];
}
async function create(data) {
  const results = await knex('categories').insert(data).returning('*');
  return results[0];
}
async function update(id, data) {
  const results = await knex('categories').where(id).update(data);
  return results[0];
}

module.exports = {
    all,
    create,
    remove,
    update,
    getById,
    getByName,
  };