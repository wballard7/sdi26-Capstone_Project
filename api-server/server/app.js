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

app.get('/users', userRoutes.getAllUsers); //TESTED GOOD
app.get('/users/id/:id', userRoutes.getUserById); //TESTED GOOD
app.get('/users/username/:username', userRoutes.getUserByUsername); //TESTED GOOD
app.get('/users/unit_supervisors/:id', userRoutes.getAllUnitSupervisors); // TESTED GOOD
app.get('/users/unit_nonsupervisors/:id', userRoutes.getAllUnitNonSupervisors); // TESTED GOOD
app.get('/users/personnel/:supervisor_id', userRoutes.getMyPersonnel); //TESTED GOOD
app.post('/users', userRoutes.createUser); // TESTED GOOD
app.post('/users/login', userRoutes.loginUser); // TESTED GOOD

// ${apiURL}/units/${userData.my_unit_id}
// getFetch('units')

// postFetch('units', newUnit)
app.get('/units', unitRoutes.getAllUnits); //TESTED GOOD
app.get('/units/:id', unitRoutes.getUnitsId); //TESTED GOOD
app.post('/units', unitRoutes.createUnit);
app.patch('/units', unitRoutes.updateUnit);

// postFetch(''dynamic_entries', newStaticEntry);
// getFetch('dynamic_entries');
// postFetch('static_entries', newStaticEntry);
app.get('/static_entries/', staticRoutes.getAllEntries); //TESTED GOOD
app.get('/static_entries/:id', staticRoutes.getEntryById); //TESTED GOOD
app.get('/static_entries/title/:title', staticRoutes.getEntryByTitle);
app.get('/static_entries/owner/:id', staticRoutes.getEntryByOwner); //TESTED GOOD
app.get('/static_entries/category/:category_id', staticRoutes.getEntryByCategory); //FAILED
app.get('/static_entries/unit/:id', staticRoutes.getEntryByUnit); //FAILED
app.get('/static_entries/tags/:id', staticRoutes.getEntryByTags); //FAILED
app.post('/static_entries', staticRoutes.createEntry);
app.patch('/static_entries', staticRoutes.updateEntry);
app.get('/static_entries/supervisor/:user_id', staticRoutes.getAllPersonnelEntries);
//TESTED BAD --- but no crash --- app.delete('/static_entries', staticRoutes.removeEntry);

app.get('/dynamic_entries/', dynamicRoutes.getAllEntries); //TESTED GOOD
app.get('/dynamic_entries/:id', dynamicRoutes.getEntryById); //TESTED GOOD
app.get('/dynamic_entries/name/:name', dynamicRoutes.getEntryByName); // Not needed
app.get('/dynamic_entries/owner/:id', dynamicRoutes.getEntryByOwner);
app.get('/dynamic_entries/category/:id', dynamicRoutes.getEntryByCategory); // No model yet
app.get('/dynamic_entries/unit/:id', dynamicRoutes.getEntryByUnit); // No model yet
app.get('/dynamic_entries/tags/:id', dynamicRoutes.getEntryByTags);
app.post('/dynamic_entries/', dynamicRoutes.createEntry);
app.patch('/dynamic_entries/', dynamicRoutes.updateEntry);
app.delete('/dynamic_entries/:id', dynamicRoutes.removeEntry);
app.get('/dynamic_entries/supervisor/:user_id', dynamicRoutes.getAllPersonnelEntries);

// //get tags

app.get('/tags', tagRoutes.getAllTags); //TESTED GOOD
app.get('/tags/:id', tagRoutes.getTagById);
app.get('/tags/tag_name/:name', tagRoutes.getTagByName);
app.get('/tags', tagRoutes.createTag); //TESTED GOOD
app.get('/tags', tagRoutes.deleteTag); //TESTED GOOD

// //get categories
app.get('/categories', categoryRoutes.getAllCategories); //TESTED GOOD
app.get('/categories/:id', categoryRoutes.getCategoriesById);
app.get('/categories/name/:id', categoryRoutes.getCategoriesByName);
app.get('/categories', categoryRoutes.createCategory); //TESTED GOOD
app.get('/categories', categoryRoutes.deleteCategory); //TESTED GOOD
// //get audience
app.get('/join_audience', audienceRoutes.getAllAudiences); //TESTED GOOD
app.get('/join_audience/:id', audienceRoutes.getAudienceById);
app.get('/join_audience/static_id/:id', audienceRoutes.getAudienceByStaticID);
app.get('/join_audience/user_id/:id', audienceRoutes.getAudienceByUserID);
app.get('/join_audience', audienceRoutes.createAudience); // TESTED GOOD
app.get('/join_audience', audienceRoutes.updateAudience); // TESTED GOOD
app.get('/join_audience', audienceRoutes.deleteAudience); // TESTED GOOD
module.exports = app;
