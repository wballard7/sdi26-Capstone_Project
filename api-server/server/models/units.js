const knex = require('../db');

async function all() {
  return knex('units').select('*');
}

async function getUnitsById(id) {
  const results = await knex('units').where({ id });
  return results[0];
}
async function getByUnitsName(name) {
  const results = await knex('units').where(name);
  return results[0];
}

async function remove(id) {
  const results = await knex('units').where({ id }).del().returning('*');
  return results[0];
}

async function create(data) {
  const results = await knex('units').insert(data).returning('*');
  return results[0];
}

async function update(id, data) {
  const results = await knex('units').where(id).update(data);
  return results[0];
}

async function getAllUnderUnit(id) {
  try {
    const units = await knex.raw(
      `
    WITH RECURSIVE UnitHierarchy AS (
              SELECT id, unit_name, reports_to
              FROM units
              WHERE id = ?

              UNION ALL

              SELECT u.id, u.unit_name, u.reports_to
              FROM units u
              INNER JOIN UnitHierarchy uh ON u.parent = uh.id
              )
              SELECT *
              FROM UnitHierarchy
          ORDER BY level DESC;
      `,
      [id],
    );

    return units.rows;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch related units' });
  }
}

module.exports = {
  all,
  create,
  remove,
  update,
  getUnitsById,
  getByUnitsName,
  getAllUnderUnit,
};
