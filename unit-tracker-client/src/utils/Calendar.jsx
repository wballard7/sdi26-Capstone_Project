import React, { useState, useContext, useEffect } from 'react';
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
import { CalendarContext } from '../context/CalendarContext';

const MyCalendar = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useContext(CalendarContext);
  const [timeRange, setTimeRange] = useState('week');

  const handleDateChange = (selectedDate) => {
    if (timeRange === 'week') {
      const dayOfWeek = selectedDate.getDay();
      const start = new Date(selectedDate);
      start.setDate(selectedDate.getDate() - dayOfWeek + 1); //Monday
      const end = new Date(start);
      end.setDate(start.getDate() + 6); //Sunday

      setStartDate(start);
      setEndDate(end);
    } else if (timeRange === 'month') {
      const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1); // First day of the month
      const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0); // Last day of the month

      setStartDate(start);
      setEndDate(end);
    }
  };

  useEffect(() => {
    handleDateChange(new Date());
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const tileClassName = ({ date }) => {
    if (startDate && endDate) {
      if (date >= startDate && date <= endDate) {
        return 'highlight';
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
        {/* {timeRange==='week' ?
        <> */}
        <button
          onClick={() => handleTimeRangeChange('week')}
          style={{ backgroundColor: timeRange === 'week' ? 'blue' : 'gray', color: 'white' }}
        >
          week
        </button>
        <button
          onClick={() => handleTimeRangeChange('month')}
          style={{ backgroundColor: timeRange === 'month' ? 'blue' : 'gray', color: 'white' }}
        >
          month
        </button>
        {/* </> : <>
        <button onClick={() => handleDateChange('week')}>week</button>
        <button onClick={() => handleDateChange('month')}>month</button>
        </>
        }*/}
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
