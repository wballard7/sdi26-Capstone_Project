const tags = require('../models/tags');

async function getAllTags(req, res) {
  const all = await tags.all();
  return res.json(all);
}

async function getTagById(req, res) {
  const Id = req.params.id;
  const tag = await tags.getById(Id);
  return res.send(tag);
}

async function getTagByName(req, res) {
  const Id = req.params.tag_name;
  const tag = await tags.getByName(tag_name);
  return res.send(tag);
}

async function createTag(req, res) {
  const created = await tags.create(req.body);
  return res.json(created);
}

async function deleteTag(req, res) {
  const removed = await tags.remove(req.body);
  return res.json(removed);
}

module.exports = {
  getAllTags,
  getTagById,
  getTagByName,
  createTag,
  deleteTag,
};
