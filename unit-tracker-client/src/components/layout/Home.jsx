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
//   useEffect(() => {
//     const fetchStaticEntries = async () => {
//       try {
//         const fetchedStaticEntries = await getFetch(`static_entries/owner/${Userid}`);
// // so this should work assuming that the user is import works and you are logged in to a user with statics
//         setStaticEntries(fetchedStaticEntries);
//       } catch (err) {}
//     };
//     fetchStaticEntries();
//   }, []);

//   useEffect(() => {
//     const fetchDynamicEntries = async () => {
//       const fetchedDynamicEntries = await getFetch('dynamic_entries');
//       setDynamicEntries(fetchedDynamicEntries);
//     };
//     fetchDynamicEntries();
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const fetchedCategories = await getFetch(`categories`);
//         setCategories(fetchedCategories);
//       } catch (err) {}
//     };
//     fetchCategories();
//   }, []);

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

//   const DragDropContainer = ({ entries }) => {
//     const onDragStart = (e, id) => {
//       e.dataTransfer.setData('id', id);
//     };

//     const onDrop = (e, index) => {
//       e.preventDefault();
//       const id = e.dataTransfer.getData('id');
//       const convertedid = Number(id);
//       const draggedButton = entries.find((btn) => btn.id === convertedid);

//       const filteredButtons = entries.filter((btn) => btn.id !== convertedid);

//       const updatedButtons = [
//         ...filteredButtons.slice(0, index),
//         draggedButton,
//         ...filteredButtons.slice(index),
//       ];

//       setDynamicEntries(updatedButtons);
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
//     const matchingEntries = dynamicEntries.filter((entry) => {
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
//         {staticEntries.length > 0 ? (
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
//                 {staticEntries.map((entry) => (
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
//                       // item.entries.map((entry) => (
//                       <DragDropContainer entries={item.entries} />
//                     ) : (
//                       // <Button
//                       //   key={entry.id}
//                       //   className="dynamicEntry"
//                       //   bg="blue.500"
//                       //   color="white"
//                       //   _hover={{ bg: 'blue.400' }}
//                       //   width="100%"
//                       // >
//                       //   {entry.name}
//                       // </Button>
//                       //))
//                       <p>No entries</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
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

// yo mama
// for(int i =0; i< staticentries.length; i++
//   f

//staticToDynamicArray = [][]
//for(int i = 1; i <= filteredStaticEntries.length; i++) 1-6
//for(int j = 1; i <= dynamicEntries.length; j++)
//if(filteredStaticEntries[i].id === dynamicEntries[j].input_id)
//staticToDynamicArray[i][j].push({dynamicEntries.id, dynamicEntries.start, dynamicEntries.end})
//else
//staticToDynamicArray[i][j].push(0);
//[1]

//static
//id, name
//1,  a
//2,  b
//3,  c
//4,  d
//5,  e
//6,  f
//dynamic
//input_id, start,    end,      title
//1,        15,       17,       bullshit
//2,        18,       19,       more bullshit
//3,        15,       16,       more bullshit
//4,        12,       12,       analshit
//5,        25,       30,       kill me

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
import MyCalendar from '../../utils/Calendar';
import { CalendarContext } from '../../context/CalendarContext';
import { UserContext } from '../../context/UserContext';
//map is breaking-maybe fixed

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState([]);
  const [dynamicEntries, setDynamicEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { id: Userid } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredStaticEntries, setFilteredStaticEntries] = useState([]);
  const [filteredDynamicEntries, setFilteredDynamicEntries] = useState([]);
  //const [allEntries, setAllEntries] = useState([]);
  const [staticToDynamic, setStaticToDynamic] = useState({ staticLocation: 0, dynamicLocation: 0 });

  // useEffect(() => {
  //   console.log('Updated filtered dynamic entries:', filteredDynamicEntries);
  // }, [filteredDynamicEntries]);
  useEffect(() => {
    console.log('filtered static entries:', filteredStaticEntries);
  }, [filteredStaticEntries]);
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
    const fetchStaticEntries = async () => {
      try {
        const fetchedStaticEntries = await getFetch(`static_entries/owner/${Userid}`);
        // so this should work assuming that the user is import works and you are logged in to a user with statics
        setStaticEntries(fetchedStaticEntries);
      } catch (err) {}
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

  //api/fetch call = select from static and dynamic. where id matches and start time and end time
  //join/select static name, dyna
  //when calendar time changes, send a call to this fetch
  //   useEffect(() => {
  //     fetch('http://localhost:8080/')
  //         .then(response => response.json())
  //         .then(data => setItems(data))
  //         .catch(error => console.error('Error fetching data:', error));
  // }, []);

  const fetchStaticEntries = async () => {
    console.log('inside static fetch');
    const fetchedStaticEntries = await getFetch(`static-entries/owner/${Userid}`);
    console.log('fetched static entries:', fetchedStaticEntries);
    setFilteredStaticEntries(fetchedStaticEntries);
  };
  const fetchDynamicEntries = async () => {
    const fetchedDynamicEntries = await getFetch('dynamic-entries');
    setFilteredDynamicEntries(fetchedDynamicEntries);
  };
  const fetchCategories = async () => {
    const fetchedCategories = await getFetch(`categories`);
    setCategories(fetchedCategories);
  };
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const [fetchedStaticEntries, fetchedDynamicEntries, fetchedCategories] = await Promise.all([
  //         getFetch(`/static-entries`),
  //         getFetch('/dynamic-entries'),
  //         getFetch('/categories'),
  //       ]);
  //       setStaticEntries(fetchedStaticEntries);
  //       setDynamicEntries(fetchedDynamicEntries);
  //       setCategories(fetchedCategories);

  //       const filteredStatic = fetchedStaticEntries.filter(
  //         (entry) => entry.input_owner_id === Userid,
  //       );
  //       setFilteredStaticEntries(filteredStatic);

  //       const staticIds = filteredStatic.map((entry) => entry.id);
  //       console.log('Static entry IDs:', staticIds);

  //       const filteredDynamic = fetchedDynamicEntries.filter((entry) =>
  //         staticIds.includes(entry.input_id),
  //       );
  //       console.log('Filtered dynamic entries:', filteredDynamic);
  //       setFilteredDynamicEntries(filteredDynamic);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [Userid]);

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
  // const DragDropContainer = ({ entries, date, allEntries, setAllEntries }) => {
  //   const onDragStart = (e, id) => {
  //     e.dataTransfer.setData('id', id);
  //     e.dataTransfer.setData('date', date.toDateString()); // Store the original date
  //   };

  //   const onDrop = (e, index) => {
  //     e.preventDefault();
  //     const draggedId = parseInt(e.dataTransfer.getData('id'), 10);
  //     const originalDate = new Date(e.dataTransfer.getData('date')).toDateString();
  //     // Find the dragged entry
  //     const draggedEntry = allEntries.find((entry) => entry.id === draggedId);

  //     if (!draggedEntry) return;

  //     // Update the dragged entry's date to the new date
  //     const updatedEntry = {
  //       ...draggedEntry,
  //       start_date: date.toISOString().split('T')[0],
  //       end_date: date.toISOString().split('T')[0],
  //     };

  //     // Update the state with the new entry
  //     const updatedAllEntries = allEntries.map((entry) => {
  //       return entry.id === draggedId ? updatedEntry : entry;
  //     });
  //     console.log('updated all entries: ', updatedAllEntries);

  //     // Set the state to reflect the updated entries
  //     setAllEntries(updatedAllEntries);
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
  const DragDropContainer = ({ entries }) => {
    const onDragStart = (e, id) => {
      e.dataTransfer.setData('id', id);
    };
    const onDrop = (e, dropIndex) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('id');
      const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));

      if (draggedIndex === dropIndex) return; // No need to swap if the dragged and dropped position are the same

      const newEntries = [...entries];

      // Swap logic
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
    const matchingEntries = filteredDynamicEntries.filter((entry) => {
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
                <button className="categoryTabs">{cat.category_name}</button>
              ))}{' '}
              {categories.map((cat) => (
                <button key={cat.id} className="categoryTabs">
                  {cat.category_name}
                </button>
              ))}
            </div>

            <div className="bodyGrid">
              <div className="staticGroup">
                <h1 className="currentTab">Current Tab</h1>
                {filteredStaticEntries.map((entry) => (
                  <h1 key={entry.id} className="staticEntry">
                    {entry.title} BERG MADE CHANGE
                  </h1>
                ))}{' '}
                {dates.map((dateElement, index) => (
                  <h1 key={index} className="staticEntry">
                    {dateElement.toDateString()}
                    {entry.title}
                  </h1>
                ))}
              </div>
              <div className="dynamicGroup">
                {matchedDates.map((item, index) => (
                  <div key={index}>
                    <h1 className="dynamicTime">{item.date.toDateString()}</h1>
                    {item.entries.length > 0 ? (
                      <DragDropContainer entries={item.entries} />
                    ) : (
                      <p>No entries</p>
                    )}
                  </div>
                ))}
              </div>
              {/* <div className="dynamicGroup">
                {dates.map((date, index) => {
                  const matchingEntries = dynamicEntries.filter((entry) => {
                    const entryStartDate = new Date(entry.start_date);
                    const entryEndDate = new Date(entry.end_date);

                    return date >= entryStartDate && date <= entryEndDate;
                  });

                  return (
                    <div key={index}>
                      <h1 className="dynamicTime">{date.toDateString()}</h1>
                      {matchingEntries.length > 0 ? (
                        <DragDropContainer
                          entries={matchingEntries}
                          date={date}
                          allEntries={dynamicEntries}
                          setAllEntries={setDynamicEntries}
                        />
                      ) : (
                        <p>No entries</p>
                      )}
                    </div>
                  );
                })}
              </div> */}
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
// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Button,
//   Link,
//   Box,
//   VStack,
//   H
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   ModalBody,
// } from '@chakra-ui/react';
// import { getFetch } from '../../utils/Fetches';
// import '../../styles/Home.css';
// import { MyCalendar } from '../../utils/Calendar';
// import { CalendarContext } from '../../context/CalendarContext';
// import { UserContext } from '../../context/UserContext';

// const DraggableButton = ({ id, children, onDragStart }) => (
//   <Button
//     draggable
//     onDragStart={(e) => onDragStart(e, id)}
//     bg="blue.500"
//     color="white"
//     _hover={{ bg: 'blue.400' }}
//     width="100%"
//   >
//     {children}
//   </Button>
// );

// const DragDropContainer = ({ entries, onEntriesChange }) => {
//   const onDragStart = (e, id) => {
//     e.dataTransfer.setData('id', id);
//   };

//   const onDrop = (e, dropIndex) => {
//     e.preventDefault();
//     const draggedId = e.dataTransfer.getData('id');
//     const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));

//     if (draggedIndex === dropIndex) return;

//     const newEntries = [...entries];
//     const [removed] = newEntries.splice(draggedIndex, 1);
//     newEntries.splice(dropIndex, 0, removed);

//     onEntriesChange(newEntries);
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

// export const Home = () => {
//   const [staticEntries, setStaticEntries] = useState([]);
//   const [dynamicEntries, setDynamicEntries] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const { startDate, endDate, setStartDate, setEndDate } = useContext(CalendarContext);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const { id: Userid } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(true);

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

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [fetchedStaticEntries, fetchedDynamicEntries, fetchedCategories] = await Promise.all([
//           getFetch(`static_entries`),
//           getFetch('dynamic_entries'),
//           getFetch('categories'),
//         ]);
//         setStaticEntries(fetchedStaticEntries.filter((entry) => entry.input_owner_id === Userid));
//         setDynamicEntries(fetchedDynamicEntries);
//         setCategories(fetchedCategories);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [Userid]);

//   const timeRange = () => {
//     const dates = [];
//     let currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//       dates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dates;
//   };

//   const dates = timeRange();

//   const getMatchingDynamicEntries = (staticEntryId, date) => {
//     return dynamicEntries.filter((entry) => {
//       const entryStartDate = new Date(entry.start_date);
//       const entryEndDate = new Date(entry.end_date);
//       return (
//         entry.static_entry_id === staticEntryId && date >= entryStartDate && date <= entryEndDate
//       );
//     });
//   };

//   const openCalendar = () => setIsCalendarOpen(true);
//   const closeCalendar = () => setIsCalendarOpen(false);

//   if (isLoading) {
//     return <Box>Loading...</Box>;
//   }

//   return (
//     <Box className="home-container">
//       <VStack spacing={4} align="stretch">
//         <HStack className="top-row" spacing={2}>
//           <Button onClick={openCalendar} className="calendar-button">
//             Calendar
//           </Button>
//           {categories.map((cat) => (
//             <Button key={cat.id} className="category-tab">
//               {cat.category_name}
//             </Button>
//           ))}
//         </HStack>

//         <Box className="main-content">
//           <VStack className="static-column" spacing={2} align="stretch">
//             <Box className="current-tab">Current Tab</Box>
//             {staticEntries.map((entry) => (
//               <Box key={entry.id} className="static-entry">
//                 {entry.title}
//               </Box>
//             ))}
//           </VStack>

//           <Box className="dynamic-grid">
//             {dates.map((date, index) => (
//               <VStack key={index} className="date-column" spacing={2} align="stretch">
//                 <Box className="date-header">
//                   {date.toLocaleDateString('en-US', {
//                     weekday: 'short',
//                     month: 'short',
//                     day: 'numeric',
//                   })}
//                 </Box>
//                 {staticEntries.map((staticEntry) => (
//                   <Box key={`${staticEntry.id}-${date}`} className="dynamic-entry">
//                     {/* Here you would render the dynamic entry for this static entry and date */}
//                     {/* You need to implement the logic to match dynamic entries to static entries and dates */}
//                   </Box>
//                 ))}
//               </VStack>
//             ))}
//           </Box>
//         </Box>

//         <HStack className="bottom-buttons" spacing={4}>
//           <Link href="/StaticEntries" style={{ textDecoration: 'none', width: '100%' }}>
//             <Button width="full" colorScheme="teal" size="lg">
//               Entries
//             </Button>
//           </Link>
//           <Link href="/DynamicEntries" style={{ textDecoration: 'none', width: '100%' }}>
//             <Button width="full" colorScheme="teal" size="lg">
//               Task
//             </Button>
//           </Link>
//         </HStack>
//       </VStack>

//       <Modal isOpen={isCalendarOpen} onClose={closeCalendar}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalCloseButton />
//           <ModalBody>
//             <MyCalendar setStartDate={setStartDate} setEndDate={setEndDate} />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//  );
//};
