// export const Admin = () => {
//   return <h1>Admin Profile</h1>;
// };
import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
// import { NavBar } from './layout/NavBar';
import '../styles/admin.css';

export const Admin = () => {
  return (
    <Box className="admin-container">
      <Box className="content">
        <Box className="sidebar">
          <Box className="unit-buttons">
            <Button className="edit-unit-button">Edit Unit</Button>
            <Button className="create-unit-button">Create Unit</Button>
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
              <Button className="create-user-button">Create users</Button>
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
