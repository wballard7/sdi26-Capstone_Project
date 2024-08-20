const Dynamic_entry = require('../models/dynamic_entries');
const Join_audience = require('../models/join_audience');

async function getAllEntries(req, res) {
  const all = await Dynamic_entry.all();
  return res.json(all);
}

async function getEntryById(req, res) {
  const Id = req.params.id;
  const entry = await Dynamic_entry.getById(Id);
  return res.send(entry);
}

async function getEntryByName(req, res) {
  //Testing to see if there's an error with req.params calling title instead of name
  const title = req.params.name;
  const entry = await Dynamic_entry.getByName(title);
  return res.send(entry);
}

async function getEntryByCategory(req, res) {
  const category_id = req.params.category_id;
  const entry = await Dynamic_entry.getByCategory(category_id); // insert model methods here
  return res.send(entry);
}

async function getEntryByOwner(req, res) {
  const owner_id = req.params.owner_id;
  const entry = await Dynamic_entry.getByOwner(owner_id);
  return res.send(entry);
}

async function getEntryByUnit(req, res) {
  const my_unit_id = req.params.my_unit_id;
  const entry = await Dynamic_entry.getByUnit(my_unit_id);
  return res.send(entry);
}

async function getEntryByTags(req, res) {
  const tag_id = req.params.tag_id;
  const entry = await Dynamic_entry.getByTags(tag_id);
  return res.send(entry);
}

async function createEntry(req, res) {
  const created = await Dynamic_entry.create(req.body);
  return res.json(created);
}

async function updateEntry(req, res) {
  const updated = await Dynamic_entry.update(req.body);
  return res.json(updated);
}

async function removeEntry(req, res) {
  const removed = await Dynamic_entry.update(req.body);
  return res.json(removed);
}

async function getAllPersonnelEntries(req, res) {
  console.log(`Passed in ${req.params.user_id} for user ID, Line 61 routes/dyna`);
  const user_id = req.params.user_id;

  try {
    const personnelEntries = await Join_audience.getAllByUserID(user_id);

    if (!personnelEntries || personnelEntries.length === 0) {
      console.log('No join entries found for the user.');
      return res.status(404).json({ error: 'No entries found for this user.' });
    }

    console.log(`Received ${JSON.stringify(personnelEntries)} for join IDs on Line 65 routes/dyna`);

    // Retrieve dynamic entries for each personnel entry using async/await
    const dynamicEntriesAssociated = await Promise.all(
      personnelEntries.map(async (data) => {
        return await Dynamic_entry.getByInputId(data.id);
      }),
    );

    // console.log(`Dynamic Entries: ${JSON.stringify(dynamicEntriesAssociated)}`);

    // Flatten the result in case it is nested arrays
    const flattenedDynamicEntries = dynamicEntriesAssociated.flat();

    return res.json(flattenedDynamicEntries);
  } catch (error) {
    console.error('Error fetching personnel entries:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllEntries,
  removeEntry,
  updateEntry,
  createEntry,
  getAllPersonnelEntries,
  getEntryById,
  getEntryByName,
  getEntryByCategory,
  getEntryByOwner,
  getEntryByUnit,
  getEntryByTags,
};
