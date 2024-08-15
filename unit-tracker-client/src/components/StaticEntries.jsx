import { Link, Button, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getFetch } from '../utils/Fetches';

const apiURL = 'http://localhost:8080';

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
    console.log('in use effect');
    const fetchStaticEntries = async () => {
      try {
        console.log('in fetch');
        const fetchedStaticEntries = await getFetch(`static_entries`);
        console.log(fetchedStaticEntries);
        setStaticEntries(fetchedStaticEntries);
      } catch (err) {
        console.log(err);
      }
    };
    console.log('after fetch');

    fetchStaticEntries();
  }, []);

  return (
    <>
      <h1>StaticEntries</h1>
      <Link href="/EditAddStaticEntries" style={{ textDecoration: 'none' }}>
        <Button width="full" colorScheme="teal" size="lg">
          Edit/Add Entries
        </Button>
      </Link>
      <div>
        {staticEntries.length > 0 ? (
          <div>
            {staticEntries.map((entry) => (
              <h2>{entry.title}</h2>
            ))}
          </div>
        ) : (
          <p>No static entries found.</p>
        )}
      </div>
    </>
  );
};
