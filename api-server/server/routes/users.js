const bcrypt = require('bcryptjs');
const User = require('../dao/users');

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
  console.log(`At loginUser in routes: ${username} and ${password} were passed in`);
  const user = await User.getByUsername(username);
  console.log(`Passed in password:${password} & ${username}:${user.password} are being compared`);
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
  getUserById,
  getUserByUsername,

};

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const verifyUser = await knex('user').where({ username: username }).first();

//     // bcrypt.compare(password, verifyUser.password)
//     // .then((result) => {
//     //   if (result)
//     //     res.status(200).json({ message: "logged in" })
//     //   else
//     //     res.status(401).json({ message: "invalid password" })
//     // })
//     const allowLogin = await bcrypt.compare(password, verifyUser.password);

//     if (!allowLogin) return res.status(401).json({ message: 'invalid password' });
//     else return res.status(200).json({ message: 'logged in' });
//   } catch {
//     return res.status(401).json({ message: 'invalid username' });
//   }
// });

// app.post('/createAccount', async (req, res) => {
//   const { first_name, last_name, username, password } = req.body;
//   if (!first_name) {
//     return res.status(400).json({ message: 'First Name is required' });
//   }
//   if (!last_name) {
//     return res.status(400).json({ message: 'Last Name is required' });
//   }
//   if (!username) {
//     return res.status(400).json({ message: 'username is required' });
//   }
//   if (!password) {
//     return res.status(400).json({ message: 'password is required' });
//   }

//   try {
//     const grabUserId = await knex('user').select('id').where({ username }).first();
//     if (grabUserId) return res.status(400).json({ message: 'User already exists' });

//     // bcrypt.hash(password, saltRounds)
//     // .then((hash) => {
//     //   const insertAccount = knex("user").insert({
//     //     first_name,
//     //     last_name,
//     //     username,
//     //     password: hash
//     //   })
//     //   return insertAccount;//note needed due to
//     // })
//     // .catch((err) => {
//     //   console.log("Hash Brown error. Please try fries", err)
//     //   return res.status(400).json({ message: "failed to create new user" })
//     // });

//     //++note: the sync fetch has a ton of issues. using this async is much better
//     //should probably be changed in the learning content
//     //https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function
//     const hashPassword = await bcrypt.hash(password, saltRounds);
//     const insertAccount = await knex('user').insert({
//       first_name,
//       last_name,
//       username,
//       password: hashPassword,
//     });

//     return res.status(200).json({ message: 'Account Created, Please Log in' });
//   } catch {
//     return res.status(401).json({ message: 'failed to create new user' });
//   }
// });
