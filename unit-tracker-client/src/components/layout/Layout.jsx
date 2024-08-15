import React from 'react';
import { NavBar } from './NavBar';
import { Box } from '@chakra-ui/react';

export const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <main>{children}</main>
    </Box>
  );
};
