const knex = require('../db');
// const bcrypt = require('bcryptjs');
// const createUser = require('../../server/models/createUser');

async function all() {
  return knex('users');
}

async function get(id) {
  const results = await knex('users').where({ id });
  return results[0];
}
async function getByUsername(username) {
  const results = await knex('users').where({ username });
  return results[0];
}
async function getByUsernameAndPassword(data) {
  console.log(data.username);
  const results = await login(data);
  return results[0];
}

async function remove(id) {
  const results = await knex('users').where({ id }).del().returning('*');
  return results[0];
}

async function create(data) {
  const results = await knex('users').insert(data).returning('*');
  return results[0];
}

module.exports = {
  all,

  get,
  create,
  remove,
  getByUsername,
  getByUsernameAndPassword,
};
