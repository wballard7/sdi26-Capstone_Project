import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';
import { getFetch } from './utils/Fetches';
import { Card } from 'primereact/card';

export const DynamicEntries = () => {
  const [dynamicEntries, setDynamicEntries] = useState({
    name: '',
    input_id: 0,
    audicence_id: {},
    start_date: '',
    end_date: '',
    completed_on_date: '',
    compeleted_by_id: '',
    reccurence: '',
    event_owner_id: '',
    tag_id: {},
    notes: '',
  });
  useEffect(() => {
    const fetchDynamicEntries = async () => {
      const fetchedDynamicEntries = await getFetch('dynamic_entries');
      setDynamicEntries(fetchedDynamicEntries);
    };

    fetchDynamicEntries();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <Link to="/EditAddDynamicEntries">
        <Button label="Edit/Add Tasks" />
      </Link>
      {/* <Card>{dynamicEntries.map()}</Card> */}
    </>
  );
};
