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
import { UserContext } from '../../context/UserContext';

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState([]);
  const [dynamicEntries, setDynamicEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { id: Userid } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

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
      console.log('userid:', Userid);

      setStartDate(start);
      setEndDate(end);
    };
    initializeWeekDates();
  }, [setStartDate, setEndDate]);

  //========fetch = static_entries, dynamic_entries, categories========
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedStaticEntries, fetchedDynamicEntries, fetchedCategories] = await Promise.all([
          getFetch(`static_entries`),
          ///owner/${Userid}
          getFetch('dynamic_entries'),
          getFetch('categories'),
        ]);
        setStaticEntries(fetchedStaticEntries);
        setDynamicEntries(fetchedDynamicEntries);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [Userid]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

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

  const DragDropContainer = ({ entries }) => {
    const onDragStart = (e, id) => {
      e.dataTransfer.setData('id', id);
    };

    const onDrop = (e, index) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('id');
      const convertedid = Number(id);
      const draggedButton = entries.find((btn) => btn.id === convertedid);

      const filteredButtons = entries.filter((btn) => btn.id !== convertedid);

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
      <VStack spacing={1} align="stretch">
        {entries.map((entry, index) => (
          <Box key={entry.id} onDrop={(e) => onDrop(e, index)} onDragOver={onDragOver} width="100%">
            <DraggableButton id={entry.id} onDragStart={onDragStart} width="100%">
              {entry.name}
            </DraggableButton>
          </Box>
        ))}
      </VStack>
    );
  };
  //===============time range and dynamicEntry dates==========================
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

  const matchedDates = dates.map((date) => {
    const matchingEntries = dynamicEntries.filter((entry) => {
      const entryStartDate = new Date(entry.start_date);
      const entryEndDate = new Date(entry.end_date);

      return date >= entryStartDate && date <= entryEndDate;
    });

    return { date, entries: matchingEntries };
  });

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
                {matchedDates.map((item, index) => (
                  <div key={index}>
                    <h1 className="dynamicTime">{item.date.toDateString()}</h1>
                    {item.entries.length > 0 ? (
                      // item.entries.map((entry) => (
                      <DragDropContainer entries={item.entries} />
                    ) : (
                      // <Button
                      //   key={entry.id}
                      //   className="dynamicEntry"
                      //   bg="blue.500"
                      //   color="white"
                      //   _hover={{ bg: 'blue.400' }}
                      //   width="100%"
                      // >
                      //   {entry.name}
                      // </Button>
                      //))
                      <p>No entries</p>
                    )}
                  </div>
                ))}
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
