import { Button, Link, Input, Box, Heading } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { getFetch } from '../utils/Fetches';
import { UserContext } from '../context/UserContext';
import { PersonnelContext } from '../context/PersonnelContext';
import { SupervisorContext } from '../context/SupervisorContext';

const apiURL = 'http://localhost:8080';

export const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { setUser, setOrg, loggedIn } = useContext(UserContext);
  const { setPersonnel } = useContext(PersonnelContext);
  const { setSupervisor } = useContext(SupervisorContext);

  const submitLogin = async () => {
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameInput, passwordInput }),
      });
      const user = await response.json();
      if (response.ok) {
        console.log(user);
        fetchUserData(user.id);
        loggedIn(true);
        fetchPersonnel(user.id);
        fetchSupervisor(user.supervisor_id);
      } else {
        console.error(user.message);
        alert(user.message);
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const fetchSupervisor = async (sup_Id) => {
    const supervisorResponse = await getFetch(`users/${sup_Id}`);
    setSupervisor({
      id: supervisorResponse.id,
      first_name: supervisorResponse.first_name,
      last_name: supervisorResponse.last_name,
      supervisor_id: supervisorResponse.supervisor_id,
      parent_unit_id: supervisorResponse.parent_unit_id,
      supervisor: supervisorResponse.supervisor,
    });
  };

  const fetchPersonnel = async (userId) => {
    const personnelResponse = await getFetch(`users/personnel/${userId}`);
    setPersonnel({
      id: personnelResponse.id,
      first_name: personnelResponse.first_name,
      last_name: personnelResponse.last_name,
      supervisor_id: personnelResponse.supervisor_id,
      parent_unit_id: personnelResponse.parent_unit_id,
      supervisor: personnelResponse.supervisor,
    });
  };

  const fetchUserData = async (userId) => {
    try {
      const userResponse = await fetch(`${apiURL}/user/${userId}`);
      const userData = await userResponse.json();

      if (userResponse.ok) {
        setUser({
          id: userData.id,
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
          supervisor_id: userData.supervisor_id,
          parent_unit_id: userData.parent_unit_id,
          available: userData.available,
          admin: userData.admin,
          supervisor: userData.supervisor,
        });

        const orgResponse = await fetch(`${apiURL}/units/${userData.parent_unit_id}`);
        const orgData = await orgResponse.json();

        if (orgResponse.ok) {
          setOrg({
            org_id: orgData.id,
            org_name: orgData.unit_name,
            unit_level: orgData.unit_level,
            higher_unit_id: orgData.higher_unit_id,
          });

          console.log(`User and organization data set for user ID: ${userData.id}`);
        } else {
          console.error('Failed to fetch organization data', orgData);
          alert('Failed to fetch organization data', orgData);
        }
      } else {
        console.error('Failed to fetch user data', userData);
        alert('Failed to fetch user data', userData);
      }
    } catch (err) {
      console.error('Error fetching user data', err);
      alert('Error fetching user data', err);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10" padding="6" boxShadow="lg" borderRadius="lg">
      <Heading as="h1" size="lg" mb="6">
        Login or Create an Account
      </Heading>
      <Input
        placeholder="Username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        mb="4"
      />
      <Input
        placeholder="Password"
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        mb="4"
      />
      <Button colorScheme="blue" width="full" onClick={submitLogin} mb="4">
        Login
      </Button>
      <Link href="/CreateAccount">
        <Button colorScheme="teal" width="full">
          Create Account
        </Button>
      </Link>
    </Box>
  );
};
