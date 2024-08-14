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
    unit_id: 0,
    owner_id: '',
    category_id: 0,
    notes: '',
    tag_id: 0,
    audience_id: 0,
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
      if (field === 'audience_id' ||field === 'tag_id' || field === 'unitid' || field === 'category') {
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
        <label htmlFor="unit_id">Unit ID</label>
        <InputText
          id="unit_id"
          type="number"
          value={newStaticEntry.unitid}
          onChange={(e) => handleChange(e, 'unitid')}
          placeholder="Unit ID"
        />
      </div>

      <div className="p-field">
        <label>Owner</label>
        <Dropdown
          id="owner_id"
          value={newStaticEntry.ownerid} /*fetch for existing users*/
          onChange={(e) => handleChange(e, 'owner_id')}
          placeholder="Owner"
        />
      </div>

      <div className="p-field">
        <label htmlFor="category">Category</label>
        <Dropdown
          id="category_id"
          value={newStaticEntry.category}
          options={[]} // Add category fetch here
          onChange={(e) => handleChange(e, 'category_id')}
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
        <label htmlFor="tag_id">Tags</label>
        <MultiSelect
          id="tag_id"
          value={newStaticEntry.tags}
          options={[]} // Add tags fetch here
          onChange={(e) => handleChange(e, 'tag_id')}
          placeholder="Select tags"
        />
      </div>

      <div className="p-field">
        <label htmlFor="audience">Audience</label>
        <MultiSelect
          id="audience_id"
          value={newStaticEntry.audience}
          options={[]} // Add audience fetch here
          onChange={(e) => handleChange(e, 'audience_id')}
          placeholder="Select audience"
        />
      </div>

      <Button label="Add Entry" onClick={handleAddEntry} className="p-mt-2" />
    </div>
  );
};
