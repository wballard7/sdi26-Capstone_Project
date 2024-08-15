import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import { Box, Heading, Text } from '@chakra-ui/react';

const MyCalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <Box maxW="sm" mx="auto" mt={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h3" size="lg" textAlign="center" mb={4}>
        Select a Date
      </Heading>
      <Box
        as={Calendar}
        onChange={handleDateChange}
        value={date}
        borderRadius="md"
        boxShadow="md"
        p={3}
        className="react-calendar"
        sx={{
          '& .react-calendar__tile': {
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'teal.500',
              color: 'white',
            },
            '&:active': {
              backgroundColor: 'teal.600',
              color: 'white',
            },
          },
        }}
      />
      <Text mt={4} textAlign="center">
        Selected Date: {date.toDateString()}
      </Text>
    </Box>
  );
};

export default MyCalendarComponent;
