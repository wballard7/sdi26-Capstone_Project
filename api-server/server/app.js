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
const staticRoutes = require('./routes/static_entries');
const dynamicRoutes = require('./routes/dynamic_entries');

app.get('/users', userRoutes.getAllUsers);
app.get('/users/:id', userRoutes.getUserById);
app.get('/users/:username', userRoutes.getUserByUsername);
app.get('/users/unit_supervisors', userRoutes.getAllUnitSupervisors);
app.post('/users', userRoutes.createUser);
app.post('/users/login', userRoutes.loginUser);

// ${apiURL}/units/${userData.my_unit_id}
// getFetch('units')
// postFetch('units', newUnit)
app.get('/units', unitRoutes.getAllUnits);
app.get('/units/:id', unitRoutes.getUnitsId);
app.post('/units', unitRoutes.createUnit);
app.patch('/units', unitRoutes.updateUnit);

// postFetch(''dynamic_entries', newStaticEntry);
// getFetch('dynamic_entries');
// postFetch('static_entries', newStaticEntry);
app.get('/static_entries/', staticRoutes.getAllEntries);
app.get('/static_entries', staticRoutes.getEntryById);
app.get('/static_entries', staticRoutes.getEntryByTitle);
app.get('/static_entries', staticRoutes.getEntryByOwner);
app.get('/static_entries', staticRoutes.getEntryByCategory);
app.get('/static_entries', staticRoutes.getEntryByUnit);
app.get('/static_entries', staticRoutes.getEntryByTags);
app.post('/static_entries', staticRoutes.createEntry);
app.patch('/static_entries', staticRoutes.updateEntry);
app.delete('/static_entries', staticRoutes.removeEntry);

app.get('/dynamic_entries/', dynamicRoutes.getAllEntries);
app.get('/dynamic_entries/', dynamicRoutes.getEntryById);
app.get('/dynamic_entries/', dynamicRoutes.getEntryByTitle);
app.get('/dynamic_entries/', dynamicRoutes.getEntryByOwner);
app.get('/dynamic_entries/', dynamicRoutes.getEntryByCategory);
app.get('/dynamic_entries/', dynamicRoutes.getEntryByUnit);
app.get('/dynamic_entries/', dynamicRoutes.getEntryByTags);
app.post('/dynamic_entries/', dynamicRoutes.createEntry);
app.patch('/dynamic_entries/', dynamicRoutes.updateEntry);
app.delete('/dynamic_entries/', dynamicRoutes.removeEntry);

//get tags

//get audience

//get categories

module.exports = app;
