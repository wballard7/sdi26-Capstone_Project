import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
const DynamicContext = createContext({
  dynamicList: [],
  setDynamicList: () => {},
});

const DynamicProvider = ({ children }) => {
  const { loggedIn } = useContext(UserContext);

  const [dynamicList, setDynamicList] = useState(() => {
    const savedDynamicList = localStorage.getItem('dynamicList');
    return savedDynamicList ? JSON.parse(savedDynamicList) : [];
  });

  const addToDynamicList = (newItem) => {
    setDynamicList((prevList) => [...prevList, newItem]);
  };

  useEffect(() => {
    localStorage.setItem('dynamicList', JSON.stringify(dynamicList));
  }, [dynamicList]);

  // Clear dynamic data when loggedIn is false
  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem('dynamicList');
      setDynamicList([]);
    }
  }, [loggedIn]); // The effect runs when loggedIn changes

  return (
    <DynamicContext.Provider value={{ dynamicList, setDynamicList: addToDynamicList }}>
      {children}
    </DynamicContext.Provider>
  );
};

export { DynamicProvider, DynamicContext };
