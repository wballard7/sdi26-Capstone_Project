const Static_entry = require('../models/static_entries');


async function getEntryById(req, res) {
  const Id = req.params.user_id;
  const entry = await Static_entry.getById(Id);
  return res.send(entry);
}
async function getEntryByTitle(req, res) {
  const Id = req.params.user_id;
  const entry = await Static_entry.getById(Id);
  return res.send(entry);
}
async function getEntryByCategory(req, res) {
  const Id = req.params.user_id;
  const entry = await Static_entry.getById(Id);
  return res.send(entry);
}
async function getEntryByOwner(req, res) {
  const Id = req.params.user_id;
  const entry = await Static_entry.getById(Id);
  return res.send(entry);
}
async function getEntryByTags(req, res) {
  const Id = req.params.user_id;
  const entry = await Static_entry.getById(Id);
  return res.send(entry);
}



// getById,
// getByTitle,
// getByCategory,
// getByOwner,
// getByTags
