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
  const unitId = req.params.my_unit_id;
  const allSupervisors = await User.getBySupervisorTrue();
  const unitSupervisors = allSupervisors.filter((user) => user.unitId === unitId);

  return res.send(unitSupervisors);
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
  getAllUnitSupervisors,
};
