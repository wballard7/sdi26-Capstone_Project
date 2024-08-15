import { Button, Link, Box, Heading } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getFetch } from '../../utils/Fetches';

const apiURL = 'http://localhost:8080';

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
    audience_id: {},
    start_date: '',
    end_date: '',
    completed_on_date: '',
    completed_by_id: 0,
    recurrence: '',
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
      const fetchedStaticEntries = await getFetch(`${apiURL}/staticentries`);
      setStaticEntries(fetchedStaticEntries);
    };

    fetchStaticEntries();
  }, []);

  return (
    <Box maxW="md" mx="auto" mt="8" p="6" boxShadow="lg" borderRadius="lg">
      <Heading as="h1" size="lg" mb="6">
        Home
      </Heading>

      <Link href="/StaticEntries" style={{ textDecoration: 'none' }}>
        <Button width="full" colorScheme="teal" size="lg">
          Entries
        </Button>
      </Link>
      <Link href="/DynamicEntries" style={{ textDecoration: 'none' }}>
        <Button width="full" colorScheme="teal" size="lg">
          Task
        </Button>
      </Link>
    </Box>
  );
};
