const knex = require('../db');

async function all() {
  const users = await knex('users').select('*');
  console.log('Fetched users:', users); // Log to see what’s returned
  return users;
}

async function getById(id) {
  console.log(`UserID at models line 8 ${id}`);
  const results = await knex('users').where({ id });
  return results[0];
}

async function getByUsername(username) {
  console.log(username);
  const results = await knex('users').where({ username });
  return results[0];
}

async function getByUsernameAndPassword(data) {
  console.log(data.username);
  const results = await login(data);
  return results[0];
}

async function getByUnit(my_unit_id) {
  const results = await knex('users').where({ my_unit_id });
  return results;
}

async function remove(id) {
  const results = await knex('users').where({ id }).del().returning('*');
  return results[0];
}

async function create(data) {
  const results = await knex('users').insert(data).returning('*');
  return results[0];
}

async function update(data) {
  const results = await knex('users').insert(data).returning('*');
  return results[0];
}

module.exports = {
  all,
  update,
  create,
  remove,
  getByUsername,
  getByUsernameAndPassword,
  getById,
  getByUnit,
};
