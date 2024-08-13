import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getFetch } from './utils/Fetches';
import { Card } from 'primereact/card';

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState({
    title: '',
    unit_id: 0,
    category_id: 0,
    supp_id: 0,
    input_owner_id: 0,
    tag_id: 0,
    notes: '',
  });
  const [dynamicEntries, setDynamicEntries] = useState({
    name: '',
    input_id: 0,
    audicence_id: {},
    start_date: '',
    end_date: '',
    completed_on_date: '',
    compeleted_by_id: 0,
    reccurence: '',
    event_owner_id: 0,
    tag_id: {},
    notes: '',
  });
  useEffect(() => {
    const fetchDynamicEntries = async () => {
      const fetchedDynamicEntries = await getFetch('dynamicentries');
      setDynamicEntries(fetchedDynamicEntries);
    };

    fetchDynamicEntries();
  }, []);

  useEffect(() => {
    const fetchStaticEntries = async () => {
      const fetchedStaticEntries = await getFetch('staticentries');
      setStaticEntries(fetchedStaticEntries);
    };

    fetchStaticEntries();
  }, []);
  return (
    <>
      <h1>home</h1>
      <Link to="/StaticEntries">
        <Button label="Entries" />
      </Link>
      <Link to="/DynamicEntries">
        <Button label="Tasks" />
      </Link>
    </>
  );
};
