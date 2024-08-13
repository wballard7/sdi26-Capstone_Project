import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';
import { getFetch } from './utils/Fetches';
import { Card } from 'primereact/card';
export const StaticEntries = () => {
  const [staticEntries, setStaticEntries] = useState({
    title: '',
    unit_id: 0,
    category_id: 0,
    supp_id: 0,
    input_owner_id: 0,
    tag_id: 0,
    notes: '',
  });

  useEffect(() => {
    const fetchStaticEntries = async () => {
      const fetchedStaticEntries = await getFetch('staticentries');
      setStaticEntries(fetchedStaticEntries);
    };

    fetchStaticEntries();
  }, []);

  return (
    <>
      <h1>StaticEntries</h1>
      <Link to="/EditAddStaticEntries">
        <Button label="Edit/Add Entries" />
      </Link>
    </>
  );
};
