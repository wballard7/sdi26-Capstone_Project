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
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');
const audienceRoutes = require('./routes/join_audience');

app.get('/users', userRoutes.getAllUsers);
app.get('/users/id/:id', userRoutes.getUserById);
app.get('/users/username/:username', userRoutes.getUserByUsername);
app.get('/users/unit_supervisors/:id', userRoutes.getAllUnitSupervisors);
app.get('/users/unit_nonsupervisors/:id', userRoutes.getAllUnitSupervisors);
app.get('/users/personnel/:id', userRoutes.getMyPersonnel);
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
app.get('/static_entries/:id', staticRoutes.getEntryById);
app.get('/static_entries', staticRoutes.getEntryByTitle);
app.get('/static_entries', staticRoutes.getEntryByOwner);
app.get('/static_entries', staticRoutes.getEntryByCategory);
app.get('/static_entries', staticRoutes.getEntryByUnit);
app.get('/static_entries', staticRoutes.getEntryByTags);
app.post('/static_entries', staticRoutes.createEntry);
app.patch('/static_entries', staticRoutes.updateEntry);
app.delete('/static_entries', staticRoutes.removeEntry);

app.get('/dynamic_entries/', dynamicRoutes.getAllEntries);
app.get('/dynamic_entries/:id', dynamicRoutes.getEntryById);
app.get('/dynamic_entries/name/:name', dynamicRoutes.getEntryByName);
app.get('/dynamic_entries/owner/:id', dynamicRoutes.getEntryByOwner);
app.get('/dynamic_entries/category/:id', dynamicRoutes.getEntryByCategory);
app.get('/dynamic_entries/unit/:id', dynamicRoutes.getEntryByUnit);
app.get('/dynamic_entries/tags/:id', dynamicRoutes.getEntryByTags);
app.post('/dynamic_entries/', dynamicRoutes.createEntry);
app.patch('/dynamic_entries/', dynamicRoutes.updateEntry);
app.delete('/dynamic_entries/', dynamicRoutes.removeEntry);

// //get tags
app.get('/tags', tagRoutes.getAllTags);
app.get('/tags/:id', tagRoutes.getTagById);
app.get('/tags/tag_name/:name', tagRoutes.getTagByName);
app.get('/tags', tagRoutes.createTag);
app.get('/tags', tagRoutes.deleteTag);

// //get categories
app.get('/categories', categoryRoutes.getAllCategories);
app.get('/categories/:id', categoryRoutes.getCategoriesById);
app.get('/categories/name/:id', categoryRoutes.getCategoriesByName);
app.get('/categories', categoryRoutes.createCategory);
app.get('/categories', categoryRoutes.deleteCategory);
// //get audience
app.get('/join_audience', audienceRoutes.getAllAudiences);
app.get('/join_audience/:id', audienceRoutes.getAudienceById);
app.get('/join_audience/static_id/:id', audienceRoutes.getAudienceByStaticID);
app.get('/join_audience/user_id/:id', audienceRoutes.getAudienceByUserID);
app.get('/join_audience', audienceRoutes.createAudience);
app.get('/join_audience', audienceRoutes.updateAudience);
app.get('/join_audience', audienceRoutes.deleteAudience);
module.exports = app;
