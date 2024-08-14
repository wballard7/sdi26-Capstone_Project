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
const staticRoutes = require('./routes/static-entries')
const dynamicRoutes = require('./routes/dynamic-entries')


app.get('/users', userRoutes.getAllUsers);
app.get('/users/:id', userRoutes.getUserById);
app.get('/users/:username', userRoutes.getUserByUsername);
app.post('/users', userRoutes.createUser);
app.post('/users/login', userRoutes.loginUser);





// ${apiURL}/units/${userData.parent_unit_id}
// getFetch('units')
// postFetch('units', newUnit)
app.get('/units/', unitRoutes.getAllUnits);
app.get('/units/:id', unitRoutes.getAllUnits);
app.post('/units', userRoutes.createUnit);
app.put('/units/', userRoutes.updateUnit);


// getFetch('dynamicentries');
// postFetch('static_entries', newStaticEntry);
// getFetch('staticentries')

module.exports = app;
