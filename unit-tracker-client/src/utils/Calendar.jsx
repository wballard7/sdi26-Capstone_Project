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
  const [date, setDate] = useState(new Date());
  const [eventData, setEventData] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onOpen(); // Open the modal when a date is selected
  };

  const handleSubmit = async () => {
    // Example of pushing data to a database using a POST request
    try {
      const response = await fetch('/api/calendar-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          eventData,
        }),
      });

      if (response.ok) {
        console.log('Event saved successfully!');
        // Handle successful submission
      } else {
        console.error('Failed to save the event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    onClose();
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
          value={date}
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
          }}
        />
        <Text mt={4} textAlign="center" color="snow">
          Selected Date: {date.toDateString()}
        </Text>

        {/* Modal for adding event information */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            bg="white"
            borderRadius="lg"
            boxShadow="2xl"
            color="black"
            padding={6}
            width="sm"
            maxWidth="400px"
            minHeight="300px"
          >
            <ModalHeader fontWeight="bold">Add Event Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel color="gray.700">Event Details</FormLabel>
                <Input
                  placeholder="Enter event details"
                  value={eventData}
                  onChange={(e) => setEventData(e.target.value)}
                  bg="gray.200"
                  color="white"
                  borderRadius="md"
                  _placeholder={{ color: 'gray.500' }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export { MyCalendar };
