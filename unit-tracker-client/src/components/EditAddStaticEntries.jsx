import React, { useState, useEffect, useContext } from 'react';
import { postFetch, getFetch } from '../utils/Fetches';
// import { SupervisorContext } from '../context/SupervisorContext';
import { UserContext } from '../context/UserContext';
import {
  Input,
  Button,
  Select,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Box,
} from '@chakra-ui/react';
import '../styles/EditAddStaticEntries.css';
var reported = [];

// Chakra does not have ====> import { MultiSelect } from 'primereact/multiselect';

export const EditAddStaticEntries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newStaticEntry, setNewStaticEntry] = useState({
    title: '',
    my_unit_id: 0,
    owner_id: '',
    category_id: 0,
    notes: '',
    tag_id: 0,
  });

  const { my_unit_id, supervisor, id: userId } = useContext(UserContext);
  // const { supervisor_id: me } = useContext(SupervisorContext);
  const [staticEntries, setStaticEntries] = useState([]);
  const [owners, setOwners] = useState([]);
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      const data = await getFetch('users');
      setOwners(data);
    };
    const fetchCategories = async () => {
      const data = await getFetch('categories');
      setCategories(data);
    };
    const fetchTags = async () => {
      const data = await getFetch('tags');
      setTags(data);
    };
    fetchOwners();
    fetchCategories();
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      const data = await getFetch(`static_entries/owner/${userId}`);
      console.log(userId);
      setStaticEntries(data);
    };
    fetchTitles();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      var data = await getFetch(`units`);
      console.log('data in units', data);
      let reported = data.filter((entry) => entry.reports_to === my_unit_id);
      console.log('data for reports to fetch', units);
      console.log(reported);
      setUnits(reported);
    };
    fetchUnits();
  }, []);

  useEffect(() => {
    if (supervisor) {
      setNewStaticEntry((prev) => ({
        ...prev,
        owner_id: userId,
      }));
    }
  }, [supervisor, userId]);

  const handleAddEntry = async () => {
    const audienceArray = newStaticEntry.audience
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a);
    try {
      const response = await postFetch('static_entries', newStaticEntry);
      console.log('Entry added successfully:', response);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setNewStaticEntry((prev) => {
      if (field === 'tag_id' || field === 'my_unit_id' || field === 'category') {
        return { ...prev, [field]: parseInt(value) || 0 };
      }
      return { ...prev, [field]: value };
    });
  };

  const unitsWithUser = [
    /*{ id: my_unit_id, name: 'Your Unit' }, ...units*/
  ];

  return (
    <Box p={4}>
      <Tabs index={activeIndex} onChange={(index) => setActiveIndex(index)}>
        <TabList>
          <Tab>Edit Entries</Tab>
          <Tab>Add New Entry</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <>
              {staticEntries == [] ? (
                <h1>'No entries exist for this user'</h1>
              ) : (
                <>
                  <div className="p-field">
                    <label htmlFor="title">Title</label>

                    <Select
                      id="title"
                      value={newStaticEntry.title} /*fetch for existing static*/
                      onChange={(e) => handleChange(e, 'title')}
                      placeholder="Existing Entries"
                    >
                      {staticEntries.map((staticEntries) => (
                        <option
                          key={staticEntries.id}
                          value={staticEntries.id}
                          className="dropdown-option"
                        >
                          {staticEntries.title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="my_unit_id">Unit</label>
                    <Select
                      id="my_unit_id"
                      value={newStaticEntry.my_unit_id}
                      onChange={(e) => handleChange(e, 'my_unit_id')}
                      placeholder="Select a unit"
                    >
                      {units == []
                        ? my_unit_id
                        : units.map((unitOption) => (
                            <option
                              key={unitOption.id}
                              value={unitOption.id}
                              className="dropdown-option"
                            >
                              {unitOption.unit_name}
                            </option>
                          ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="owner_id">Owner</label>
                    <Select
                      id="owner_id"
                      value={newStaticEntry.owner_id} /*fetch for existing users*/
                      onChange={(e) => handleChange(e, 'owner_id')}
                      placeholder="Owner"
                    >
                      {owners.map((owners) => (
                        <option key={owners.uuid} value={owners.uuid} className="dropdown-option">
                          {owners.username}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="category_id">Category</label>
                    <Select
                      id="category_id"
                      value={newStaticEntry.category_id}
                      onChange={(e) => handleChange(e, 'category_id')}
                      placeholder="Select a category"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id} className="dropdown-option">
                          {category.category_name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="notes">Notes</label>
                    <Textarea
                      id="notes"
                      value={newStaticEntry.notes}
                      onChange={(e) => handleChange(e, 'notes')}
                      rows={5}
                      placeholder="Enter notes"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="tag_id">Tags</label>
                    <Select
                      id="tag_id"
                      value={newStaticEntry.tag_id}
                      onChange={(e) => handleChange(e, 'tag_id')}
                      placeholder="Select tags"
                    >
                      {tags.map((tag) => (
                        <option key={tag.id} value={tag.id} className="dropdown-option">
                          {tag.tag_name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <Button onClick={handleAddEntry} mt={2}>
                    Update Entry
                  </Button>{' '}
                </>
              )}
            </>
          </TabPanel>

          {/* EVERYTHING BELOW IS ADD ENTRY */}

          <TabPanel>
            <div className="p-field">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={newStaticEntry.title}
                onChange={(e) => handleChange(e, 'title')}
                placeholder="Title (required)"
              />
            </div>

            <div className="p-field">
              <label htmlFor="my_unit_id">Unit</label>
              <Select
                id="my_unit_id"
                value={newStaticEntry.my_unit_id}
                onChange={(e) => handleChange(e, 'my_unit_id')}
                placeholder="Select a unit"
              >
                {units == []
                  ? my_unit_id
                  : units.map((unitOption) => (
                      <option key={unitOption.id} value={unitOption.id} className="dropdown-option">
                        {unitOption.unit_name}
                      </option>
                    ))}
              </Select>
            </div>

            <div className="p-field">
              <label htmlFor="owner_id">Owner</label>
              <Select
                id="owner_id"
                value={newStaticEntry.owner_id}
                onChange={(e) => handleChange(e, 'owner_id')}
                placeholder="Owner"
              >
                {owners.map((owner) => (
                  <option key={owner.uuid} value={owner.uuid} className="dropdown-option">
                    {owner.username}
                  </option>
                ))}
              </Select>
            </div>

            <div className="p-field">
              <label htmlFor="category_id">Category</label>
              <Select
                id="category_id"
                value={newStaticEntry.category_id}
                onChange={(e) => handleChange(e, 'category_id')}
                placeholder="Select a category"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="dropdown-option">
                    {category.category_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="p-field">
              <label htmlFor="notes">Notes</label>
              <Textarea
                id="notes"
                value={newStaticEntry.notes}
                onChange={(e) => handleChange(e, 'notes')}
                rows={5}
                placeholder="Enter notes"
              />
            </div>

            <div className="p-field">
              <label htmlFor="tag_id">Tags</label>
              <Select
                id="tag_id"
                value={newStaticEntry.tag_id}
                onChange={(e) => handleChange(e, 'tag_id')}
                placeholder="Select tags"
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id} className="dropdown-option">
                    {tag.tag_name}
                  </option>
                ))}
              </Select>
            </div>

            <Button onClick={handleAddEntry} mt={2}>
              Add Entry
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
