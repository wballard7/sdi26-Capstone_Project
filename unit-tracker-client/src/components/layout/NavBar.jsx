import { Button, Box, Link, Flex, Image } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
export const NavBar = () => {
  const { admin, username, setLoggedIn } = useContext(UserContext);
  return (
    <>
      <Box>
        {admin === true ? (
          <Flex justifyContent="space-between" alignItems="center" p={4}>
            <Image
              src="/assets/LogoFORBLACK.png"
              alt="Logo"
              boxSize="200px" // Adjust size as needed
              objectFit="contain"
            />
            <Flex gap={4}>
              <Link href="/Admin">
                <Button>Admin</Button>
              </Link>
              <Link href="/Home">
                <Button>Home</Button>
              </Link>
              <Link href="/UserProfile">
                <Button>{`${username}'s Profile`}</Button>
              </Link>
              <Button onClick={() => setLoggedIn(false)}>Logout</Button>
            </Flex>
          </Flex>
        ) : (
          <Flex justifyContent="space-between" alignItems="center" p={4}>
            <Image
              src="/assets/LogoFORBLACK.png"
              alt="Logo"
              boxSize="60px" // Adjust size as needed
              objectFit="contain"
            />
            <Flex gap={4}>
              <Link href="/Home">
                <Button>Home</Button>
              </Link>
              <Link href="/UserProfile">
                <Button>{`${username}'s Profile`}</Button>
              </Link>
              <Button onClick={() => setLoggedIn(false)}>Logout</Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </>
  );
};
