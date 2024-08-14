const User = require('../models/static_entries');


async function getById(req, res) {
  const Id = req.params.user_id;
  const user = await User.getById(Id);
  return res.send(user);
}
async function getByTitle(req, res) {
  const Id = req.params.user_id;
  const user = await User.getById(Id);
  return res.send(user);
}
async function getByCategory(req, res) {
  const Id = req.params.user_id;
  const user = await User.getById(Id);
  return res.send(user);
}
async function getByOwner(req, res) {
  const Id = req.params.user_id;
  const user = await User.getById(Id);
  return res.send(user);
}
async function getByTags(req, res) {
  const Id = req.params.user_id;
  const user = await User.getById(Id);
  return res.send(user);
}
