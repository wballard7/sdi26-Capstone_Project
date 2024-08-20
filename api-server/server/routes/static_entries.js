const Static_entry = require('../models/static_entries');

async function getAllEntries(req, res) {
  const all = await Static_entry.all();
  return res.json(all);
}

async function getEntryById(req, res) {
  const Id = req.params.id;
  const entry = await Static_entry.getById(Id);
  return res.send(entry);
}

// async function getEntryByTitle(req, res) {
//   const title = req.params.title;
//   const entry = await Static_entry.getByTitle(title);
//   return res.send(entry);
// }

// async function getEntryByCategory(req, res) {
//   const category_id = req.params.category_id;
//   const entry = await Static_entry.getByCategory(category_id);
//   return res.send(entry);
// }

async function getEntryByOwner(req, res) {
  try {
    const owner_id = req.params.id;
    const entries = await Static_entry.getByOwner(owner_id);
    return res.json(entries);
  } catch (error) {
    console.error('Error in getEntryByOwner:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
async function getEntryByUnit(req, res) {
  const my_unit_id = req.params.my_unit_id;
  const entry = await Static_entry.getByUnit(my_unit_id);
  return res.send(entry);
}

async function getEntryByTags(req, res) {
  const tag_id = req.params.tag_id;
  const entry = await Static_entry.getByTags(tag_id);
  return res.send(entry);
}

async function createEntry(req, res) {
  const created = await Static_entry.create(req.body);
  return res.json(created);
}

async function updateEntry(req, res) {
  const updated = await Static_entry.update(req.body);
  return res.json(updated);
}

async function removeEntry(req, res) {
  const removed = await Static_entry.update(req.body);
  return res.json(removed);
}

module.exports = {
  getAllEntries,
  removeEntry,
  updateEntry,
  createEntry,
  getEntryById,
  getEntryByTitle,
  getEntryByCategory,
  getEntryByOwner,
  getEntryByUnit,
  getEntryByTags,
};
