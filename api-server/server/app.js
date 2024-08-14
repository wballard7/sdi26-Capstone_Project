const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('app is working');
});

const userRoutes = require('./routes/users');
const unitRoutes = require('./routes/units');
// const staticRoutes = require('./routes/static-entries')
// const dynamicRoutes = require('./routes/dynamic-entries')

app.get('/users', userRoutes.getAllUsers);
app.get('/users/:id', userRoutes.getUserById);
app.get('/users/:username', userRoutes.getUserByUsername);
app.post('/users', userRoutes.createUser);
app.post('/users/login', userRoutes.loginUser);

// ${apiURL}/units/${userData.parent_unit_id}
// getFetch('units')
// postFetch('units', newUnit)
app.get('/units/', unitRoutes.getAllUnits);
app.get('/units/:id', unitRoutes.getUnitsId);
app.post('/units', unitRoutes.createUnit);
app.patch('/units/', unitRoutes.updateUnit);

// postFetch(''dynamic_entries', newStaticEntry);
// getFetch('dynamic_entries');
// postFetch('static_entries', newStaticEntry);
// getFetch('static_entries')

//get tags

//get audience

//get categories

module.exports = app;
