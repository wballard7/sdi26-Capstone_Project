import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import { Box, Heading, Text } from '@chakra-ui/react';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={4}
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="gray.800"
      color="grey"
    >
      <Heading as="h3" size="lg" textAlign="center" mb={4} color="teal.400">
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
          bg: 'gray.900',
          color: 'black',
          '& .react-calendar__navigation button': {
            color: 'teal.300',
            bg: 'gray.800',
            _hover: {
              bg: 'gray.700',
            },
            _active: {
              bg: 'teal.600',
            },
          },
          '& .react-calendar__tile': {
            borderRadius: '8px',
            bg: 'gray.700',
            color: 'black',
            _hover: {
              bg: 'teal.500',
            },
            _active: {
              bg: 'teal.600',
            },
          },
          '& .react-calendar__tile--active': {
            bg: 'teal.600',
            color: 'black',
          },
          '& .react-calendar__tile--now': {
            bg: 'teal.500',
            color: 'black',
          },
          '& .react-calendar__month-view__weekdays': {
            color: 'teal.300',
          },
          '& .react-calendar__tile--now:hover': {
            bg: 'teal.400',
          },
        }}
      />
      <Text mt={4} textAlign="center" color="teal.300">
        Selected Date: {date.toDateString()}
      </Text>
    </Box>
  );
};

export { MyCalendar };
