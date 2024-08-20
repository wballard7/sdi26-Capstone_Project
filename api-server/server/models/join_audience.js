const knex = require('../db');

async function all() {
  return knex('join_audience');
}
async function getById(id) {
  const results = await knex('join_audience').where({ id });
  return results[0];
}
async function getByStaticID(static_id) {
  const results = await knex('join_audience').where({ static_id });
  return results[0];
}
async function getByUserID(user_id) {
  const results = await knex('join_audience').where({ user_id });
  return results[0];
}

async function getAllByUserID(user_id) {
  const results = await knex('join_audience').where({ user_id });
  return results;
}

async function remove(id) {
  const results = await knex('join_audience').where({ id }).del().returning('*');
  return results[0];
}
async function create(data) {
  const results = await knex('join_audience').insert(data).returning('*');
  return results[0];
}
async function update(id, data) {
  const results = await knex('join_audience').where({ id }).update(data);
  return results[0];
}

module.exports = {
  all,
  create,
  remove,
  update,
  getById,
  getByStaticID,
  getAllByUserID,
  getByUserID,
};
