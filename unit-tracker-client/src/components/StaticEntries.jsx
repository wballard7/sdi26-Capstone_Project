import { Link, Button, Box, Flex, Text, Heading, Table } from '@chakra-ui/react';
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
    misc_notes: '',
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
            <Button width="buttons-button">Edit/Add Entries</Button>
          </Link>
        </Flex>

        <Box className="content-area">
          {staticEntries.length > 0 ? (
            <Table className="table">
              <thead>
                <th>
                  <span>Title</span>
                </th>
                <th>
                  <span>Tag</span>
                </th>
                <th>
                  <span>Unit</span>
                </th>
                <th>
                  <span>Category</span>
                </th>
                <th>
                  <span>Owner</span>
                </th>
                <th>
                  <span>Notes</span>
                </th>
              </thead>
              <tbody>
                {staticEntries.map((entry) => (
                  <tr key={entry.id} mb={2}>
                    <td>{entry.title}</td>
                    <td>{entry.tag}</td>
                    <td>{entry.unit}</td>
                    <td>{entry.Category}</td>
                    <td>{entry.Owner}</td>
                    <td>{entry.misc_notes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Text>No static entries found.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
