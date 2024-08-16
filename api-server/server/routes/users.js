const User = require('../models/users');
const bcrypt = require('bcryptjs');

async function getAllUsers(req, res) {
  console.log(`Line 5, getAllUsers, routes/users happened`);
  const all = await User.all();
  return res.json(all);
}

async function getUserById(req, res) {
  console.log(`UserID at models line 8 ${req.params.id}`);
  const Id = req.params.id;
  const user = await User.getById(Id);
  return res.send(user);
}

async function getUserByUsername(req, res) {
  const username = req.params.username;
  console.log(`This is line 18 in routes/users, getUserByUsername ${username}.`);
  const user = await User.getByUsername(username);
  return res.send(user);
}

async function createUser(req, res) {
  console.log(`This is line 25 in routes/users, createUser ${req.body.username}.`);
  const user = await User.getByUsername(req.body.username);
  console.log(`This is line 27 in routes/users, createUser ${user}.`);
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
  try {
    const { username, password } = req.body;
    console.log(`At loginUser in routes: ${username} and ${password} were passed in`);
    const user = await User.getByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(
      `Passed in password: ${password} & stored password: ${user.password} are being compared`,
    );
    // Compare the provided password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log('Passwords do not match! Authentication failed.');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('Passwords match! User logged in.');
    // Return the user data
    return res.status(200).json({ message: 'User logged in', user });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Server error during login', error: err.message });
  }
}

async function getAllUnitSupervisors(req, res) {
  console.log(`Line 70, getAllUnitSupervisors, routes/users id: ${req.params.id} was passed in`);
  const allSupervisors = await User.getBySupervisorTrue();
  const unitSupervisors = allSupervisors.filter((user) => user.unitId === unitId);

  return res.send(unitSupervisors);
}

async function getMyPersonnel(req, res) {
  const id = req.params.id;
  console.log(`Line 74, getMyPersonnel, routes/users id: ${id} was passed in`);
  const allUsers = await User.all();
  const myPersonnel = allUsers.filter((user) => user.id === id);

  return res.send(myPersonnel);
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getMyPersonnel,
  createUser,
  loginUser,
  getAllUnitSupervisors,
};
