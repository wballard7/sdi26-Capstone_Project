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
    input_owner_id: '',
    tag_id: 0,
    notes: '',
  });

  useEffect(() => {
    const fetchStaticEntries = async () => {
      try {
        const fetchedStaticEntries = await getFetch('static_entries');
        console.log(fetchedStaticEntries);
        setStaticEntries(fetchedStaticEntries);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStaticEntries();
  }, []);

  return (
    <>
      <h1>StaticEntries</h1>
      <Link to="/EditAddStaticEntries">
        <Button label="Edit/Add Entries" />
      </Link>
      <div>
        {staticEntries.length > 0 ? (
          <div>
            {staticEntries.map((entry, index) => (
              <div key={index}>
                <h2>{entry.title}</h2>
                <p>Unit ID: {entry.unit_id}</p>
                <p>Category ID: {entry.category_id}</p>
                <p>Input Owner ID: {entry.input_owner_id}</p>
                <p>Tag ID: {entry.tag_id}</p>
                <p>Notes: {entry.notes}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No static entries found.</p>
        )}
      </div>
    </>
  );
};
