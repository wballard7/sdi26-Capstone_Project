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
  Checkbox,
  useToast,
  Text,
  HStack,
} from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { getFetch, patchFetch } from '../../utils/Fetches';
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
  const [isCompleted, setIsCompleted] = useState(false);
  const toast = useToast();

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
  }, []);

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
              dynamicEntry.static_id === staticEntry.id &&
              date >= entryStartDate &&
              date <= entryEndDate
            );
          });

          return matchingEntries.length > 0
            ? matchingEntries.map((entry) => ({
                id: entry.id,
                start: entry.start_date,
                end: entry.end_date,
                title: entry.title,
                completed: entry.completed_by_id, //complet_date
              }))
            : [{ id: 0, start: null, end: null, title: ' ', completed: null }];
        });
      });

      setStaticToDynamicArray(newStaticToDynamicArray);
    }
  }, [startDate, dynamicEntries]);

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
  const DraggableButton = ({ id, children, onDragStart, onClick, completed }) => {
    const handleDragStart = (e) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', id);
        onDragStart(e, id);
      } else {
        console.error("Drag event's dataTransfer is undefined.");
      }
    };
    const handleClick = (e) => {
      e.preventDefault();
      onClick(e);
    };
    return (
      <Button
        draggable
        onDragStart={handleDragStart}
        onClick={handleClick}
        bg={completed ? 'red.500' : 'blue.500'}
        color="white"
        _hover={{ bg: completed ? 'red.400' : 'blue.400' }}
        width="100%"
      >
        {children}
      </Button>
    );
  };
  const DragDropContainer = ({ entries }) => {
    //checkbox + initialize it
    const [visibleCheckboxId, setVisibleCheckboxId] = useState(null);
    const [checkboxStates, setCheckboxStates] = useState({});
    useEffect(() => {
      const initialCheckboxStates = {};
      entries.forEach((entry) => {
        initialCheckboxStates[entry.id] = entry.completed !== null;
      });
      setCheckboxStates(initialCheckboxStates);
    }, [entries]);
    //end initialize
    //added
    // const onDragStart = (e, rowIndex, colIndex) => {
    //   e.dataTransfer.setData('text/plain', JSON.stringify({ rowIndex, colIndex }));
    // };
    const onDragStart = (e, id) => {
      e.dataTransfer.setData('text/plain', id);
    };
    //added
    // const onDrop = (e, targetRowIndex, targetColIndex) => {
    //   e.preventDefault();
    //   const { rowIndex, colIndex } = JSON.parse(e.dataTransfer.getData('text/plain'));
    //   if (rowIndex === targetRowIndex && colIndex === targetColIndex) return; // No swap if dropped in the same position
    //   // Swap the entries
    //   setStaticToDynamicArray((prevArray) => {
    //     const newArray = [...prevArray];
    //     const temp = newArray[rowIndex][colIndex];
    //     newArray[rowIndex][colIndex] = newArray[targetRowIndex][targetColIndex];
    //     newArray[targetRowIndex][targetColIndex] = temp;
    //     return newArray;
    //   });
    // };
    const onDrop = (e, dropIndex) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text/plain');
      const draggedIndex = entries.findIndex((entry) => entry.id === Number(draggedId));
      if (draggedIndex === dropIndex) return;
      const newEntries = [...entries];
      const placeholder = newEntries[dropIndex];
      newEntries[dropIndex] = newEntries[draggedIndex];
      newEntries[draggedIndex] = placeholder;
      // setDynamicEntries(newEntries); this breaks needs to be similar to above
    };
    const onDragOver = (e) => {
      e.preventDefault();
    };
    const handleButtonClick = (id) => {
      setVisibleCheckboxId((prevId) => (prevId === id ? null : id));
    };
    const handleCheckboxChange = async (entryId, isChecked) => {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        [entryId]: isChecked,
      }));
      if (isChecked) {
        setVisibleCheckboxId(null);
      }
      const updatedData = {
        completed_by_id: isChecked ? Userid : null,
        complete_date: isChecked ? new Date().toISOString().split('T')[0] : null,
      };
      await handleCompletion(entryId, updatedData);
      // fetch the dynamic entries to reflect the changes
      const updatedEntries = await getFetch('dynamic-entries');
      setDynamicEntries(updatedEntries);
    };
    const handleCompletion = async (entryId, updatedData) => {
      try {
        const response = await patchFetch(`dynamic-entries/${entryId}`, updatedData);
        console.log('Entry updated successfully:', response);
        toast({
          title: 'Entry Updated',
          description: 'The entry has been successfully updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error updating entry:', error);
        toast({
          title: 'Error',
          description: 'There was an error updating the entry.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    // can click on one of the dynamics. then a pop up with a comment and check box "completed"
    // when the check box is clicked it will send it to the api to patch the completed
    // maybe also have a checker to see if a task is already completed for the dynamics
    // if and have that added to the dyntostatarr
    // have rows stretch across (edited)

    return (
      <VStack spacing={1} align="stretch" padding Top="20px" mt={1} mb={1}>
        {entries.map((entry, index) => (
          <Box key={entry.id} onDrop={(e) => onDrop(e, index)} onDragOver={onDragOver} width="100%">
            <DraggableButton
              id={entry.id}
              onDragStart={onDragStart}
              onClick={() => handleButtonClick(entry.id)}
              completed={entry.completed !== null}
            >
              {entry.title}
            </DraggableButton>
            {visibleCheckboxId === entry.id && (
              <Box mt={2}>
                <Checkbox
                  iconColor="blue.400"
                  iconSize="1rem"
                  isChecked={checkboxStates[entry.id] || false}
                  onChange={(e) => handleCheckboxChange(entry.id, e.target.checked)}
                >
                  Complete
                </Checkbox>
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    );
  };
  // can click on one of the dynamics. then a pop up with a comment and check box "completed"
  // when the check box is clicked it will send it to the api to patch the completed
  // maybe also have a checker to see if a task is already completed for the dynamics
  // if and have that added to the dyntostatarr
  // have rows stretch across

  // stretch cells
  return (
    <Box>
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
                        <MyCalendar
                          setStartDate={setStartDate}
                          setEndDate={setEndDate}
                        ></MyCalendar>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </div>

                {categories.map((cat) => (
                  <button className="categoryTabs">{cat.category_name}</button>
                ))}
              </div>
              <div className="mainGridContainer">
                <div className="staticGroup">
                  <h5 className="currentTab">Current Tab</h5>
                  {filteredStaticEntries.map((staticEntry) => (
                    <h1 key={staticEntry.id} className="staticEntry">
                      {staticEntry.title}
                    </h1>
                  ))}
                </div>

                <Box sx={{ '& > *': { marginTop: '0 !important' } }}>
                  <div className="dynamicGroup">
                    {matchedDates.map((item, index) => (
                      <div key={index}>
                        <h1 className="dynamicTime">{item.date.toDateString()}</h1>
                      </div>
                    ))}
                    {dates.map((date, j) => (
                      <div
                        key={j}
                        className="dynamicEntry"
                        sx={{
                          '& > *': {
                            paddingtop: '50 !important',
                            paddingleft: '15 !important',
                            paddingright: '15 !important',
                            paddingbottom: '15 !important',
                          },
                        }}
                      >
                        {filteredStaticEntries.map((staticEntry, i) => {
                          const dynamicArray =
                            staticToDynamicArray &&
                            staticToDynamicArray[i] &&
                            staticToDynamicArray[i][j]
                              ? staticToDynamicArray[i][j]
                              : [];
                          return (
                            <div key={staticEntry.id}>
                              {dynamicArray.map((entry, k) => (
                                <DragDropContainer key={entry.id} entries={[entry]} />
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </Box>
              </div>
            </>
          ) : (
            <p>No static entries found.</p>
          )}

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
                  Tasks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
