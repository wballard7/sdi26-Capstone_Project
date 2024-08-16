const knex = require('../db');

async function all() {
  return knex('users').select('*');
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

async function getBySupervisorTrue() {
  const results = await knex('users').where({ supervisor: true });
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
  getBySupervisorTrue,
};
