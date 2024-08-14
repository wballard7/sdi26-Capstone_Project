import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Chip } from 'primereact/chip';

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
    <div>
      <div>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Edit Entries" />
          <TabPanel header="Add New Entry" />
        </TabView>
      </div>

      <div>
        <>
          {activeIndex === 0 ? (
            <>
              <Calendar
                placeholder="completed on"
                value={entryDetails.completed_on_date}
                onChange={(e) =>
                  handleEntryChange('completed_on_date', e.value)
                }
              />

              <InputText
                placeholder="completed by"
                value={entryDetails.compeleted_by_id}
                onChange={(e) =>
                  handleEntryChange('compeleted_by_id', e.target.value)
                }
              />
            </>
          ) : (
            <></>
          )}
        </>
        <div>
          <InputText
            placeholder="Name"
            value={entryDetails.name}
            onChange={(e) => handleEntryChange('name', e.target.value)}
          />
          <div>
            <Calendar
              placeholder="Start Date"
              value={entryDetails.start_date}
              onChange={(e) => handleEntryChange('startDate', e.value)}
            />
            <Calendar
              placeholder="End Date"
              value={entryDetails.endDate}
              onChange={(e) => handleEntryChange('endDate', e.value)}
            />
            <InputTextarea
              placeholder="Misc. Notes"
              value={entryDetails.notes}
              onChange={(e) => handleEntryChange('notes', e.target.value)}
            />
          </div>
          <InputNumber
            placeholder="Repeat every __ days"
            value={entryDetails.repeatEvery}
            onValueChange={(e) => handleEntryChange('repeatEvery', e.value)}
          />
          <InputText
            placeholder="Event Owner"
            value={entryDetails.eventOwner}
            onChange={(e) => handleEntryChange('eventOwner', e.target.value)}
          />
          <MultiSelect

          
            placeholder="Attach to Static Entries"
            value={entryDetails.attachedStaticEntries}
            options={[]} //fetch static
            onChange={(e) =>
              handleEntryChange('attachedStaticEntries', e.value)
            }
          />
        </div>

        <div>
          <div>
            <h3>Tags</h3>
            <div>
              {tags.map((tag, index) => (
                <Chip key={index} label={tag} />
              ))}
            </div>
            <div>
              <InputText
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
                <Chip key={index} label={audience} />
              ))}
            </div>
            <div className="add-audience">
              <InputText
                placeholder="New Audience"
                value={newAudience}
                onChange={(e) => setNewAudience(e.target.value)}
              />
              <Button label="Add Audience" onClick={addAudience} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
