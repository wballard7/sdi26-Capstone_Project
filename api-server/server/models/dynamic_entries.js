const knex = require('../db');

async function all() {
  return knex('dynamic_entries');
}

async function getById(id) {
  const results = await knex('dynamic_entries').where({ id });
  return results[0];
}
async function getByName(name) {
  const results = await knex('dynamic_entries').where({ name });
  return results[0];
}

async function getByInputId(static_id) {
  return knex('dynamic_entries')
    .where({ input_id: static_id }) // Ensure you filter by `input_id` instead of `static_id`
    .select('*'); // Select all columns; this returns an array of dynamic entries
}

async function getByAudienceID(audience_id) {
  const results = await knex('dynamic_entries').where({ audience_id });
  return results[0];
}
async function getByCompleterID(completed_by_id) {
  const results = await knex('dynamic_entries').where({ completed_by_id });
  return results[0];
}
async function getByOwner(event_owner_id) {
  const results = await knex('dynamic_entries').where({ event_owner_id });
  return results[0];
}
async function getByTags(tag_id) {
  const results = await knex('dynamic_entries').where({ tag_id });
  return results[0];
}
async function remove(id) {
  const results = await knex('dynamic_entries').where({ id }).del().returning('*');
  return results[0];
}
async function create(data) {
  const results = await knex('dynamic_entries').insert(data).returning('*');
  return results[0];
}
async function update(id, data) {
  const results = await knex('dynamic_entries').where({ id }).update(data);
  return results[0];
}

module.exports = {
  all,
  create,
  remove,
  update,
  getById,

  getByName,
  getByInputId,
  getByAudienceID,
  getByCompleterID,
  getByOwner,
  getByTags,
};
