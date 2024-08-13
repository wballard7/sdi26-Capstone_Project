import React, { useState } from 'react';
import { postFetch } from './utils/Fetches';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { TabView, TabPanel } from 'primereact/tabview';

export const EditAddStaticEntries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newStaticEntry, setNewStaticEntry] = useState({
    title: '',
    suppid: 0,
    unitid: 0,
    ownerid: 0,
    category: {},
    notes: '',
    tags: [],
    audience: [],
  });

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
      if (field === 'category') {
        return { ...prev, [field]: value || {} };
      }
      if (field === 'tags' || field === 'audience') {
        return { ...prev, [field]: Array.isArray(value) ? value : [] };
      }
      if (field === 'suppid' || field === 'unitid') {
        return { ...prev, [field]: parseInt(value) || 0 };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <div className="p-fluid">
      <div>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Edit Entries" />
          <TabPanel header="Add New Entry" />
        </TabView>
      </div>
      <>
        {activeIndex === 1 ? (
          <div className="p-field">
            <label htmlFor="title">Title</label>
            <InputText
              id="title"
              value={newStaticEntry.title}
              onChange={(e) => handleChange(e, 'title')}
              placeholder="Title (required)"
            />
          </div>
        ) : (
          <div className="p-field">
            <label htmlFor="title">Title</label>
            <Dropdown
              id="title"
              value={newStaticEntry.title} /*fetch for existing static*/
              onChange={(e) => handleChange(e, 'title')}
              placeholder="fetch for title needs to be built"
            />
          </div>
        )}
      </>

      <div className="p-field">
        <label htmlFor="suppid">Supplemental ID</label>
        <InputText
          id="suppid"
          type="number"
          value={newStaticEntry.suppid}
          onChange={(e) => handleChange(e, 'suppid')}
          placeholder="Supplemental ID"
        />
      </div>

      <div className="p-field">
        <label htmlFor="unitid">Unit ID</label>
        <InputText
          id="unitid"
          type="number"
          value={newStaticEntry.unitid}
          onChange={(e) => handleChange(e, 'unitid')}
          placeholder="Unit ID"
        />
      </div>

      <div className="p-field">
        <label>Owner</label>
        <Dropdown
          id="owner"
          value={newStaticEntry.ownerid} /*fetch for existing users*/
          onChange={(e) => handleChange(e, 'ownerid')}
          placeholder="Owner"
        />
      </div>

      <div className="p-field">
        <label htmlFor="category">Category</label>
        <Dropdown
          id="category"
          value={newStaticEntry.category}
          options={[]} // Add category fetch here
          onChange={(e) => handleChange(e, 'category')}
          placeholder="Select a category"
        />
      </div>

      <div className="p-field">
        <label htmlFor="notes">Notes</label>
        <InputTextarea
          id="notes"
          value={newStaticEntry.notes}
          onChange={(e) => handleChange(e, 'notes')}
          rows={5}
          placeholder="Enter notes"
        />
      </div>

      <div className="p-field">
        <label htmlFor="tags">Tags</label>
        <MultiSelect
          id="tags"
          value={newStaticEntry.tags}
          options={[]} // Add tags fetch here
          onChange={(e) => handleChange(e, 'tags')}
          placeholder="Select tags"
        />
      </div>

      <div className="p-field">
        <label htmlFor="audience">Audience</label>
        <MultiSelect
          id="audience"
          value={newStaticEntry.audience}
          options={[]} // Add audience fetch here
          onChange={(e) => handleChange(e, 'audience')}
          placeholder="Select audience"
        />
      </div>

      <Button label="Add Entry" onClick={handleAddEntry} className="p-mt-2" />
    </div>
  );
};
