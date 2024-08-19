import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Text, Heading, Link } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';

export const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <h1>user profile</h1>
      <div>{user.last_name}</div>;
      <div>{user.first_name}</div>;
      <div> SELECT unit_name FROM units WHERE id = {user.my_unit_id} </div> // user's unit name
    </Box>
  );
};
