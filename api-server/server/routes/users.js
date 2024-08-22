const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

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
  const id = uuidv4();
  console.log(`This is line 25 in routes/users, createUser ${req.body.username}.`);
  const user = await User.getByUsername(req.body.username);
  if (!user) {
    console.log(
      `starting the hashing for user password on line 28 on routes/users createAccount`,

      `
      id: ${id},
      username: ${req.body.username},
      password: ${req.body.password},
      my_unit_id: ${req.body.my_unit_id}
      supervisor_id: ${req.body.supervisor_id},`,
    );
    const saltValue = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltValue);
    const created = await User.create({
      id: id,
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
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    console.log('Passwords match! User logged in.');
    // Return the user data
    return res.status(200).json({ message: 'User logged in', user });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Server error during login', error: err.message });
  }
}

async function getAllUsersByUnit(req, res) {
  const { my_unit_id } = req.params;
  // console.log(`Line 70, getAllUnitSupervisors, routes/users id: ${my_unit_id} was passed in`);
  const allUsersByUnit = await User.getByUnit(my_unit_id);

  return res.send(allUsersByUnit);
}

async function getAllUnitSupervisors(req, res) {
  const { my_unit_id } = req.params;
  // console.log(`Line 70, getAllUnitSupervisors, routes/users id: ${my_unit_id} was passed in`);
  const allSupervisors = await User.getByUnit(my_unit_id);
  // console.log(allSupervisors);
  const unitSupervisors = allSupervisors.filter((user) => user.supervisor);

  return res.send(unitSupervisors);
}

async function getAllUnitNonSupervisors(req, res) {
  const { id } = req.params;
  // console.log(`Line 91, getAllUnitNonSupervisors, routes/users id: ${req.params.id} was passed in`);
  const allSupervisors = await User.getByUnit(id);
  const unitSupervisors = allSupervisors.filter((user) => !user.supervisor);
  return res.send(unitSupervisors);
}

async function getMyPersonnel(req, res) {
  try {
    const id = req.params.id;
    console.log(`Line 74, getMyPersonnel, routes/users id: ${id} was passed in`);

    // Fetch all users
    const allUsers = await User.all();
    // console.log(`Fetched ${allUsers.length} users`);

    // Filter personnel based on supervisor_id
    const myPersonnel = allUsers.filter((user) => user.supervisor_id === id);

    if (myPersonnel.length === 0) {
      console.log('No personnel found for this supervisor.');
      return res.status(404).json({ message: 'No personnel found for this supervisor.' });
    }

    // console.log(`Found ${myPersonnel.length} personnel for supervisor with id: ${id}`);
    return res.json(myPersonnel);
  } catch (error) {
    console.error('Error in getMyPersonnel:', error);
    return res.status(500).json({ error: 'An error occurred while fetching personnel.' });
  }
}
async function putUser(req, res) {
  try {
    const { id } = req.params; // Extract the ID from the URL
    const updatedData = req.body; // Get the updated user data from the request body

    console.log(`recieved id ${req.params.id} and req.body ${updatedData}`);
    // Validate that all required fields are present in the PUT request
    if (!updatedData.first_name || !updatedData.last_name || !updatedData.username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Pass the extracted ID and updated data to the update function
    const updatedUser = await User.update({ id, ...updatedData });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error); // Log any errors
    return res.status(500).json({ message: 'Failed to update user' }); // Respond with an error message if something goes wrong
  }
}

module.exports = {
  putUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getMyPersonnel,
  createUser,
  loginUser,
  getAllUnitSupervisors,
  getAllUnitNonSupervisors,
  getAllUsersByUnit,
};
