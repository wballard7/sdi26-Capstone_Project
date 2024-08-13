const knex = require('../db');

async function all() {
  return knex('inventory');
}

async function get(id) {
  const results = await knex('inventory').where({ id });
  return results[0];
}

async function getByUserId(user_id) {
  const results = await knex('inventory').where({ user_id }).returning('*');
  return results;
}

async function remove(id) {
  console.log(id);
  const results = await knex('inventory').where({ id }).del().returning('*');
  return results[0];
}

async function create(data) {
  const results = await knex('inventory').insert(data).returning('*');
  return results[0];
}

async function update(id, data) {
  await knex('inventory').where({ id }).update(data);

  const updatadItem = await knex('inventory').where({ id }).first();
  return updatadItem;
}

module.exports = {
  all,
  get,
  getByUserId,

  create,
  remove,
  update,
};
