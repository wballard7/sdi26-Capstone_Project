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
  Textarea,
  Box,
} from '@chakra-ui/react';

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
    audience_id: 0,
  });

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getFetch('categories');
      setCategories(data);
    };
    const fetchUnits = async () => {
      const data = await getFetch('units');
      setUnits(data);
    };
    fetchCategories();
    fetchUnits();
  }, []);

  const handleAddEntry = async () => {
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
      if (
        field === 'audience_id' ||
        field === 'tag_id' ||
        field === 'my_unit_id' ||
        field === 'category'
      ) {
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

        <TabPanel>
          <div className="p-field">
            <label htmlFor="title">Title</label>
            <Select
              id="title"
              value={newStaticEntry.title} /*fetch for existing static*/
              onChange={(e) => handleChange(e, 'title')}
              placeholder="fetch for title needs to be built"
            />
          </div>
        </TabPanel>

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
            <label htmlFor="my_unit_id">Unit ID</label>
            <Input
              id="my_unit_id"
              type="number"
              value={newStaticEntry.my_unit_id}
              onChange={(e) => handleChange(e, 'my_unit_id')}
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
            />
          </div>

          <div className="p-field">
            <label htmlFor="category_id">Category</label>
            <Select
              id="category_id"
              value={newStaticEntry.category_id}
              options={[]} // Add category fetch here
              onChange={(e) => handleChange(e, 'category_id')}
              placeholder="Select a category"
            />
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
              options={[]} // Add tags fetch here
              onChange={(e) => handleChange(e, 'tag_id')}
              placeholder="Select tags"
            />
          </div>

          <div className="p-field">
            <label htmlFor="audience_id">Audience</label>
            <Select
              id="audience_id"
              value={newStaticEntry.audience_id}
              options={[]} // Add audience fetch here
              onChange={(e) => handleChange(e, 'audience_id')}
              placeholder="Select audience"
            />
          </div>

          <Button onClick={handleAddEntry} mt={2}>
            Add Entry
          </Button>
        </TabPanel>
      </Tabs>
      <Button onClick={handleAddEntry} className="p-mt-2">
        Add Entry
      </Button>
    </Box>
  );
};
