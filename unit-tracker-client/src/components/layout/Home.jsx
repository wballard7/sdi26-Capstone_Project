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
import React, { useState, useEffect } from 'react';
import { getFetch } from '../../utils/Fetches';
import '../../styles/Home.css';
import { MyCalendar } from '../../utils/Calendar';

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState([]);
  const [dynamicEntries, setDynamicEntries] = useState([]);
  const [categories, setCategories] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const openCalendar = () => {
    setIsCalendarOpen(true);
  };
  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

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
  // {dynamic
  //   name: 'medical-deployment task for Unit 11',
  //   input_id: input_id[0].id,
  //   audience_id: audience_id[0].id,
  //   start_date: 20240814,
  //   end_date: 20240815,
  //   recurrence: 'none',
  //   event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
  //   notes: 'Get this done by next week',
  // }

  //will need a context for calendar
  return (
    <Box maxW="md" /*mx="auto"*/ mt="8" p="6" boxShadow="lg" borderRadius="lg">
      <div>
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
                {staticEntries.map((entry) => (
                  <h1 key={entry.id} className="staticEntry">
                    {entry.title}
                  </h1>
                ))}
              </div>
              <div className="dynamicGroup">
                <h1 className="dynamicTime">time 1</h1>
                <h1 className="dynamicTime">{MyCalendar.startDate}</h1>
                <h1 className="dynamicTime">time 3</h1>
                <h1 className="dynamicTime">time 4</h1>
                <h1 className="dynamicTime">time 5</h1>
                <h1 className="dynamicTime">time 6</h1>
                <h1 className="dynamicTime">time 7</h1>
                <div className="dragDropContainer">
                  <DragDropContainer />
                </div>
              </div>
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
