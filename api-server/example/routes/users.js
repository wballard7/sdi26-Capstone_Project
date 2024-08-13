// const userLogin = require('../models/userLogin');
const bcrypt = require('bcryptjs');
const User = require('../../db/data/users');

async function getAllUsers(req, res) {
  const all = await User.all();
  return res.json(all);
}

async function getUser(req, res) {
  const username = req.params.username;
  const user = await User.getByUsername(username);
  return res.send(user);
}

async function createUser(req, res) {
  // validation JOI
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
  // validation JOI
  const { username, password } = req.body;
  console.log(
    `At loginUser in routes: ${username} and ${password} were passed in`,
  );
  const user = await User.getByUsername(username);
  console.log(
    `Passed in password:${password} & ${username}:${user.password} are being compared`,
  );
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    console.log('Passwords do not match! Authentication failed.');
    return res.status(409).json({ message: 'Passwords do not match!' });
  }
  console.log('Passwords match! User logged in.');
  return res.status(200).json({ message: 'User logged in', user });
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  loginUser,
};
