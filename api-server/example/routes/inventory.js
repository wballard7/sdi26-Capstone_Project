const Inventory = require('../../db/data/inventory');

async function getAllInventory(req, res) {
  const all = await Inventory.all();
  return res.json(all);
}

async function getAllInventoryByUser_Id(req, res) {
  const user_id = req.params.id;
  const all = await Inventory.getByUserId(user_id);
  return res.json(all);
}

async function getInventory(req, res) {
  const user = await Inventory.get(req.params.id);
  return res.send(user);
}

async function createInventory(req, res) {
  // validation JOI
  const created = await Inventory.create({ ...req.body });
  return res.json(created);
}

async function updateInventoryItem(req, res) {
  const { id } = req.params;
  const updated = await Inventory.update(id, req.body);
  return res.json(updated);
}

async function deleteItem(req, res) {
  console.log(req.params.id);
  const deleted = await Inventory.remove(req.params.id);
  return res.json(deleted);
}

module.exports = {
  getAllInventory,
  getInventory,
  createInventory,
  getAllInventoryByUser_Id,
  updateInventoryItem,
  deleteItem,
};
