const Unit = require('../models/units');

async function getAllUnits(req, res) {
  const all = await Unit.all();
  return res.json(all);
}

async function getUnitsId(req, res) {
  console.log(`Line 9 in routes/units id: ${req.params.id} was passed in`);
  const Id = req.params.id;
  const unit = await Unit.getUnitsById(Id);
  return res.send(unit);
}

async function createUnit(req, res) {
  const created = await Unit.create(req.body);
  return res.json(created);
}

async function updateUnit(req, res) {
  const updated = await Unit.update(req.body);
  return res.json(updated);
}

module.exports = {
  getAllUnits,
  getUnitsId,
  createUnit,
  updateUnit,
};
