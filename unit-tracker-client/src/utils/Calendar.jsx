import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import {
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const MyCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    const dayOfWeek = selectedDate.getDay();
    const start = new Date(selectedDate);
    start.setDate(selectedDate.getDate() - dayOfWeek + 1); // Set to Monday
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Set to Sunday

    setStartDate(start);
    setEndDate(end);
    console.log(startDate);
  };

  const tileClassName = ({ date }) => {
    if (startDate && endDate) {
      if (date >= startDate && date <= endDate) {
        return 'highlight'; // Add custom CSS class for highlighted dates
      }
    }
    return null;
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box
        maxW="sm"
        mx="auto"
        p={4}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        color="whitesmoke"
        background="black"
      >
        <Heading as="h3" size="lg" textAlign="center" mb={4} color="snow">
          Select a Date
        </Heading>
        <Box
          as={Calendar}
          onChange={handleDateChange}
          tileClassName={tileClassName}
          borderRadius="md"
          boxShadow="md"
          background="darkgrey"
          p={3}
          className="react-calendar"
          sx={{
            color: 'white',
            '& .react-calendar__navigation button': {
              color: 'ghostwhite',
              bg: 'transparent',
              _hover: {
                bg: 'darkslategrey',
              },
              _active: {
                bg: 'slategrey',
              },
            },
            '& .react-calendar__tile': {
              borderRadius: '8px',
              bg: 'transparent',
              color: 'whitesmoke',
              _hover: {
                bg: 'dimgray',
              },
              _active: {
                bg: 'gray',
              },
            },
            '& .react-calendar__tile--active': {
              bg: 'dimgray',
              color: 'whitesmoke',
            },
            '& .react-calendar__tile--now': {
              bg: 'darkslategrey',
              color: 'whitesmoke',
            },
            '& .react-calendar__month-view__weekdays': {
              color: 'ghostwhite',
            },
            '& .react-calendar__tile--now:hover': {
              bg: 'darkslategrey',
            },
            // Custom highlight style
            '& .highlight': {
              background: 'blue',
              color: 'white',
              borderRadius: '8px',
            },
          }}
        />
        <Text mt={4} textAlign="center" color="snow">
          Week Range: {startDate ? startDate.toDateString() : 'N/A'} -{' '}
          {endDate ? endDate.toDateString() : 'N/A'}
        </Text>
      </Box>
    </Flex>
  );
};

export { MyCalendar };
