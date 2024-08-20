import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  Link,
  Avatar,
  VStack,
  Stack,
} from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { SupervisorContext } from '../context/SupervisorContext';
import { PersonnelContext } from '../context/PersonnelContext';
import { getFetch } from '../utils/Fetches';

export const UserProfile = () => {
  const { id, first_name, last_name, org } = useContext(UserContext);
  const { personnelList } = useContext(PersonnelContext);
  const [availability, setAvailability] = useState(false);
  const { first_name: supervisor_first_name, last_name: supervisor_last_name } =
    useContext(SupervisorContext);

  useEffect(() => {
    const fetchAvailability = async () => {
      const data = await getFetch(`users/id/${id}`);
      setAvailability(data.availability);
    };
    if (id) {
      fetchAvailability();
    }
  }, [id]);

  return (
    <Box>
      <Card align="center">
        <CardHeader>
          <Heading size="md" color="black">
            User Profile
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>First Name: {first_name}</Text>
          <Text>Last Name: {last_name}</Text>
          <Text>Org: {org?.name}</Text>
          <Text>
            Supervisor: {supervisor_first_name} {supervisor_last_name}
          </Text>
          <Box mt={4}>
            {availability ? (
              <Heading size="sm" color="green.500">
                Available
              </Heading>
            ) : (
              <Heading size="sm" color="red.500">
                Not Available
              </Heading>
            )}
          </Box>
          <Box>
            <VStack align="stretch">
              <Heading>Personnel</Heading>
              {personnelList.length > 0 ? (
                personnelList.map((person) => (
                  <Stack
                    key={person.id}
                    direction="row"
                    align="center"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    spacing={4}
                    mb={2}
                  >
                    <Avatar name={`${person.first_name} ${person.last_name}`} />
                    <Box>
                      <Text fontWeight="bold">{`${person.first_name} ${person.last_name}`}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {person.role || 'Role not specified'}
                      </Text>
                    </Box>
                  </Stack>
                ))
              ) : (
                <Text>You have no personnel</Text>
              )}
            </VStack>
          </Box>
        </CardBody>
      </Card>
      <Box mt={4}>
        <Link href="/ReportGeneration" style={{ textDecoration: 'none' }}>
          <Button width="full" colorScheme="teal" size="lg">
            Generate A Report
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
