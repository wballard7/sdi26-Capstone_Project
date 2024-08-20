// import {
//   Button,
//   Link,
//   Box,
//   Heading,
//   VStack,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   ModalBody,
// } from '@chakra-ui/react';
// import React, { useState, useEffect, useContext } from 'react';
// import { getFetch } from '../../utils/Fetches';
// import '../../styles/Home.css';
// import { MyCalendar } from '../../utils/Calendar';
// import { CalendarContext } from '../../context/CalendarContext';
// import { UserContext } from '../../context/UserContext';

// export const Home = () => {
//   const [staticEntries, setStaticEntries] = useState([]);
//   const [dynamicEntries, setDynamicEntries] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const { id: Userid } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filteredStaticEntries, setFilteredStaticEntries] = useState([]);
//   const [filteredDynamicEntries, setFilteredDynamicEntries] = useState([]);
//   //const [allEntries, setAllEntries] = useState([]);
//   const [staticToDynamic, setStaticToDynamic] = useState({staticLocation: 0, dynamicLocation: 0})

//   useEffect(() => {
//     console.log('Updated filtered dynamic entries:', filteredDynamicEntries);
//   }, [filteredDynamicEntries]);
//   useEffect(() => {
//     console.log('Updated filtered static entries:', filteredStaticEntries);
//   }, [filteredStaticEntries]);
//   //==============calendar stuff===================
//   const openCalendar = () => {
//     setIsCalendarOpen(true);
//   };
//   const closeCalendar = () => {
//     setIsCalendarOpen(false);
//   };
//   useEffect(() => {
//     const initializeWeekDates = () => {
//       const today = new Date();
//       const dayOfWeek = today.getDay();
//       const start = new Date(today);
//       start.setDate(today.getDate() - dayOfWeek + 1);
//       const end = new Date(start);
//       end.setDate(start.getDate() + 6);
//       console.log('userid:', Userid);

//       setStartDate(start);
//       setEndDate(end);
//     };
//     initializeWeekDates();
//   }, [setStartDate, setEndDate]);

//   //========fetch = static_entries, dynamic_entries, categories========
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [fetchedStaticEntries, fetchedDynamicEntries, fetchedCategories] = await Promise.all([
//           getFetch(`static_entries`),
//           getFetch('dynamic_entries'),
//           getFetch('categories'),
//         ]);
//         setStaticEntries(fetchedStaticEntries);
//         setDynamicEntries(fetchedDynamicEntries);
//         setCategories(fetchedCategories);

//         const filteredStatic = fetchedStaticEntries.filter(
//           (entry) => entry.input_owner_id === Userid,
//         );
//         setFilteredStaticEntries(filteredStatic);

//         const staticIds = filteredStatic.map((entry) => entry.id);
//         console.log('Static entry IDs:', staticIds);

//         const filteredDynamic = fetchedDynamicEntries.filter((entry) =>
//           staticIds.includes(entry.input_id),
//         );
//         console.log('Filtered dynamic entries:', filteredDynamic);
//         setFilteredDynamicEntries(filteredDynamic);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [Userid]);

//   if (isLoading) {
//     return <Box>Loading...</Box>;
//   }

//   //NOTE:
//   //will need to change updated buttons so it is a 1 for 1 swap
//   //using a 3rd obj placeholder
//   //dragie boi
//   //==================dragging functionality====================
//   const DraggableButton = ({ id, children, onDragStart }) => (
//     <Button
//       draggable
//       onDragStart={(e) => onDragStart(e, id)}
//       bg="blue.500"
//       color="white"
//       _hover={{ bg: 'blue.400' }}
//       width="100%"
//     >
//       {children}
//     </Button>
//   );
//   // const DragDropContainer = ({ entries, date, allEntries, setAllEntries }) => {
//   //   const onDragStart = (e, id) => {
//   //     e.dataTransfer.setData('id', id);
//   //     e.dataTransfer.setData('date', date.toDateString()); // Store the original date
//   //   };

//   //   const onDrop = (e, index) => {
//   //     e.preventDefault();
//   //     const draggedId = parseInt(e.dataTransfer.getData('id'), 10);
//   //     const originalDate = new Date(e.dataTransfer.getData('date')).toDateString();
//   //     // Find the dragged entry
//   //     const draggedEntry = allEntries.find((entry) => entry.id === draggedId);

//   //     if (!draggedEntry) return;

//   //     // Update the dragged entry's date to the new date
//   //     const updatedEntry = {
//   //       ...draggedEntry,
//   //       start_date: date.toISOString().split('T')[0],
//   //       end_date: date.toISOString().split('T')[0],
//   //     };

//   //     // Update the state with the new entry
//   //     const updatedAllEntries = allEntries.map((entry) => {
//   //       return entry.id === draggedId ? updatedEntry : entry;
//   //     });
//   //     console.log('updated all entries: ', updatedAllEntries);

//   //     // Set the state to reflect the updated entries
//   //     setAllEntries(updatedAllEntries);
//   //   };

//   //   const onDragOver = (e) => {
//   //     e.preventDefault();
//   //   };

//   //   return (
//   //     <VStack spacing={1} align="stretch">
//   //       {entries.map((entry, index) => (
//   //         <Box key={entry.id} onDrop={(e) => onDrop(e, index)} onDragOver={onDragOver} width="100%">
//   //           <DraggableButton id={entry.id} onDragStart={onDragStart} width="100%">
//   //             {entry.name}
//   //           </DraggableButton>
//   //         </Box>
//   //       ))}
//   //     </VStack>
//   //   );
//   // };
//   const DragDropContainer = ({ entries }) => {
//     const onDragStart = (e, id) => {
//       e.dataTransfer.setData('id', id);
//     };
//     const onDrop = (e, dropIndex) => {
//       e.preventDefault();
//       const draggedId = e.dataTransfer.getData('id');
//       const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));

//       if (draggedIndex === dropIndex) return; // No need to swap if the dragged and dropped position are the same

//       const newEntries = [...entries];

//       // Swap logic
//       const placeholder = newEntries[dropIndex];
//       newEntries[dropIndex] = newEntries[draggedIndex];
//       newEntries[draggedIndex] = placeholder;

//       setDynamicEntries(newEntries);
//     };

//     const onDragOver = (e) => {
//       e.preventDefault();
//     };
//     return (
//       <VStack spacing={1} align="stretch">
//         {entries.map((entry, index) => (
//           <Box key={entry.id} onDrop={(e) => onDrop(e, index)} onDragOver={onDragOver} width="100%">
//             <DraggableButton id={entry.id} onDragStart={onDragStart} width="100%">
//               {entry.name}
//             </DraggableButton>
//           </Box>
//         ))}
//       </VStack>
//     );
//   };
//   //===============time range and dynamicEntry dates==========================
//   function timeRange() {
//     const dates = [];
//     let currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//       dates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dates;
//   }
//   const dates = timeRange();

//   const matchedDates = dates.map((date) => {
//     const matchingEntries = filteredDynamicEntries.filter((entry) => {
//       const entryStartDate = new Date(entry.start_date);
//       const entryEndDate = new Date(entry.end_date);

//       return date >= entryStartDate && date <= entryEndDate;
//     });

//     return { date, entries: matchingEntries };
//   });

//   return (
//     <Box maxW="md" /*mx="auto"*/ mt="8" p="6" boxShadow="lg" borderRadius="lg">
//       <div>
//         <h1>{startDate ? startDate.toDateString() : 'N/A'}</h1>
//         {filteredStaticEntries.length > 0 ? (
//           <>
//             <div className="topRow">
//               <div className="calanderButtonGroup">
//                 <Button
//                   className="calendarButton"
//                   colorScheme="teal"
//                   onClick={openCalendar}
//                   width="100%"
//                   height="auto"
//                   padding="10px"
//                 >
//                   Calendar
//                 </Button>

//                 <Modal isOpen={isCalendarOpen} onClose={closeCalendar}>
//                   <ModalOverlay />
//                   <ModalContent>
//                     <ModalCloseButton />
//                     <ModalBody>
//                       <MyCalendar setStartDate={setStartDate} setEndDate={setEndDate}></MyCalendar>
//                     </ModalBody>
//                   </ModalContent>
//                 </Modal>
//               </div>

//               {categories.map((cat) => (
//                 <button className="categoryTabs">{cat.category_name}</button>
//               ))}
//             </div>

//             <div className="bodyGrid">
//               <div className="staticGroup">
//                 <h1 className="currentTab">Current Tab</h1>
//                 {filteredStaticEntries.map((entry) => (
//                   <h1 key={entry.id} className="staticEntry">
//                     {entry.title}
//                   </h1>
//                 ))}
//               </div>
//               <div className="dynamicGroup">
//                 {matchedDates.map((item, index) => (
//                   <div key={index}>
//                     <h1 className="dynamicTime">{item.date.toDateString()}</h1>
//                     {item.entries.length > 0 ? (
//                       <DragDropContainer entries={item.entries} />
//                     ) : (
//                       <p>No entries</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               {/* <div className="dynamicGroup">
//                 {dates.map((date, index) => {
//                   const matchingEntries = dynamicEntries.filter((entry) => {
//                     const entryStartDate = new Date(entry.start_date);
//                     const entryEndDate = new Date(entry.end_date);

//                     return date >= entryStartDate && date <= entryEndDate;
//                   });

//                   return (
//                     <div key={index}>
//                       <h1 className="dynamicTime">{date.toDateString()}</h1>
//                       {matchingEntries.length > 0 ? (
//                         <DragDropContainer
//                           entries={matchingEntries}
//                           date={date}
//                           allEntries={dynamicEntries}
//                           setAllEntries={setDynamicEntries}
//                         />
//                       ) : (
//                         <p>No entries</p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div> */}
//             </div>
//           </>
//         ) : (
//           <p>No static entries found.</p>
//         )}
//       </div>
//       <div className="bottomButtons">
//         <div className="entriesButton">
//           <Link href="/StaticEntries" style={{ textDecoration: 'none' }}>
//             <Button width="full" colorScheme="teal" size="lg">
//               Entries
//             </Button>
//           </Link>
//         </div>
//         <div className="tasksButton">
//           <Link href="/DynamicEntries" style={{ textDecoration: 'none' }}>
//             <Button width="full" colorScheme="teal" size="lg">
//               Task
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </Box>
//   );
// };
import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Link,
  Box,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { getFetch } from '../../utils/Fetches';
import '../../styles/Home.css';
import { MyCalendar } from '../../utils/Calendar';
import { CalendarContext } from '../../context/CalendarContext';
import { UserContext } from '../../context/UserContext';

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

const DragDropContainer = ({ entries, onEntriesChange }) => {
  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const onDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('id');
    const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));

    if (draggedIndex === dropIndex) return;

    const newEntries = [...entries];
    const [removed] = newEntries.splice(draggedIndex, 1);
    newEntries.splice(dropIndex, 0, removed);

    onEntriesChange(newEntries);
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

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState([]);
  const [dynamicEntries, setDynamicEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { id: Userid } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedStaticEntries, fetchedDynamicEntries, fetchedCategories] = await Promise.all([
          getFetch(`static_entries`),
          getFetch('dynamic_entries'),
          getFetch('categories'),
        ]);
        setStaticEntries(fetchedStaticEntries.filter((entry) => entry.input_owner_id === Userid));
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

  const timeRange = () => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dates = timeRange();

  const getMatchingDynamicEntries = (staticEntryId, date) => {
    return dynamicEntries.filter((entry) => {
      const entryStartDate = new Date(entry.start_date);
      const entryEndDate = new Date(entry.end_date);
      return (
        entry.static_entry_id === staticEntryId && date >= entryStartDate && date <= entryEndDate
      );
    });
  };

  const openCalendar = () => setIsCalendarOpen(true);
  const closeCalendar = () => setIsCalendarOpen(false);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxW="md" mt="8" p="6" boxShadow="lg" borderRadius="lg">
      <div>
        <h1>{startDate ? startDate.toDateString() : 'N/A'}</h1>
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
                  <MyCalendar setStartDate={setStartDate} setEndDate={setEndDate} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>

          {categories.map((cat) => (
            <button key={cat.id} className="categoryTabs">
              {cat.category_name}
            </button>
          ))}
        </div>

        <div className="bodyGrid">
          <div className="staticGroup">
            <h1 className="currentTab">Current Tab</h1>
            {staticEntries.map((staticEntry) => (
              <div key={staticEntry.id}>
                <h1 className="staticEntry">{staticEntry.title}</h1>
                <div className="dynamicGroup">
                  {dates.map((date, index) => (
                    <div key={index} className="dynamicColumn">
                      <h1 className="dynamicTime">{date.toDateString()}</h1>
                      <DragDropContainer
                        entries={getMatchingDynamicEntries(staticEntry.id, date)}
                        onEntriesChange={(newEntries) => {
                          setDynamicEntries((prevEntries) => {
                            const updatedEntries = prevEntries.map((entry) => {
                              const matchingNewEntry = newEntries.find((e) => e.id === entry.id);
                              return matchingNewEntry || entry;
                            });
                            return updatedEntries;
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
