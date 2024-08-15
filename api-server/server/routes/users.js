const User = require('../models/users');
const bcrypt = require('bcryptjs');

async function getAllUsers(req, res) {
  const all = await User.all();
  return res.json(all);
}

async function getUserById(req, res) {
  const Id = req.params.user_id;
  const user = await User.getById(Id);
  return res.send(user);
}

async function getUserByUsername(req, res) {
  const username = req.params.username;
  const user = await User.getByUsername(username);
  return res.send(user);
}

async function createUser(req, res) {
  const user = await User.getByUsername(req.body.username);
  if (!user) {
    const saltValue = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltValue);
    const created = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.json(created);
  } else {
    return res.status(409).json({ message: 'user already exists' });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await User.getByUsername(username);
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(409).json({ message: 'Passwords do not match!' });
  }
  return res.status(200).json({ message: 'User logged in', user });
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
};
