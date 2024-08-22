const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');

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
// const categoryRoutes = require('./routes/categories');
// const tagRoutes = require('./routes/tags');
// const audienceRoutes = require('./routes/join_audience');

// app.get('/users', userRoutes.getAllUsers); //TESTED GOOD
app.get('/users/id/:id', userRoutes.getUserById); //TESTED GOOD
app.get('/users/username/:username', userRoutes.getUserByUsername); //TESTED GOOD
app.get('/users/unit_supervisors/:my_unit_id', userRoutes.getAllUnitSupervisors); //:id = my_unit_id/ unit.id
app.get('/users/unit_nonsupervisors/:my_unit_id', userRoutes.getAllUnitNonSupervisors); //what the actual fu
app.get('/users/personnel/:id', userRoutes.getMyPersonnel);
app.post('/users', userRoutes.createUser);
app.post('/users/login', userRoutes.loginUser);

// // ${apiURL}/units/${userData.my_unit_id}
// // getFetch('units')

// // postFetch('units', newUnit)
app.get('/units', unitRoutes.getAllUnits);
app.get('/units/:id', unitRoutes.getUnitsId);
app.post('/units', unitRoutes.createUnit);
// app.patch('/units', unitRoutes.updateUnit);

// // postFetch(''dynamic_entries', newStaticEntry);
// // getFetch('dynamic_entries');
// // postFetch('static_entries', newStaticEntry);

// app.get('/static_entries/', staticRoutes.getAllEntries);
// app.get('/static_entries/:id', staticRoutes.getEntryById);
app.get('/static-entries/supervisor/:user_id', staticRoutes.getAllPersonnelEntries);
// app.get('/static_entries/title/:title', staticRoutes.getEntryByTitle);
// app.get('/static_entries/owner/:id', staticRoutes.getEntryByOwner);
// app.get('/static_entries/category/:category', staticRoutes.getEntryByCategory);
// app.get('/static_entries/unit/:id', staticRoutes.getEntryByUnit);
// app.get('/static_entries/tags/:id', staticRoutes.getEntryByTags);
// app.post('/static_entries', staticRoutes.createEntry);
// app.patch('/static_entries', staticRoutes.updateEntry);
// app.delete('/static_entries', staticRoutes.removeEntry);

// app.get('/dynamic_entries/', dynamicRoutes.getAllEntries);
// app.get('/dynamic_entries/:id', dynamicRoutes.getEntryById);
app.get('/dynamic-entries/supervisor/:user_id', dynamicRoutes.getAllPersonnelEntries);
// app.get('/dynamic_entries/name/:name', dynamicRoutes.getEntryByName);
// app.get('/dynamic_entries/owner/:id', dynamicRoutes.getEntryByOwner);
// app.get('/dynamic_entries/category/:id', dynamicRoutes.getEntryByCategory);
// app.get('/dynamic_entries/unit/:id', dynamicRoutes.getEntryByUnit);
// app.get('/dynamic_entries/tags/:id', dynamicRoutes.getEntryByTags);
// app.post('/dynamic_entries/', dynamicRoutes.createEntry);
// app.patch('/dynamic_entries/', dynamicRoutes.updateEntry);
// app.delete('/dynamic_entries/', dynamicRoutes.removeEntry);

// // //get tags
// app.get('/tags', tagRoutes.getAllTags);
// app.get('/tags/:id', tagRoutes.getTagById);
// app.get('/tags/tag_name/:name', tagRoutes.getTagByName);
// app.get('/tags', tagRoutes.createTag);
// app.get('/tags', tagRoutes.deleteTag);

// // //get categories
// app.get('/categories', categoryRoutes.getAllCategories);
// app.get('/categories/:id', categoryRoutes.getCategoriesById);
// app.get('/categories/name/:id', categoryRoutes.getCategoriesByName);
// app.get('/categories', categoryRoutes.createCategory);
// app.get('/categories', categoryRoutes.deleteCategory);
// // //get audience
// app.get('/join_audience', audienceRoutes.getAllAudiences);
// app.get('/join_audience/:id', audienceRoutes.getAudienceById);
// app.get('/join_audience/static_id/:id', audienceRoutes.getAudienceByStaticID);
// app.get('/join_audience/user_id/:id', audienceRoutes.getAudienceByUserID);
// app.get('/join_audience', audienceRoutes.createAudience);
// app.get('/join_audience', audienceRoutes.updateAudience);
// app.get('/join_audience', audienceRoutes.deleteAudience);
// module.exports = app;

app.use((req, res, next) => {
  console.log('Incoming Request Body:', req.body);
  next();
});

// Users Routes

// Get all users
// how to search: http://localhost:8080/users/

app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('*'); // Using the imported db instance
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Get user by ID
// // how to search: http://localhost:8080/users/id/d89d71e2-4012-43f8-a324-b9bffc4edd4d
// app.get('/users/id/:id', async (req, res) => {
//   try {
//     const user = await db('users').where('id', req.params.id).first();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get user by username
// how to search: http://localhost:8080/users/username/nerf_herder
// app.get('/users/username/:username', async (req, res) => {
//   try {
//     const user = await db('users').where('username', req.params.username).first();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get unit supervisors
// // how to search: http://localhost:8080/users/unit_supervisors/16
// app.get('/users/unit_supervisors/:unit_id', async (req, res) => {
//   try {
//     const supervisors = await db('users')
//       .where('my_unit_id', req.params.unit_id)
//       .andWhere('supervisor', true);
//     res.json(supervisors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get non-supervisors in a unit
// how to search: http://localhost:8080/users/unit_nonsupervisors/16
// app.get('/users/unit_nonsupervisors/:unit_id', async (req, res) => {
//   try {
//     const nonsupervisors = await db('users')
//       .where('my_unit_id', req.params.unit_id)
//       .andWhere('supervisor', false);
//     res.json(nonsupervisors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get personnel by ID
// how to search: http://localhost:8080/users/personnel/d89d71e2-4012-43f8-a324-b9bffc4edd4d
// app.get('/users/personnel/:id', async (req, res) => {
//   try {
//     const personnel = await db('users').where('id', req.params.id).first();
//     res.json(personnel);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Create a new user
/* how to create request: http://localhost:8080/users
    under headers input the following: key: Content-Type   Value: application/json
    input below in body, make sure to check raw, and JSON:
    {
  "first_name": "Aaron",
  "last_name": "Berg",
  "username": "jedi_master",
  "password": "force1234",
  "supervisor_id": null,
  "my_unit_id": 1,
  "availability": true,
  "admin": false,
  "supervisor": true
}
*/
// app.post('/users', async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     req.body.password = await bcrypt.hash(req.body.password, salt);
//     const newUser = await db('users').insert(req.body).returning('*');
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// User login
// app.post('/users/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if the user exists in the database
//     const user = await db('users').where('username', username).first();
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }

//     // If the password matches, return the user data or a token
//     res.json({ message: 'Login successful', user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Units Routes

// Get all units
// how to search: http://localhost:8080/units
// app.get('/units', async (req, res) => {
//   try {
//     const units = await db('units').select('*');
//     res.json(units);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get unit by ID
// how to search: http://localhost:8080/units/15
// app.get('/units/:id', async (req, res) => {
//   try {
//     const unit = await db('units').where('id', req.params.id).first();
//     res.json(unit);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Create a new unit
/* how to create request: http://localhost:8080/units
    under headers input the following: key: Content-Type   Value: application/json
    input below in body, make sure to check raw, and JSON:
    {
  "unit_name": "Bergy squad",
  "reports_to": 12
}
*/
// app.post('/units', async (req, res) => {
//   try {
//     const newUnit = await db('units').insert(req.body).returning('*');
//     res.status(201).json(newUnit);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Update a unit
/* how to create request: http://localhost:8080/units/48  <---change id to what you want changed
    under headers input the following: key: Content-Type   Value: application/json
    input below in body, make sure to check raw, and JSON:
    {
  "unit_name": "Bergy battalion",
  "reports_to": 13
}
*/
app.patch('/units/:id', async (req, res) => {
  try {
    const updatedUnit = await db('units')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Static Entries Routes

// Get all static entries
// how to search: http://localhost:8080/static_entries
app.get('/static-entries', async (req, res) => {
  try {
    const entries = await db('static_entries').select('*');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get static entry by ID
// http://localhost:8080/static_entries/5
app.get('/static-entries/:id', async (req, res) => {
  try {
    const entry = await db('static_entries').where('id', req.params.id).first();
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get static entry by title
// how to search: http://localhost:8080/static_entries/title/PFC%20Snuffy
app.get('/static-entries/title/:title', async (req, res) => {
  try {
    const entry = await db('static_entries').where('title', req.params.title).first();
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get static entries by owner ID
// how to search: http://localhost:8080/static_entries/owner/a46d1c98-9107-4664-bffc-a6a481efa2a6
app.get('/static-entries/owner/:id', async (req, res) => {
  try {
    const entries = await db('static_entries').where('input_owner_id', req.params.id);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new static entry
/* how to create request: http://localhost:8080/static_entries
    under headers input the following: key: Content-Type   Value: application/json
    input below in body, make sure to check raw, and JSON:
    {
  "title": "AMN Bergy",
  "my_unit_id": 12,
  "category_id": 7,
  "input_owner_id": "a46d1c98-9107-4664-bffc-a6a481efa2a6",
  "tag_id": 1,
  "misc_notes": "Needs to see the First Shirt for being a bad boii"
}
*/
app.post('/static-entries', async (req, res) => {
  try {
    const newEntry = await db('static_entries').insert(req.body).returning('*');
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a static entry
/* how to update request: http://localhost:8080/static_entries/48  <---change id to what you want updated
    under headers input the following: key: Content-Type   Value: application/json
    input below in body, make sure to check raw, and JSON:
    {
  "title": "AMN Bergy",
  "my_unit_id": 12,
  "category_id": 7,
  "input_owner_id": "a46d1c98-9107-4664-bffc-a6a481efa2a6",
  "tag_id": 1,
  "misc_notes": "Bergy Boii is in jail, GREAT TROOP!"
}
*/
app.patch('/static-entries/:id', async (req, res) => {
  try {
    const updatedEntry = await db('static_entries')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/static-entries/:id', async (req, res) => {
  try {
    const updatedEntry = await db('static_entries')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    if (updatedEntry.length === 0) {
      return res.status(404).json({ error: 'Static entry not found' });
    }
    res.json(updatedEntry[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a static entry
// how to delete: http://localhost:8080/static_entries/48 <--- Change to ID wanting to delete
// app.delete('/static-entries/:id', async (req, res) => {
//   try {
//     await db('static_entries').where('id', req.params.id).del();
//     res.status(204).json({ message: 'Entry deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.delete('/static-entries/:id', async (req, res) => {
  const trx = await db.transaction();
  try {
    // First, delete related entries in join_audience table
    await trx('join_audience').where('static_id', req.params.id).del();

    // Then delete the static entry
    await trx('static_entries').where('id', req.params.id).del();

    await trx.commit();
    res.status(204).json({ message: 'Entry and related records deleted' });
  } catch (error) {
    await trx.rollback();
    res.status(500).json({ error: error.message });
  }
});

// Dynamic Entries Routes

// Get all dynamic entries
// how to search: http://localhost:8080/dynamic_entries
app.get('/dynamic-entries', async (req, res) => {
  try {
    const entries = await db('dynamic_entries').select('*');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dynamic entry by ID
// how to search: http://localhost:8080/dynamic_entries/9
app.get('/dynamic-entries/:id', async (req, res) => {
  try {
    const entry = await db('dynamic_entries').where('id', req.params.id).first();
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/dynamic-entries/owner/:id', async (req, res) => {
  try {
    const entries = await db('dynamic_entries').where('event_owner_id', req.params.id);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new dynamic entry
/* how to create request: http://localhost:8080/dynamic_entries
    under headers input the following: key: Content-Type   Value: application/json
    input below in body, make sure to check raw, and JSON:
    {
  "name": "Bergy Dynamic Entry",
  "input_id": 9,
  "audience_id": 9,
  "start_date": "2024-08-22T00:00:00.000Z",
  "end_date": "2024-08-23T00:00:00.000Z",
  "complete_date": null,
  "recurrence": "weekly",
  "completed_by_id": null,
  "event_owner_id": "0c49ad8f-a23e-4379-a926-96af872449b8",
  "tag_id": null,
  "notes": "test dynamic entry"
}
*/
app.post('/dynamic-entries', async (req, res) => {
  try {
    const newEntry = await db('dynamic_entries').insert(req.body).returning('*');
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a dynamic entry
/* how to update request: http://localhost:8080/dynamic_entries/27  <---change id to what you want updated
    under headers input the following: key: Content-Type   Value: application/json
    input below in body, make sure to check raw, and JSON:
    {
  "notes": "Updated notes for the dynamic entry"
}
*/
app.patch('/dynamic-entries/:id', async (req, res) => {
  try {
    const updatedEntry = await db('dynamic_entries')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/dynamic-entries/:id', async (req, res) => {
  try {
    const updatedEntry = await db('dynamic_entries')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    if (updatedEntry.length === 0) {
      return res.status(404).json({ error: 'Dynamic entry not found' });
    }
    res.json(updatedEntry[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete a dynamic entry
// how to delete: http://localhost:8080/dynamic_entries/27 <--- replace with ID to delete
app.delete('/dynamic-entries/:id', async (req, res) => {
  try {
    await db('dynamic_entries').where('id', req.params.id).del();
    res.status(204).json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tags Routes

// Get all tags
// how to search: http://localhost:8080/tags
app.get('/tags', async (req, res) => {
  try {
    const tags = await db('tags').select('*');
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tag by ID
// how to search: http://localhost:8080/tags/1
app.get('/tags/:id', async (req, res) => {
  console.log('Line 486 of /tags/id');
  try {
    const tag = await db('tags').where('id', req.params.id).first();
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tags', async (req, res) => {
  try {
    const { tag_name } = req.body;
    if (!tag_name || typeof tag_name !== 'string') {
      return res.status(400).json({ error: 'Invalid tag_name' });
    }
    const newEntry = await db('tags').insert({ tag_name }).returning('*');
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the tag.' });
  }
});

// Categories Routes

// Get all categories
// how to search http://localhost:8080/categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await db('categories').select('*');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get category by ID
// how to search: http://localhost:8080/categories/3
app.get('/categories/:id', async (req, res) => {
  console.log('Line 511 of categories/id');
  try {
    const category = await db('categories').where('id', req.params.id).first();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Join Audience Routes

// Get all audiences
// how to search: http://localhost:8080/join_audience
app.get('/join-audience', async (req, res) => {
  try {
    const audiences = await db('join_audience').select('*');
    res.json(audiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get audience by ID
// how to search: http://localhost:8080/join_audience/1
app.get('/join-audience/:id', async (req, res) => {
  try {
    const audience = await db('join_audience').where('id', req.params.id).first();
    res.json(audience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
