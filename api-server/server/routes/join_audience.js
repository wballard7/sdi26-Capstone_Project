const audiences = require('../models/join_audience');

async function getAllAudiences(req, res) {
  const all = await audiences.all();
  return res.json(all);
}
async function getAudienceById(req, res) {
  const Id = req.params.id;
  const audience = await audiences.getById(Id);
  return res.send(audience);
}
async function getAudienceByStaticID(req, res) {
  const Id = req.params.static_id;
  const audience = await audiences.getByStaticID(static_id);
  return res.send(audience);
}
async function getAudienceByUserID(req, res) {
  const Id = req.params.user_id;
  const audience = await audiences.getByUserID(user_id);
  return res.send(audience);
}

async function createAudience(req, res) {
  const created = await audiences.create(req.body);
  return res.json(created);
}
async function updateAudience(req, res) {
  const updated = await audiences.update(req.body);
  return res.json(updated);
}
async function deleteAudience(req, res) {
  const removed = await audiences.remove(req.body);
  return res.json(removed);
}



module.exports = {
  getAllAudiences,
  getAudienceById,
  getAudienceByStaticID,
  getAudienceByUserID,
  createAudience,
  updateAudience,
  deleteAudience,
};
