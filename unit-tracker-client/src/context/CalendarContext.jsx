import React, { createContext, useState } from 'react';

const CalendarContext = createContext();

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
