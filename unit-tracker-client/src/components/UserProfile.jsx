import React, { useContext, useEffect, useState } from 'react';
import { Box, Heading, Text, Card, CardHeader, CardBody, Button, Link } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { getFetch } from '../utils/Fetches';

export const UserProfile = () => {
  const { id, first_name, last_name, org } = useContext(UserContext);
  const [availability, setAvailability] = useState(false);

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
          <Text>Supervisor: {/* Add supervisor details here */}</Text>
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
