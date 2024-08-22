import { Link, Button, Box, Flex, Text, Heading, Table } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { getFetch } from '../utils/Fetches';
import { UserContext } from '../context/UserContext';
import '../styles/StaticEntries.css';

const apiURL = 'http://localhost:8080';

export const StaticEntries = () => {
  const [staticEntries, setStaticEntries] = useState([]);
  const { my_unit_id, supervisor, id: userId } = useContext(UserContext);
  // title: '',
  // my_unit_id: 0,
  // category_id: 0,
  // input_owner_id: '',
  // tag_id: 0,
  // misc_notes: '',
  // });

  useEffect(() => {
    console.log('in use effect');
    const fetchStaticEntries = async () => {
      try {
        console.log('in fetch');
        const fetchedStaticEntries = await getFetch(`static-entries/owner/${userId}`);
        console.log('fetched static entries', fetchedStaticEntries);
        const fetchedTags = await getFetch(`tags`);
        const fetchedUnits = await getFetch(`units`);
        const fetchedCategories = await getFetch(`categories`);
        const fetchedOwners = await getFetch(`users`);

        const enrichedEntries = fetchedStaticEntries.map((entry) => ({
          ...entry,
          tag: fetchedTags.find((tag) => tag.id === entry.tag_id)?.tag_name || 'Not inputed',
          unit:
            fetchedUnits.find((unit) => unit.id === entry.my_unit_id)?.unit_name || 'Not inputed',
          category:
            fetchedCategories.find((cat) => cat.id === entry.category_id)?.category_name ||
            'Not inputed',
          owner:
            fetchedOwners.find((owner) => owner.id === entry.input_owner_id)?.username ||
            'Not inputed',
        }));
        setStaticEntries(enrichedEntries);
      } catch (err) {
        console.log(err);
      }
    };
    console.log('after fetch');

    fetchStaticEntries();
  }, [userId]);

  //   return (
  //     <Box className="container">
  //       <Heading>Static Entries</Heading>
  //       <Box className="main-section">
  //         <Flex className="buttons">
  //           <Link href="/EditAddStaticEntries" style={{ textDecoration: 'none' }}>
  //             <Button width="buttons-button">Edit/Add Entries</Button>
  //           </Link>
  //         </Flex>

  //         <Box className="content-area">
  //           {staticEntries.length > 0 ? (
  //             <Table className="table">
  //               <thead>
  //                 <th>
  //                   <span>Title</span>
  //                 </th>
  //                 <th>
  //                   <span>Tag</span>
  //                 </th>
  //                 <th>
  //                   <span>Unit</span>
  //                 </th>
  //                 <th>
  //                   <span>Category</span>
  //                 </th>
  //                 <th>
  //                   <span>Owner</span>
  //                 </th>
  //                 <th>
  //                   <span>Notes</span>
  //                 </th>
  //               </thead>
  //               <tbody>
  //                 {staticEntries.map((entry) => (
  //                   <tr key={entry.id} mb={2}>
  //                     <td>{entry.title}</td>
  //                     <td>{entry.tag}</td>
  //                     <td>{entry.unit}</td>
  //                     <td>{entry.category}</td>
  //                     <td>{entry.owner}</td>
  //                     <td>{entry.misc_notes}</td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </Table>
  //           ) : (
  //             <Text>No static entries found.</Text>
  //           )}
  //         </Box>
  //       </Box>
  //     </Box>
  //   );
  // };
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
                <tr>
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
                </tr>
              </thead>
              <tbody>
                {staticEntries.map((entry) => (
                  <tr key={entry.id} mb={2}>
                    <td>{entry.title}</td>
                    <td>{entry.tag}</td>
                    <td>{entry.unit}</td>
                    <td>{entry.category}</td>
                    <td>{entry.owner}</td>
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
