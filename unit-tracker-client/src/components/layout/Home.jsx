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
//   const [dynamicEntries, setDynamicEntries] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const { id: Userid } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filteredStaticEntries, setFilteredStaticEntries] = useState([]);
//   const [staticToDynamicArray, setStaticToDynamicArray] = useState([]);

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

//       setStartDate(start);
//       setEndDate(end);
//     };
//     initializeWeekDates();
//   }, [setStartDate, setEndDate]);

//   //========fetch = static_entries, dynamic_entries, categories========
//   const fetchStaticEntries = async () => {
//     const fetchedStaticEntries = await getFetch(`static-entries/owner/${Userid}`);
//     setFilteredStaticEntries(fetchedStaticEntries);
//   };
//   const fetchDynamicEntries = async () => {
//     const fetchedDynamicEntries = await getFetch('dynamic-entries');
//     setDynamicEntries(fetchedDynamicEntries);
//   };
//   const fetchCategories = async () => {
//     const fetchedCategories = await getFetch(`categories`);
//     setCategories(fetchedCategories);
//   };
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
//     const matchingEntries = dynamicEntries.filter((entry) => {
//       const entryStartDate = new Date(entry.start_date);
//       const entryEndDate = new Date(entry.end_date);

//       return date >= entryStartDate && date <= entryEndDate;
//     });

//     return { date, entries: matchingEntries };
//   });
//   useEffect(() => {
//     if (filteredStaticEntries.length > 0 && dates.length > 0 && dynamicEntries.length > 0) {
//       const newStaticToDynamicArray = filteredStaticEntries.map((staticEntry) => {
//         return dates.map((date) => {
//           const matchingEntries = dynamicEntries.filter((dynamicEntry) => {
//             const entryStartDate = new Date(dynamicEntry.start_date);
//             const entryEndDate = new Date(dynamicEntry.end_date);

//             return (
//               dynamicEntry.input_id === staticEntry.id &&
//               date >= entryStartDate &&
//               date <= entryEndDate
//             );
//           });

//           return matchingEntries.length > 0
//             ? matchingEntries.map((entry) => ({
//                 id: entry.id,
//                 start: entry.start_date,
//                 end: entry.end_date,
//                 name: entry.name,
//               }))
//             : [{ id: 0, start: null, end: null, name: ' ' }];
//         });
//       });

//       setStaticToDynamicArray(newStaticToDynamicArray);
//     }
//   }, [filteredStaticEntries, dates, dynamicEntries]);

//   useEffect(() => {
//     try {
//       fetchCategories();
//       fetchStaticEntries();
//       fetchDynamicEntries();
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);
//   if (isLoading) {
//     return <Box>Loading...</Box>;
//   }

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
//   // can click on one of the dynamics. then a pop up with a comment and check box "completed"
//   // when the check box is clicked it will send it to the api to patch the completed
//   // maybe also have a checker to see if a task is already completed for the dynamics
//   // if and have that added to the dyntostatarr
//   // have rows stretch across

//   // stretch cells
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
//                 {filteredStaticEntries.map((staticEntry) => (
//                   <h1 key={staticEntry.id} className="staticEntry">
//                     {staticEntry.title}
//                   </h1>
//                 ))}
//               </div>

//               <div className="dynamicGroup">
//                 {matchedDates.map((item, index) => (
//                   <div key={index}>
//                     <h1 className="dynamicTime">{item.date.toDateString()}</h1>
//                   </div>
//                 ))}
//                 {dates.map((date, j) => (
//                   <div key={j} className="dateRow">
//                     {filteredStaticEntries.map((staticEntry, i) => {
//                       const dynamicArray =
//                         staticToDynamicArray &&
//                         staticToDynamicArray[i] &&
//                         staticToDynamicArray[i][j]
//                           ? staticToDynamicArray[i][j]
//                           : [];
//                       return (
//                         <div key={staticEntry.id} className="dynamicEntry">
//                           {dynamicArray.map((entry, k) => (
//                             <DragDropContainer key={entry.id} entries={[entry]} />
//                           ))}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <p>No static entries found.</p>
//         )}

//         <div className="bottomButtons">
//           <div className="entriesButton">
//             <Link href="/StaticEntries" style={{ textDecoration: 'none' }}>
//               <Button width="full" colorScheme="teal" size="lg">
//                 Entries
//               </Button>
//             </Link>
//           </div>
//           <div className="tasksButton">
//             <Link href="/DynamicEntries" style={{ textDecoration: 'none' }}>
//               <Button width="full" colorScheme="teal" size="lg">
//                 Task
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Box>
//   );
// };

/*-------------------------------------------------*/

import {
  Button,
  Link,
  Box,
  Heading,
  useDisclosure,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Checkbox,
} from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { getFetch } from '../../utils/Fetches';
import '../../styles/Home.css';
//import { CompletionPopup } from '../../utils/Popup';
import { MyCalendar } from '../../utils/Calendar';
import { CalendarContext } from '../../context/CalendarContext';
import { UserContext } from '../../context/UserContext';

export const Home = () => {
  const [dynamicEntries, setDynamicEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { id: Userid } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredStaticEntries, setFilteredStaticEntries] = useState([]);
  const [staticToDynamicArray, setStaticToDynamicArray] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

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
  const fetchStaticEntries = async () => {
    const fetchedStaticEntries = await getFetch(`static-entries/owner/${Userid}`);
    setFilteredStaticEntries(fetchedStaticEntries);
  };
  const fetchDynamicEntries = async () => {
    const fetchedDynamicEntries = await getFetch('dynamic-entries');
    setDynamicEntries(fetchedDynamicEntries);
  };
  const fetchCategories = async () => {
    const fetchedCategories = await getFetch(`categories`);
    setCategories(fetchedCategories);
  };
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
  useEffect(() => {
    if (filteredStaticEntries.length > 0 && dates.length > 0 && dynamicEntries.length > 0) {
      const newStaticToDynamicArray = filteredStaticEntries.map((staticEntry) => {
        return dates.map((date) => {
          const matchingEntries = dynamicEntries.filter((dynamicEntry) => {
            const entryStartDate = new Date(dynamicEntry.start_date);
            const entryEndDate = new Date(dynamicEntry.end_date);

            return (
              dynamicEntry.input_id === staticEntry.id &&
              date >= entryStartDate &&
              date <= entryEndDate
            );
          });

          return matchingEntries.length > 0
            ? matchingEntries.map((entry) => ({
                id: entry.id,
                start: entry.start_date,
                end: entry.end_date,
                name: entry.name,
              }))
            : [{ id: 0, start: null, end: null, name: ' ' }];
        });
      });

      setStaticToDynamicArray(newStaticToDynamicArray);
    }
  }, [filteredStaticEntries, dates, dynamicEntries]);

  useEffect(() => {
    try {
      fetchCategories();
      fetchStaticEntries();
      fetchDynamicEntries();
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  //==================dragging functionality====================
  const DraggableButton = ({ id, children, onDragStart }) => (
    <Button
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      bg="blue.500"
      color="white"
      _hover={{ bg: 'blue.400' }}
      width="100%"
      onClick={() => {
        setSelectedEntry(id);
        onOpen();
      }}
    >
      {children}
    </Button>
  );
  const DragDropContainer = ({ entries }) => {
    const onDragStart = (e, id) => {
      e.dataTransfer.setData('id', id);
    };

    const onDrop = (e, dropIndex) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('id');
      const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));

      if (draggedIndex === dropIndex) return;

      const newEntries = [...entries];
      const placeholder = newEntries[dropIndex];
      newEntries[dropIndex] = newEntries[draggedIndex];
      newEntries[draggedIndex] = placeholder;

      setDynamicEntries(newEntries);
    };

    const onDragOver = (e) => {
      e.preventDefault();
    };

    return (
      <VStack spacing={1} align="stretch">
        {entries.map((entry, index) => (
          <Box key={entry.id} onDrop={(e) => onDrop(e, index)} onDragOver={onDragOver} width="100%">
            <DraggableButton id={entry.id} onDragStart={onDragStart}>
              {entry.name}
            </DraggableButton>
          </Box>
        ))}
      </VStack>
    );
  };
  // const DragDropContainer = ({ entries }) => {
  //   const onDragStart = (e, id) => {
  //     e.dataTransfer.setData('id', id);
  //   };
  //   const onDrop = (e, dropIndex) => {
  //     e.preventDefault();
  //     const draggedId = e.dataTransfer.getData('id');
  //     const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));

  //     if (draggedIndex === dropIndex) return; // No need to swap if the dragged and dropped position are the same

  //     const newEntries = [...entries];

  //     // Swap logic
  //     const placeholder = newEntries[dropIndex];
  //     newEntries[dropIndex] = newEntries[draggedIndex];
  //     newEntries[draggedIndex] = placeholder;

  //     setDynamicEntries(newEntries);
  //   };

  //   const onDragOver = (e) => {
  //     e.preventDefault();
  //   };
  //   return (
  //     <VStack spacing={1} align="stretch">
  //       {entries.map((entry, index) => (
  //         <Box key={entry.id} onDrop={(e) => onDrop(e, index)} onDragOver={onDragOver} width="100%">
  //           <DraggableButton id={entry.id} onDragStart={onDragStart} width="100%">
  //             {entry.name}
  //           </DraggableButton>
  //         </Box>
  //       ))}
  //     </VStack>
  //   );
  // };
  // can click on one of the dynamics. then a pop up with a comment and check box "completed"
  // when the check box is clicked it will send it to the api to patch the completed
  // maybe also have a checker to see if a task is already completed for the dynamics
  // if and have that added to the dyntostatarr
  // have rows stretch across

  // stretch cells
  /*-----current----*/
//   return (
//     <Box maxW="md" mt="8" p="6" boxShadow="lg" borderRadius="lg">
//   <div>
//     <h1>{startDate ? startDate.toDateString() : 'N/A'}</h1>
//     {filteredStaticEntries.length > 0 ? (
//       <>
//         <div className="topRow">
//           <div className="calanderButtonGroup">
//             <Button
//               className="calendarButton"
//               colorScheme="teal"
//               onClick={openCalendar}
//               width="100%"
//               height="auto"
//               padding="10px"
//             >
//               Calendar
//             </Button>

//             <Modal isOpen={isCalendarOpen} onClose={closeCalendar}>
//               <ModalOverlay />
//               <ModalContent>
//                 <ModalCloseButton />
//                 <ModalBody>
//                   <MyCalendar setStartDate={setStartDate} setEndDate={setEndDate}></MyCalendar>
//                 </ModalBody>
//               </ModalContent>
//             </Modal>
//           </div>

//           {categories.map((cat) => (
//             <button className="categoryTabs">{cat.category_name}</button>
//           ))}
//         </div>
//         // Main container wrapping both static and dynamic groups
// <div className="mainGridContainer">
//   <div className="staticGroup">
//     <h1 className="currentTab">Current Tab</h1>
//     {filteredStaticEntries.map((staticEntry, index) => (
//       <h1 key={staticEntry.id} className="staticEntry">
//         {staticEntry.title}
//       </h1>
//     ))}
//   </div>

//   <div className="dynamicGroup">
//     {dates.map((date, j) => (
//       <div key={j} className="dynamicEntry">
//         {filteredStaticEntries.map((staticEntry, i) => {
//           const dynamicArray =
//             staticToDynamicArray && staticToDynamicArray[i] && staticToDynamicArray[i][j]
//               ? staticToDynamicArray[i][j]
//               : [];
//           return (
//             <div key={staticEntry.id}>
//               {dynamicArray.map((entry, k) => (
//                 <DragDropContainer key={entry.id} entries={[entry]} />
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     ))}
//   </div>
// </div>

//       </>
//     ) : (
//       <p>No static entries found.</p>
//     )}

//     <div className="bottomButtons">
//       <div className="entriesButton">
//         <Link href="/StaticEntries" style={{ textDecoration: 'none' }}>
//           <Button width="full" colorScheme="teal" size="lg">
//             Entries
//           </Button>
//         </Link>
//       </div>
//       <div className="tasksButton">
//         <Link href="/DynamicEntries" style={{ textDecoration: 'none' }}>
//           <Button width="full" colorScheme="teal" size="lg">
//             Task
//           </Button>
//         </Link>
//       </div>
//     </div>
//   </div>
// </Box>
//   );
// };


// import {
//   Button,
//   Link,
//   Box,
//   Heading,
//   useDisclosure,
//   VStack,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   ModalBody,
//   Grid,
//   Text,
// } from '@chakra-ui/react';
// import React, { useState, useEffect, useContext } from 'react';
// import { getFetch } from '../../utils/Fetches';
// import { MyCalendar } from '../../utils/Calendar';
// import { CalendarContext } from '../../context/CalendarContext';
// import { UserContext } from '../../context/UserContext';

// export const Home = () => {
//   const [dynamicEntries, setDynamicEntries] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const { id: Userid } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filteredStaticEntries, setFilteredStaticEntries] = useState([]);
//   const [staticToDynamicArray, setStaticToDynamicArray] = useState([]);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [isCompleted, setIsCompleted] = useState(false);

//   // Define the openCalendar and closeCalendar functions within the component
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
//       setStartDate(start);
//       setEndDate(end);
//     };
//     initializeWeekDates();
//   }, [setStartDate, setEndDate]);

//   // Function to generate a range of dates between startDate and endDate
//   const timeRange = () => {
//     const dates = [];
//     let currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//       dates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dates;
//   };

//   // Ensure dates are calculated after startDate and endDate are set
//   const dates = timeRange();

//   const fetchStaticEntries = async () => {
//     const fetchedStaticEntries = await getFetch(`static-entries/owner/${Userid}`);
//     setFilteredStaticEntries(fetchedStaticEntries);
//   };

//   const fetchDynamicEntries = async () => {
//     const fetchedDynamicEntries = await getFetch('dynamic-entries');
//     setDynamicEntries(fetchedDynamicEntries);
//   };

//   const fetchCategories = async () => {
//     const fetchedCategories = await getFetch(`categories`);
//     setCategories(fetchedCategories);
//   };

//   useEffect(() => {
//     try {
//       fetchCategories();
//       fetchStaticEntries();
//       fetchDynamicEntries();
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const DraggableButton = ({ id, children, onDragStart }) => (
//     <Button
//       draggable
//       onDragStart={(e) => onDragStart(e, id)}
//       bg="blue.500"
//       color="white"
//       _hover={{ bg: 'blue.400' }}
//       width="100%"
//       onClick={() => {
//         setSelectedEntry(id);
//         onOpen();
//       }}
//     >
//       {children}
//     </Button>
//   );

//   const DragDropContainer = ({ entries }) => {
//     const onDragStart = (e, id) => {
//       e.dataTransfer.setData('id', id);
//     };

//     const onDrop = (e, dropIndex) => {
//       e.preventDefault();
//       const draggedId = e.dataTransfer.getData('id');
//       const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));

//       if (draggedIndex === dropIndex) return;

//       const newEntries = [...entries];
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
//             <DraggableButton id={entry.id} onDragStart={onDragStart}>
//               {entry.name}
//             </DraggableButton>
//           </Box>
//         ))}
//       </VStack>
//     );
//   };

//   if (isLoading) {
//     return <Box>Loading...</Box>;
//   }

//   return (
//     <Box maxW="container.md" mt="8" p="6" boxShadow="lg" borderRadius="lg">
//       <Text fontSize="xl" fontWeight="bold">{startDate ? startDate.toDateString() : 'N/A'}</Text>
//       {filteredStaticEntries.length > 0 ? (
//         <>
//           <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
//             <Button colorScheme="teal" onClick={openCalendar}>
//               Calendar
//             </Button>

//             <Modal isOpen={isCalendarOpen} onClose={closeCalendar}>
//               <ModalOverlay />
//               <ModalContent>
//                 <ModalCloseButton />
//                 <ModalBody>
//                   <MyCalendar setStartDate={setStartDate} setEndDate={setEndDate} />
//                 </ModalBody>
//               </ModalContent>
//             </Modal>

//             {categories.map((cat) => (
//               <Button key={cat.id} variant="outline">
//                 {cat.category_name}
//               </Button>
//             ))}
//           </Grid>

//           <Grid templateColumns="repeat(2, 1fr)" gap={4}>
//             <Box>
//               <Heading size="md" mb={4}>Current Tab</Heading>
//               {filteredStaticEntries.map((staticEntry) => (
//                 <Text key={staticEntry.id} p={2} bg="gray.100" borderRadius="md" mb={2}>
//                   {staticEntry.title}
//                 </Text>
//               ))}
//             </Box>

//             <Box>
//               {dates.map((date, j) => (
//                 <Box key={j} p={2} border="1px" borderColor="gray.200" borderRadius="md" mb={2}>
//                   {filteredStaticEntries.map((staticEntry, i) => {
//                     const dynamicArray =
//                       staticToDynamicArray && staticToDynamicArray[i] && staticToDynamicArray[i][j]
//                         ? staticToDynamicArray[i][j]
//                         : [];
//                     return (
//                       <Box key={staticEntry.id}>
//                         {dynamicArray.map((entry) => (
//                           <DragDropContainer key={entry.id} entries={[entry]} />
//                         ))}
//                       </Box>
//                     );
//                   })}
//                 </Box>
//               ))}
//             </Box>
//           </Grid>
//         </>
//       ) : (
//         <Text>No static entries found.</Text>
//       )}

//       <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={6}>
//         <Link href="/StaticEntries" _hover={{ textDecoration: 'none' }}>
//           <Button width="full" colorScheme="teal" size="lg">
//             Entries
//           </Button>
//         </Link>
//         <Link href="/DynamicEntries" _hover={{ textDecoration: 'none' }}>
//           <Button width="full" colorScheme="teal" size="lg">
//             Task
//           </Button>
//         </Link>
//       </Grid>
//     </Box>
//   );
// };

return (
  <Box maxW="md" mt="8" p="6" boxShadow="lg" borderRadius="lg">
    <div>
      <h1>{startDate ? startDate.toDateString() : 'N/A'}</h1>
      {filteredStaticEntries.length > 0 ? (
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
              <button className="categoryTabs" key={cat.id}>
                {cat.category_name}
              </button>
            ))}
          </div>

          {/* Main container wrapping both static and dynamic groups */}
          <div className="mainGridContainer">
            {/* Static Entries */}
            <div className="staticGroup">
              <h1 className="currentTab">Current Tab</h1>
              {filteredStaticEntries.map((staticEntry) => (
                <h1 key={staticEntry.id} className="staticEntry">
                  {staticEntry.title}
                </h1>
              ))}
            </div>

            {/* Dynamic Entries */}
            <div className="dynamicGroup">
              {dates.map((date, j) => (
                <div key={j} className="dynamicEntry">
                  {filteredStaticEntries.map((staticEntry, i) => {
                    const dynamicArray =
                      staticToDynamicArray && staticToDynamicArray[i] && staticToDynamicArray[i][j]
                        ? staticToDynamicArray[i][j]
                        : [];
                    return (
                      <div key={staticEntry.id}>
                        {dynamicArray.map((entry) => (
                          <DragDropContainer key={entry.id} entries={[entry]} />
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>No static entries found.</p>
      )}

      {/* Bottom Buttons */}
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
    </div>
  </Box>
);
}

