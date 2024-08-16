const knex = require('../db');

async function all() {
  return knex('static_entries').select('*');
}

async function getById(id) {
  const results = await knex('static_entries').where({ id });
  return results[0];
}
async function getByTitle(title) {
  const results = await knex('static_entries').where(title);
  return results[0];
}

async function getByCategory(category_id) {
  const results = await knex('static_entries').where(category_id);
  return results[0];
}

async function getByOwner(input_owner_id) {
  const results = await knex('static_entries').where(input_owner_id);
  return results[0];
}

async function getByUnit(my_unit_id) {
  const results = await knex('static_entries').where(my_unit_id);
  return results[0];
}

async function getByTags(tag_id) {
  const results = await knex('static_entries').where(tag_id);
  return results[0];
}

async function remove(id) {
  const results = await knex('static_entries').where({ id }).del().returning('*');
  return results[0];
}

async function create(data) {
  const results = await knex('static_entries').insert(data).returning('*');
  return results[0];
}

async function update(id, data) {
  const results = await knex('static_entries').where(id).update(data);
  return results[0];
}

module.exports = {
  all,
  create,
  remove,
  update,
  getById,
  getByTitle,
  getByCategory,
  getByOwner,
  getByUnit,
  getByTags,
};
