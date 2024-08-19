import { Button, Box, Link, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
export const NavBar = () => {
  const { admin, username, setLoggedIn } = useContext(UserContext);
  return (
    <>
      {admin === true ? (
        <Flex justifyContent="right" p={4}>
          <Box>
            <Link size={80} name={'Admin'} href="/Admin">
              <Button>Admin</Button>
            </Link>
            <Link size={80} name={'Home'} href="/Home">
              <Button>Home</Button>
            </Link>
            <Link size={80} name={'UserProfile'} href="/UserProfile">
              <Button>{`${username}'s Profile`}</Button>
            </Link>
            <Button onClick={() => setLoggedIn(false)}>Logout</Button>
          </Box>
        </Flex>
      ) : (
        <Flex justifyContent="right" p={4}>
          <Box>
            <Link size={80} name={'Home'} href="/Home">
              <Button>Home</Button>
            </Link>
            <Link size={80} name={'UserProfile'} href="/UserProfile">
              <Button>{`${username}'s Profile`}</Button>
            </Link>
            <Button onClick={() => setLoggedIn(false)}>Logout</Button>
          </Box>
        </Flex>
      )}
    </>
  );
};
