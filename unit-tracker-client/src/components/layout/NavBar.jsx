import { Button, Box, Link } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
export const NavBar = () => {
  const { admin, username } = useContext(UserContext);
  return (
    <>
      {admin === true ? (
        <>
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
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Link size={80} name={'Home'} href="/Home">
              <Button>Home</Button>
            </Link>
            <Link size={80} name={'UserProfile'} href="/UserProfile">
              <Button>{`${username}'s Profile`}</Button>
            </Link>
          </Box>
        </>
      )}
    </>
  );
};
