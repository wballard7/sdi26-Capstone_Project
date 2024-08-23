import React, { useState, useEffect, useContext } from 'react';
import { getFetch } from '../utils/Fetches';
import { Link, Button, Box, Text, Heading, Table, Flex } from '@chakra-ui/react';
import '../styles/StaticEntries.css';
import { UserContext } from '../context/UserContext';

export const DynamicEntries = () => {
  const { my_unit_id, supervisor, id: userId } = useContext(UserContext);
  const [dynamicEntries, setDynamicEntries] = useState([]);
  // name: '',
  // input_id: 0,
  // audience_id: {},
  // start_date: '',
  // end_date: '',
  // completed_on_date: '',
  // compeleted_by_id: '',
  // reccurence: '',
  // event_owner_id: '',
  // tag_id: {},
  // notes: '',
  useEffect(() => {
    console.log('user id', userId);
    const fetchDynamicEntries = async () => {
      try {
        const fetchedDynamicEntries = await getFetch(`dynamic-entries/owner/${userId}`);
        // const filteredDynamicEntries = fetchedDynamicEntries.filter((dynamicEntry) => {
        //   console.log('user id', userId);

        console.log('fetchedDynamicEntries', fetchedDynamicEntries);
        //   dynamicEntry.event_owner_id === userId;
        // });
        // console.log('filtered', filteredDynamicEntries);

        const fetchedOwners = await getFetch('users');
        const fetchedTags = await getFetch('tags');
        const fetchedAudience = await getFetch('join-audience');

        const enrichedEntries = fetchedDynamicEntries.map((entry) => ({
          ...entry,
          owner:
            fetchedOwners.find((owner) => owner.id === entry.event_owner_id)?.username ||
            'Not inputed',
          tag: fetchedTags.find((tag) => tag.id === entry.tag_id)?.tag_name || 'Not inputed',
          audience:
            fetchedAudience.find((aud) => aud.id === entry.audience_id)?.audience_name ||
            'Not inputed',
        }));

        setDynamicEntries(enrichedEntries);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDynamicEntries();
  }, [userId]);

  //   return (
  //     <>
  //       <h1>Tasks</h1>
  //       <Link to="/EditAddDynamicEntries">
  //         <Button label="Edit/Add Tasks" />
  //       </Link>
  //       {/* <Card>{dynamicEntries.map()}</Card> */}
  //     </>
  //   );
  // };

  return (
    <Box className="container">
      <Heading>Tasks</Heading>
      <Box className="main-section">
        <Flex className="buttons">
          <Link href="/EditAddDynamicEntries" style={{ textDecoration: 'none' }}>
            <Button width="buttons-button">Edit/Add Tasks</Button>
          </Link>
        </Flex>

        <Box className="content-area">
          {dynamicEntries.length > 0 ? (
            <Table className="table">
              <thead>
                <th>
                  <span>Name</span>
                </th>
                <th>
                  <span>Start Date</span>
                </th>
                <th>
                  <span>End Date</span>
                </th>
                <th>
                  <span>Recurrence</span>
                </th>
                <th>
                  <span>Owner</span>
                </th>
                <th>
                  <span>Tag</span>
                </th>
                {/* <th>
                  <span>Audience</span>
                </th> */}
                <th>
                  <span>Notes</span>
                </th>
              </thead>
              <tbody>
                {dynamicEntries.map((entry) => (
                  <tr key={entry.id} mb={2}>
                    <td>{entry.title}</td>
                    <td>{entry.start_date}</td>
                    <td>{entry.end_date}</td>
                    <td>{entry.recurrence}</td>
                    <td>{entry.owner}</td>
                    <td>{entry.tag}</td>
                    {/* <td>{entry.audience}</td> */}
                    <td>{entry.notes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Text>No dynamic entries found.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
