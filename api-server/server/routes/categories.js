const categories = require('../models/categories');

async function getAllCategories(req, res) {
  const all = await categories.all();
  return res.json(all);
}

async function getCategoriesById(req, res) {
  const Id = req.params.id;
  const category = await categories.getById(Id);
  return res.send(category);
}

async function getCategoriesByName(req, res) {
  const Id = req.params.category_name;
  const category = await categories.getByName(category_name);
  return res.send(category);
}

async function createCategory(req, res) {
  const created = await categories.create(req.body);
  return res.json(created);
}

async function deleteCategory(req, res) {
  const removed = await categories.remove(req.body);
  return res.json(removed);
}

module.exports = {
  getAllCategories,
  getCategoriesById,
  getCategoriesByName,
  createCategory,
  deleteCategory,
};
