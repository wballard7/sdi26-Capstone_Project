const User = require('../models/users');
const Unit = require('../models/units');

const getAllInAUnit = async (req, res) => {
  const { id } = req.params;
  const results = await getAllUnderUnit(id);
  return results;
};

//POST
const createUnit = async (req, res) => {
  const { unit_name, higher_unit = null } = req.body;

  try {
    const unit = await Unit.getByUnitsName(unit_name);
    if (!unit) {
      const unit = await Unit.create(req);

      res.status(201).json({ message: 'New unit created', id, unit_name, higher_unit });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create new unit' });
  }
};

const updateUnit = async (req, res) => {
  const { id } = req.params.id;

  try {
    const userUpdated = await Unit.update(id, req.body);

    if (userUpdated === 0) return res.status(404).json({ error: 'User not found' });
  } catch (err) {}
};

module.exports = {
  getAllInAUnit,
  createUnit,
  updateUnit,
};
