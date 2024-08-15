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
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
