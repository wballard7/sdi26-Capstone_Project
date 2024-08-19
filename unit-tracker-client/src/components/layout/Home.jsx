import {
  Button,
  Link,
  Box,
  Heading,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { getFetch } from '../../utils/Fetches';
import '../../styles/Home.css';
import { MyCalendar } from '../../utils/Calendar';
import { CalendarContext } from '../../context/CalendarContext';

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState([]);
  const [dynamicEntries, setDynamicEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  //==============calendar stuff===================
  const openCalendar = () => {
    setIsCalendarOpen(true);
  };
  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };
  useEffect(() => {
    const initializeWeekDates = () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const start = new Date(today);
      start.setDate(today.getDate() - dayOfWeek + 1);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      setStartDate(start);
      setEndDate(end);
    };
    initializeWeekDates();
  }, [setStartDate, setEndDate]);

  //========fetch = static_entries, dynamic_entries, categories========
  useEffect(() => {
    const fetchStaticEntries = async () => {
      try {
        const fetchedStaticEntries = await getFetch(`static_entries`);
        // console.log(fetchedStaticEntries);
        setStaticEntries(fetchedStaticEntries);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchStaticEntries();
  }, []);

  useEffect(() => {
    const fetchDynamicEntries = async () => {
      const fetchedDynamicEntries = await getFetch('dynamic_entries');
      setDynamicEntries(fetchedDynamicEntries);
    };
    fetchDynamicEntries();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getFetch(`categories`);
        setCategories(fetchedCategories);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchCategories();
  }, []);

  //NOTE:
  //will need to change updated buttons so it is a 1 for 1 swap
  //using a 3rd obj placeholder
  //dragie boi
  //==================dragging functionality====================
  const DraggableButton = ({ id, children, onDragStart }) => (
    <Button
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      bg="blue.500"
      color="white"
      _hover={{ bg: 'blue.400' }}
      width="100%"
    >
      {children}
    </Button>
  );
  const getTimeSlots = (entry) => {
    const start = new Date(entry.start_date);
    const end = new Date(entry.end_date);
    const slots = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      slots.push(d.getDay());
    }

    return slots;
  };
  const renderDynamicEntries = () => {
    const timeSlots = Array(7)
      .fill()
      .map(() => []);

    dynamicEntries.forEach((entry) => {
      const slot = getTimeSlots(entry);
      if (slot >= 0 && slot < 7) {
        timeSlots[slot].push(entry);
      }
    });
    return timeSlots.map((entries, index) => (
      <div key={index} className="timeSlot">
        <h2 className="dynamicTime">Time {index + 1}</h2>
        {entries.map((entry) => (
          <Button
            key={entry.id}
            className="dynamicEntry"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.400' }}
            width="100%"
          >
            {entry.name}
          </Button>
        ))}
      </div>
    ));
  };

  const DragDropContainer = () => {
    const onDragStart = (e, id) => {
      e.dataTransfer.setData('id', id);
    };

    const onDrop = (e, index) => {
      const id = e.dataTransfer.getData('id');
      const convertedid = Number(id);
      const draggedButton = dynamicEntries.find((btn) => btn.id === convertedid);

      const filteredButtons = dynamicEntries.filter((btn) => btn.id !== convertedid);

      const updatedButtons = [
        ...filteredButtons.slice(0, index),
        draggedButton,
        ...filteredButtons.slice(index),
      ];

      setDynamicEntries(updatedButtons);
    };

    const onDragOver = (e) => {
      e.preventDefault();
    };
    return (
      <VStack spacing={1}>
        {dynamicEntries.map((entry, index) => (
          <div className="dynamicEntries">
            <Box
              key={entry.id}
              onDrop={(e) => onDrop(e, index)}
              onDragOver={onDragOver}
              width="100%"
            >
              <DraggableButton id={entry.id} onDragStart={onDragStart}>
                {entry.name}
              </DraggableButton>
            </Box>
          </div>
        ))}
      </VStack>
    );
  };
  // nextDay.setDate(startDate.getDate() + 1);
  function timeRange() {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
  const dates = timeRange();

  return (
    <Box maxW="md" /*mx="auto"*/ mt="8" p="6" boxShadow="lg" borderRadius="lg">
      <div>
        <h1>{startDate ? startDate.toDateString() : 'N/A'}</h1>
        {staticEntries.length > 0 ? (
          <>
            <div className="topRow">
              <div className="calanderButtonGroup">
                <Button
                  className="calendarButton"
                  colorScheme="teal"
                  onClick={openCalendar}
                  width="100%"
                  height="auto"
                  padding="10px"
                >
                  Calendar
                </Button>

                <Modal isOpen={isCalendarOpen} onClose={closeCalendar}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                      <MyCalendar setStartDate={setStartDate} setEndDate={setEndDate}></MyCalendar>
                      {/* <MyCalendar /> */}
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </div>

              {categories.map((cat) => (
                <button className="categoryTabs">{cat.category_name}</button>
              ))}
            </div>

            <div className="bodyGrid">
              <div className="staticGroup">
                <h1 className="currentTab">Current Tab</h1>
                {console.log('my start date:', startDate)}
                {/* {staticEntries.map((entry) => (
                  <h1 key={entry.id} className="staticEntry">
                    {entry.title}
                  </h1>
                ))} */}
                {dates.map((dateElement, index) => (
                  <h1 key={index} className="staticEntry">
                    {dateElement.toDateString()}
                  </h1>
                ))}
              </div>
              {/* <div className="dynamicGroup">
                <h1 className="dynamicTime">time 1</h1>
                <h1 className="dynamicTime"> </h1>
                <h1 className="dynamicTime">time 3</h1>
                <h1 className="dynamicTime">time 4</h1>
                <h1 className="dynamicTime">time 5</h1>
                <h1 className="dynamicTime">time 6</h1>
                <h1 className="dynamicTime">time 7</h1>
                <div className="dragDropContainer">
                  <DragDropContainer />
                </div>
              </div> */}
              <div className="dynamicGroup">{renderDynamicEntries()}</div>
            </div>
          </>
        ) : (
          <p>No static entries found.</p>
        )}
      </div>
      <div className="bottomButtons">
        <div className="entriesButton">
          <Link href="/StaticEntries" style={{ textDecoration: 'none' }}>
            <Button width="full" colorScheme="teal" size="lg">
              Entries
            </Button>
          </Link>
        </div>
        <div className="tasksButton">
          <Link href="/DynamicEntries" style={{ textDecoration: 'none' }}>
            <Button width="full" colorScheme="teal" size="lg">
              Task
            </Button>
          </Link>
        </div>
      </div>
    </Box>
  );
};
