import { Link, Button, Box, Flex, Text, Heading } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getFetch } from '../utils/Fetches';
import '../styles/StaticEntries.css';

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
    <Box className="container">
      <Heading>Static Entries</Heading>
      <Box className="main-section">
        <Flex className="buttons">
          <Link href="/EditAddStaticEntries" style={{ textDecoration: 'none' }}>
            <Button width="buttons-button" colorScheme="teal">
              Edit/Add Entries
            </Button>
          </Link>
          <Link href="/AddNewStaticEntries" style={{ textDecoration: 'none' }}>
            <Button width="buttons-button" colorScheme="teal">
              Edit/Add Entries
            </Button>
          </Link>
        </Flex>

        <Box className="content-area">
          {staticEntries.length > 0 ? (
            staticEntries.map((entry) => (
              <Box key={entry.id} mb={2}>
                <Text>{entry.title}</Text>
              </Box>
            ))
          ) : (
            <Text>No static entries found.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
