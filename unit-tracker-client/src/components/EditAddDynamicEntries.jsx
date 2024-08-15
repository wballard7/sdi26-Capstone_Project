import React, { useState } from 'react';
import { Button, Input, Box, Tab, TabList, Textarea, Select } from '@chakra-ui/react';

export const EditAddDynamicEntries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [entryDetails, setEntryDetails] = useState({
    name: '',
    input_id: 0,
    audicence_id: 0,
    start_date: '',
    end_date: '',
    completed_on_date: '',
    compeleted_by_id: '',
    reccurence: '',
    event_owner_id: '',
    tag_id: 0,
    notes: '',
  });
  const [tags, setTags] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [newAudience, setNewAudience] = useState('');

  const handleEntryChange = (field, value) => {
    setEntryDetails((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag) {
      setTags((prev) => [...prev, newTag]);
      setNewTag('');
    }
  };

  const addAudience = () => {
    if (newAudience) {
      setAudiences((prev) => [...prev, newAudience]);
      setNewAudience('');
    }
  };

  return (
    <Box>
      <div>
        <Tab activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabList header="Edit Entries" />
          <TabList header="Add New Entry" />
        </Tab>
      </div>

      <div>
        <>
          {activeIndex === 0 ? (
            <>
              <Input
                placeholder="completed on"
                value={entryDetails.completed_on_date}
                onChange={(e) => handleEntryChange('completed_on_date', e.value)}
              />

              <Input
                placeholder="completed by"
                value={entryDetails.compeleted_by_id}
                onChange={(e) => handleEntryChange('compeleted_by_id', e.target.value)}
              />
            </>
          ) : (
            <></>
          )}
        </>
        <div>
          <Input
            placeholder="Name"
            value={entryDetails.name}
            onChange={(e) => handleEntryChange('name', e.target.value)}
          />
          <div>
            <Input
              placeholder="Start Date"
              value={entryDetails.start_date}
              onChange={(e) => handleEntryChange('startDate', e.value)}
            />
            <Input
              placeholder="End Date"
              value={entryDetails.endDate}
              onChange={(e) => handleEntryChange('endDate', e.value)}
            />
            <Textarea
              placeholder="Misc. Notes"
              value={entryDetails.notes}
              onChange={(e) => handleEntryChange('notes', e.target.value)}
            />
          </div>
          <Input
            placeholder="Repeat every __ days"
            value={entryDetails.repeatEvery}
            onValueChange={(e) => handleEntryChange('repeatEvery', e.value)}
          />
          <Input
            placeholder="Event Owner"
            value={entryDetails.eventOwner}
            onChange={(e) => handleEntryChange('eventOwner', e.target.value)}
          />
          <Select
            placeholder="Attach to Static Entries"
            value={entryDetails.attachedStaticEntries}
            options={[]} //fetch static
            onChange={(e) => handleEntryChange('attachedStaticEntries', e.value)}
          />
        </div>

        <div>
          <div>
            <h3>Tags</h3>
            <div>
              {tags.map((tag, index) => (
                <Input key={index} label={tag} />
              ))}
            </div>
            <div>
              <Input
                placeholder="New Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button label="Add Tag" onClick={addTag} />
            </div>
          </div>

          <div className="audience-section">
            <h3>Audience</h3>
            <div className="audience-list">
              {audiences.map((audience, index) => (
                <Input key={index} label={audience} />
              ))}
            </div>
            <div className="add-audience">
              <Input
                placeholder="New Audience"
                value={newAudience}
                onChange={(e) => setNewAudience(e.target.value)}
              />
              <Button label="Add Audience" onClick={addAudience} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
