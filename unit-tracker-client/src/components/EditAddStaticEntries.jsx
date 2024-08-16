import React, { useState, useEffect } from 'react';
import { postFetch, getFetch } from '../utils/Fetches';
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
    const fetchUnits = async () => {
      const data = await getFetch('units');
      setUnits(data);
    };
    const fetchTags = async () => {
      const data = await getFetch('tags');
      setTags(data);
    };
    const fetchTitles = async () => {
      const data = await getFetch('static_entries');
      setStaticEntries(data);
    };
    fetchOwners();
    fetchCategories();
    fetchUnits();
    fetchTags();
    fetchTitles();
  }, []);

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
      if (field === 'tag_id' || field === 'unit_id' || field === 'category') {
        return { ...prev, [field]: parseInt(value) || 0 };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <Box p={4}>
      <Tabs index={activeIndex} onChange={(index) => setActiveIndex(index)}>
        <TabList>
          <Tab>Edit Entries</Tab>
          <Tab>Add New Entry</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
              <label htmlFor="my_unit_id">Unit ID</label>
              <Input
                id="my_unit_id"
                type="number"
                value={newStaticEntry.unit_id}
                onChange={(e) => handleChange(e, 'unit_id')}
                placeholder="Unit ID"
              />
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
            </Button>
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

            {/* add function to call current logged in user's unit */}

            {/* add function to call current logged in user as "owner" */}

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
