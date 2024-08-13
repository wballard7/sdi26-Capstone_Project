const express = require('express');
const port = 8080;

const knex = require('knex');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('app is working');
});

//=======================login==================================
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const verifyUser = await knex('user').where({ username: username }).first();

    // bcrypt.compare(password, verifyUser.password)
    // .then((result) => {
    //   if (result)
    //     res.status(200).json({ message: "logged in" })
    //   else
    //     res.status(401).json({ message: "invalid password" })
    // })
    const allowLogin = await bcrypt.compare(password, verifyUser.password);

    if (!allowLogin) return res.status(401).json({ message: 'invalid password' });
    else return res.status(200).json({ message: 'logged in' });
  } catch {
    return res.status(401).json({ message: 'invalid username' });
  }
});

app.post('/createAccount', async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  if (!first_name) {
    return res.status(400).json({ message: 'First Name is required' });
  }
  if (!last_name) {
    return res.status(400).json({ message: 'Last Name is required' });
  }
  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password is required' });
  }

  try {
    const grabUserId = await knex('user').select('id').where({ username }).first();
    if (grabUserId) return res.status(400).json({ message: 'User already exists' });

    // bcrypt.hash(password, saltRounds)
    // .then((hash) => {
    //   const insertAccount = knex("user").insert({
    //     first_name,
    //     last_name,
    //     username,
    //     password: hash
    //   })
    //   return insertAccount;//note needed due to
    // })
    // .catch((err) => {
    //   console.log("Hash Brown error. Please try fries", err)
    //   return res.status(400).json({ message: "failed to create new user" })
    // });

    //++note: the sync fetch has a ton of issues. using this async is much better
    //should probably be changed in the learning content
    //https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const insertAccount = await knex('user').insert({
      first_name,
      last_name,
      username,
      password: hashPassword,
    });

    return res.status(200).json({ message: 'Account Created, Please Log in' });
  } catch {
    return res.status(401).json({ message: 'failed to create new user' });
  }
});

app.get('/units/related/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const units = await knex.raw(
      `
            WITH RECURSIVE UnitHierarchy AS (
                SELECT id, level, unit, parent
                FROM units
                WHERE id = ?
                
                UNION ALL
                
                SELECT u.id, u.level, u.unit, u.parent
                FROM units u
                INNER JOIN UnitHierarchy uh ON u.parent = uh.id
            )
            SELECT *
            FROM UnitHierarchy
            ORDER BY level DESC;
        `,
      [id],
    );

    res.json(units.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch related units' });
  }
});

app.listen(port, () => {
  console.log('App listening on port:', port);
});
