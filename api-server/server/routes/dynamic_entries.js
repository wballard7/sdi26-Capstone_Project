const Dynamic_entry = require('../models/dynamic_entries');
const Join_audience = require('../models/join_audience');

async function getAllEntries(req, res) {
  const all = await Dynamic_entry.all();
  return res.json(all);
}

async function getEntryById(req, res) {
  const Id = req.params.id;
  const entry = await Dynamic_entry.getById(Id);
  return res.send(entry);
}

async function getEntryByName(req, res) {
  //Testing to see if there's an error with req.params calling title instead of name
  const title = req.params.name;
  const entry = await Dynamic_entry.getByName(title);
  return res.send(entry);
}

async function getEntryByCategory(req, res) {
  const category_id = req.params.category_id;
  const entry = await Dynamic_entry.getByCategory(category_id); // insert model methods here
  return res.send(entry);
}

async function getEntryByOwner(req, res) {
  const owner_id = req.params.owner_id;
  const entry = await Dynamic_entry.getByOwner(owner_id);
  return res.send(entry);
}

async function getEntryByUnit(req, res) {
  const my_unit_id = req.params.my_unit_id;
  const entry = await Dynamic_entry.getByUnit(my_unit_id);
  return res.send(entry);
}

async function getEntryByTags(req, res) {
  const tag_id = req.params.tag_id;
  const entry = await Dynamic_entry.getByTags(tag_id);
  return res.send(entry);
}

async function createEntry(req, res) {
  const created = await Dynamic_entry.create(req.body);
  return res.json(created);
}

async function updateEntry(req, res) {
  const updated = await Dynamic_entry.update(req.body);
  return res.json(updated);
}

async function removeEntry(req, res) {
  const removed = await Dynamic_entry.update(req.body);
  return res.json(removed);
}

async function getAllPersonnelEntries(req, res) {
  const id = req.params.supervisor_id;
  console.log(`passed in ${id} for user ID, Line 61 routes/dyna`);
  const personnelEntries = await Join_audience.getByUserID(id);
  const dynID = personnelEntries.id;
  const dynamicEntriesAssociated = Dynamic_entry.getByInputId(dynID);
  return res.json(dynamicEntriesAssociated);
}

module.exports = {
  getAllEntries,
  removeEntry,
  updateEntry,
  createEntry,
  getAllPersonnelEntries,
  getEntryById,
  getEntryByName,
  getEntryByCategory,
  getEntryByOwner,
  getEntryByUnit,
  getEntryByTags,
};
