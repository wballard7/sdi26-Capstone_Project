import React, { createContext, useState } from 'react';

// Create the context
const CalendarContext = createContext();

// Create a provider component
const CalendarProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <CalendarContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
      {children}
    </CalendarContext.Provider>
  );
};
export { CalendarProvider, CalendarContext };

// import React, { createContext, useState } from 'react';

// // Create the context
// const CalendarContext = createContext();

// // Create a provider component
// const CalendarProvider = ({ children }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const calculateWeekRange = (date) => {
//     const dayOfWeek = date.getDay();
//     const start = new Date(date);
//     start.setDate(date.getDate() - dayOfWeek + 1); // Set to Monday
//     const end = new Date(start);
//     end.setDate(start.getDate() + 6); // Set to Sunday

//     return { start, end };
//   };

//   const initializeDates = (date) => {
//     const { start, end } = calculateWeekRange(date);
//     setStartDate(start);
//     setEndDate(end);
//   };

//   useEffect(() => {
//     initializeDates(new Date()); // Initialize with the current date
//   }, []);

//   return (
//     <CalendarContext.Provider value={{ startDate, endDate, initializeDates }}>
//       {children}
//     </CalendarContext.Provider>
//   );
// };

// export { CalendarProvider, CalendarContext };
