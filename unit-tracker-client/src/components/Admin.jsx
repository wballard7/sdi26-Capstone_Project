// export const Admin = () => {
//   return <h1>Admin Profile</h1>;
// };
import React from 'react';
import { Box, Button, Text, Heading, Link } from '@chakra-ui/react';
// import { NavBar } from './layout/NavBar';
import '../styles/admin.css';

export const Admin = () => {
  return (
    <Box className="admin-container">
      <Heading>Admin Portal</Heading>
      <Box position="fixed" mt={1} right={4} zIndex={10}>
        <Link href="/CreateAccount" size={80}>
          <Button>Create User/Unit</Button>
        </Link>
      </Box>
      <Box className="content">
        <Box className="sidebar">
          <Box className="unit-buttons">
            <Button className="edit-unit-button">Edit Unit</Button>
          </Box>
          <Box className="unit-info">
            <Text fontSize="lg" color="white">
              Unit Info
            </Text>
            <Text color="whtie">Where unit info is displayed</Text>
          </Box>
        </Box>

        <Box className="main-content">
          <Box className="user-management">
            <Box className="user-buttons">
              <Button className="edit-user-button">Edit users</Button>
            </Box>
            <Box className="users-list">
              <Text fontSize="lg" color="white">
                Users List
              </Text>
              <Text color="white">Where list of users will be displayed</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
